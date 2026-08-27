#!/usr/bin/env node
/**
 * Packaging + patch-shape + client-bundle contract checks for #5.
 * These are the failure modes reported against dsh plugin git installs.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const patch = readFileSync(join(root, 'cordis.patch.yml'), 'utf8')
const client = readFileSync(join(root, 'lib/client.js'), 'utf8')
const host = readFileSync(join(root, 'lib/index.js'), 'utf8')

const failures = []
const check = (name, cond, detail) => {
  if (!cond) failures.push(`${name}: ${detail}`)
}

check('version', pkg.version === '0.1.2', `expected 0.1.2, got ${pkg.version}`)
check('files has cordis.patch.yml', Array.isArray(pkg.files) && pkg.files.includes('cordis.patch.yml'), JSON.stringify(pkg.files))
check('exports has cordis.patch.yml', pkg.exports?.['./cordis.patch.yml'] === './cordis.patch.yml', 'missing export')
check('dsh.bundle.patch', pkg.dsh?.bundle?.patch === './cordis.patch.yml', 'bundle patch path')
check(
  'immediately is not set',
  pkg.dsh?.client?.immediately !== true,
  '0.1.2 reserves immediately:true for infrastructure rows',
)
check(
  'inject lists roster packages, not ui-slots',
  Array.isArray(pkg.dsh?.client?.inject)
    && pkg.dsh.client.inject.includes('@deepseek-ai/dsh-client-ui-theme')
    && pkg.dsh.client.inject.includes('@deepseek-ai/dsh-client-locale')
    && pkg.dsh.client.inject.includes('@deepseek-ai/dsh-client-ui-settings')
    && !pkg.dsh.client.inject.includes('@deepseek-ai/dsh-client-ui-slots'),
  JSON.stringify(pkg.dsh?.client?.inject),
)
check('patch uses insert', /^\s*-\s*insert:\s*$/m.test(patch), patch)
check('patch id', /id:\s*ui-skin-qq2006/.test(patch), patch)
check('patch name', /name:\s*'@dsh-external\/dsh-qq2006'/.test(patch), patch)
check('patch is not overlay-only', !/^- id: ui-skin-qq2006\s*$/m.test(patch), 'bare id overlay would be skipped')

// Minimal patch loader: a bare {id,name} is an overlay (needs an existing row);
// `{ insert: [{id,name}] }` appends. This is the #5 bug 2 distinction.
function applyBundlePatch(roster, ops) {
  const warnings = []
  const next = roster.map(row => ({ ...row }))
  for (const op of ops) {
    if (op.insert) {
      for (const row of op.insert) next.push({ ...row })
      continue
    }
    if (op.id && !op.insert) {
      const found = next.find(row => row.id === op.id)
      if (!found) {
        warnings.push(`patch: entry "${op.id}" not found`)
        continue
      }
      Object.assign(found, op)
    }
  }
  return { roster: next, warnings }
}

const overlayResult = applyBundlePatch(
  [{ id: 'ui-theme', name: '@deepseek-ai/dsh-client-ui-theme' }],
  [{ id: 'ui-skin-qq2006', name: '@dsh-external/dsh-qq2006' }],
)
check(
  'overlay form is skipped',
  overlayResult.warnings.includes('patch: entry "ui-skin-qq2006" not found')
    && !overlayResult.roster.some(row => row.id === 'ui-skin-qq2006'),
  JSON.stringify(overlayResult),
)

const insertResult = applyBundlePatch(
  [{ id: 'ui-theme', name: '@deepseek-ai/dsh-client-ui-theme' }],
  [{ insert: [{ id: 'ui-skin-qq2006', name: '@dsh-external/dsh-qq2006' }] }],
)
check(
  'insert form mounts the row',
  insertResult.warnings.length === 0
    && insertResult.roster.some(row => row.id === 'ui-skin-qq2006' && row.name === '@dsh-external/dsh-qq2006'),
  JSON.stringify(insertResult),
)

check('client is ModuleLoader', client.includes('window.__ModuleLoader__.load'), 'missing loader wrapper')
check('client injects CSS', client.includes('dataset.pluginCss') && client.includes('body[data-ds-skin=\'qq2006\']'), 'skin sheet not inlined')
check('client paints host chrome', client.includes('#root::before') && client.includes('QQ2006'), 'missing visible shell overlay')
check('tokens include specific surfaces', client.includes('--dsw-specific-sidebar-fill'), 'sidebar fill token missing')
check('client registers general item', client.includes("settings.general.item") && client.includes('qq2006-skin'), 'missing General row')
check('client registers plugin card', client.includes("settings.plugin.item"), 'missing rc.7+ card')
check('client uses overrideTokens', client.includes('overrideTokens'), 'missing latest token API')
check('client does not persist via dsh.theme write-only', client.includes('dsh.qq2006.enabled'), 'missing own store key')
check('client registers locale dictionaries', client.includes('settings.qq2006') && client.includes('locale.register'), 'missing 0.1.2 locale register')
check('host registers settings namespace', host.includes('qq2006') && host.includes('installSettingsSection'), 'host settings missing')
check('host apply accepts config', /export async function apply\(ctx,\s*config/.test(host), 'missing apply(ctx, config) seat')

// Host module loads without the optional settings peer.
const hostUrl = pathToFileURL(join(root, 'lib/index.js')).href
const hostMod = await import(hostUrl)
check('host exports apply', typeof hostMod.apply === 'function', typeof hostMod.apply)
await hostMod.apply({ inject() {}, effect() {} })

// Runtime smoke: evaluate the ModuleLoader factory against a fake web ctx.
const bodyAttrs = new Map()
const styleTags = []
const slotInjects = []
const overrideCalls = []
const registerCalls = []
globalThis.document = {
  body: {
    setAttribute(k, v) { bodyAttrs.set(k, v) },
    getAttribute(k) { return bodyAttrs.get(k) },
    removeAttribute(k) { bodyAttrs.delete(k) },
  },
  head: { appendChild(node) { styleTags.push(node) } },
  createElement() {
    return { dataset: {}, textContent: '', remove() {} }
  },
}
globalThis.localStorage = {
  store: { 'dsh.qq2006.enabled': '1' },
  getItem(k) { return Object.prototype.hasOwnProperty.call(this.store, k) ? this.store[k] : null },
  setItem(k, v) { this.store[k] = String(v) },
}
let loaded
globalThis.window = {
  __ModuleLoader__: {
    load({ factory }) {
      const React = {
        useState: (init) => [typeof init === 'function' ? init() : init, () => {}],
        useEffect: () => {},
        createElement: () => null,
      }
      loaded = factory((name) => {
        if (name === 'react') return React
        throw new Error(`unexpected require: ${name}`)
      })
    },
  },
}
const loader = new Function(client + '\nreturn window.__ModuleLoader__')
loader()
check('factory exports apply', typeof loaded?.apply === 'function', typeof loaded?.apply)

const theme = {
  register(def) { registerCalls.push(def); return () => {} },
  overrideTokens(source, tokens) {
    overrideCalls.push({ source, tokens })
    return () => {}
  },
  getTheme() { return { preference: 'system', active: { id: 'light' } } },
  setTheme() { throw new Error('setTheme should not run when overrideTokens exists') },
}
const effects = []
const ctx = {
  theme,
  get(name) {
    if (name === 'theme') return theme
    if (name === 'slots') {
      return {
        inject(slot, fn) {
          slotInjects.push(slot)
          fn()
        },
        register() { return () => {} },
      }
    }
    return undefined
  },
  effect(fn) { effects.push(fn()); return () => {} },
}
loaded.apply(ctx)
check('skin attribute on', bodyAttrs.get('data-ds-skin') === 'qq2006', String(bodyAttrs.get('data-ds-skin')))
check('overrideTokens used', overrideCalls.length === 1 && overrideCalls[0].source === '@dsh-external/dsh-qq2006', JSON.stringify(overrideCalls))
check('theme registered', registerCalls.some(def => def.id === 'qq2006'), JSON.stringify(registerCalls))
check('general settings row', slotInjects.includes('settings.general.item'), JSON.stringify(slotInjects))
check('stylesheet mounted', styleTags.length === 1 && String(styleTags[0].textContent).includes('body[data-ds-skin'), 'no style tag')
check('plugin card skipped without settingsScope', !slotInjects.includes('settings.plugin.item'), JSON.stringify(slotInjects))

// rc.5/rc.6 fallback: no overrideTokens → register + setTheme('qq2006').
const setThemeCalls = []
const legacyTheme = {
  register(def) { return () => {} },
  getTheme() { return { preference: 'system', active: { id: 'light' } } },
  setTheme(id) { setThemeCalls.push(id) },
}
const legacyCtx = {
  theme: legacyTheme,
  get(name) {
    if (name === 'theme') return legacyTheme
    if (name === 'slots') return { inject() {}, register() { return () => {} } }
    return undefined
  },
  effect(fn) { fn(); return () => {} },
}
loaded.apply(legacyCtx)
check('rc.5 setTheme fallback', setThemeCalls.includes('qq2006'), JSON.stringify(setThemeCalls))

if (failures.length) {
  console.error('validate failed:')
  for (const line of failures) console.error(' -', line)
  process.exit(1)
}
console.log('validate ok: packaging, insert patch, client bundle, host apply')
