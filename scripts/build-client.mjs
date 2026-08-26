#!/usr/bin/env node
/**
 * Produce the DSH client ModuleLoader artifact at lib/client.js.
 * The published tsdown preset is not available outside the DSH monorepo,
 * so this wrapper inlines CSS + tokens into the factory body.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const tokens = JSON.parse(readFileSync(join(root, 'src/qq2006-tokens.json'), 'utf8'))
const skinCss = readFileSync(join(root, 'src/styles/qq2006.css'), 'utf8')
const settingsCss = readFileSync(join(root, 'src/client/settings.css'), 'utf8')
let body = readFileSync(join(root, 'src/client/runtime.js'), 'utf8')

body = body
  .replaceAll('@@QQ2006_TOKENS@@', JSON.stringify(tokens, null, 2))
  .replaceAll('@@QQ2006_CSS@@', JSON.stringify(skinCss))
  .replaceAll('@@SETTINGS_CSS@@', JSON.stringify(settingsCss))

if (body.includes('@@')) {
  throw new Error('build-client: unresolved placeholder in src/client/runtime.js')
}

const artifact = `window.__ModuleLoader__.load({
	id: "@dsh-external/dsh-qq2006",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		${body}
		return module.exports;
	}
});
`

mkdirSync(join(root, 'lib'), { recursive: true })
writeFileSync(join(root, 'lib/client.js'), artifact)
writeFileSync(join(root, 'lib/styles/qq2006.css'), skinCss)
console.log('wrote lib/client.js and lib/styles/qq2006.css')
