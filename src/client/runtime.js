/* Published client factory body. Wrapped by scripts/build-client.mjs.
   Token / CSS placeholders below are replaced at build time. */

const React = require('react')

const THEME_ID = 'qq2006'
const SKIN_ATTRIBUTE = 'data-ds-skin'
const SETTINGS_NS = 'qq2006'
const STORE_KEY = 'dsh.qq2006.enabled'
const LEGACY_THEME_KEY = 'dsh.theme'
const OVERRIDE_SOURCE = '@dsh-external/dsh-qq2006'
const PACKAGE_ID = '@dsh-external/dsh-qq2006'
const QQ2006_TOKENS = @@QQ2006_TOKENS@@
const QQ2006_CSS = @@QQ2006_CSS@@
const SETTINGS_CSS = @@SETTINGS_CSS@@

function toModes(tokens) {
  const out = {}
  for (const [name, value] of Object.entries(tokens)) {
    out[name] = { light: value, dark: value }
  }
  return out
}

function readLocalEnabled() {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    if (raw === '1' || raw === 'true') return true
    if (raw === '0' || raw === 'false') return false
    if (localStorage.getItem(LEGACY_THEME_KEY) === THEME_ID) return true
  } catch {
    // Privacy-mode storage failure: treat as off.
  }
  return false
}

function writeLocalEnabled(enabled) {
  try {
    localStorage.setItem(STORE_KEY, enabled ? '1' : '0')
  } catch {
    // Privacy-mode storage failure: in-memory state still works this session.
  }
}

function createEnabledStore() {
  let enabled = typeof localStorage === 'undefined' ? false : readLocalEnabled()
  let scope = null
  const listeners = new Set()
  const emit = () => {
    for (const fn of [...listeners]) fn()
  }
  const adoptScope = () => {
    if (!scope || typeof scope.getSnapshot !== 'function') return
    const snap = scope.getSnapshot()
    if (!snap || snap.status !== 'ready' || !snap.value || typeof snap.value !== 'object') return
    if (typeof snap.value.enabled !== 'boolean' || snap.value.enabled === enabled) return
    enabled = snap.value.enabled
    writeLocalEnabled(enabled)
    emit()
  }
  return {
    get: () => enabled,
    subscribe(fn) {
      listeners.add(fn)
      return () => { listeners.delete(fn) }
    },
    set(next) {
      if (enabled === next) return
      enabled = next
      writeLocalEnabled(next)
      if (scope && typeof scope.set === 'function') {
        try { void scope.set('enabled', next) } catch { /* revision conflict: local still wins this session */ }
      }
      emit()
    },
    attachScope(nextScope) {
      scope = nextScope
      adoptScope()
      if (scope && typeof scope.subscribe === 'function') {
        return scope.subscribe(() => { adoptScope() })
      }
      return () => {}
    },
  }
}

function installStyles(ctx) {
  if (typeof document === 'undefined') return
  ctx.effect(() => {
    const tag = document.createElement('style')
    tag.dataset.plugin = PACKAGE_ID
    tag.dataset.pluginCss = PACKAGE_ID + '/qq2006.css'
    tag.textContent = QQ2006_CSS + '\n' + SETTINGS_CSS
    document.head.appendChild(tag)
    return () => { tag.remove() }
  })
}

function syncSkinAttribute(enabled) {
  if (typeof document === 'undefined') return
  if (enabled) document.body.setAttribute(SKIN_ATTRIBUTE, THEME_ID)
  else if (document.body.getAttribute(SKIN_ATTRIBUTE) === THEME_ID) {
    document.body.removeAttribute(SKIN_ATTRIBUTE)
  }
}

function ensureRegistered(theme) {
  if (!theme || typeof theme.register !== 'function') return () => {}
  try {
    return theme.register({
      id: THEME_ID,
      colorScheme: 'light',
      tokens: { ...QQ2006_TOKENS },
    })
  } catch {
    return () => {}
  }
}

function applyTokens(theme, enabled, state) {
  if (state.overrideDispose) {
    try { state.overrideDispose() } catch { /* already gone */ }
    state.overrideDispose = null
  }
  if (!theme) return
  if (enabled) {
    if (typeof theme.overrideTokens === 'function') {
      // DSH 0.1.0-rc.7+ / 0.1.1: overlay tokens on light/dark/system.
      // Do not setTheme('qq2006') — Appearance only persists the built-in trio.
      try {
        state.overrideDispose = theme.overrideTokens(OVERRIDE_SOURCE, toModes(QQ2006_TOKENS))
      } catch {
        state.overrideDispose = null
      }
      return
    }
    // DSH 0.1.0-rc.5/rc.6: custom theme id + setTheme is the only write path.
    if (typeof theme.getTheme === 'function' && state.previousPreference == null) {
      try {
        const snap = theme.getTheme()
        if (snap && typeof snap.preference === 'string' && snap.preference !== THEME_ID) {
          state.previousPreference = snap.preference
        }
      } catch { /* ignore */ }
    }
    if (typeof theme.setTheme === 'function') {
      try { theme.setTheme(THEME_ID) } catch { /* unknown id on a host that rejected register */ }
    }
    return
  }
  if (typeof theme.overrideTokens !== 'function' && typeof theme.setTheme === 'function' && state.previousPreference) {
    try { theme.setTheme(state.previousPreference) } catch { /* ignore */ }
  }
}

function SkinToggleRow({ store }) {
  const [enabled, setEnabled] = React.useState(() => store.get())
  React.useEffect(() => store.subscribe(() => setEnabled(store.get())), [store])
  return React.createElement('div', { className: 'qq2006-settings' },
    React.createElement('div', { className: 'qq2006-settings-title' }, 'QQ2006 皮肤'),
    React.createElement('div', { className: 'qq2006-settings-hint' },
      '外观行仍是浅色 / 深色 / 跟随系统。打开后由本插件叠加珊瑚蓝 token，并点亮 data-ds-skin。',
    ),
    React.createElement('div', { className: 'qq2006-settings-row' },
      React.createElement('button', {
        type: 'button',
        className: 'qq2006-settings-cube' + (enabled ? ' qq2006-settings-cube-on' : ''),
        'aria-pressed': enabled,
        onClick: () => store.set(true),
      }, '开启'),
      React.createElement('button', {
        type: 'button',
        className: 'qq2006-settings-cube' + (!enabled ? ' qq2006-settings-cube-on' : ''),
        'aria-pressed': !enabled,
        onClick: () => store.set(false),
      }, '关闭'),
    ),
  )
}

function SkinSettingsCard({ store }) {
  return React.createElement('div', { className: 'qq2006-plugin-card' },
    React.createElement(SkinToggleRow, { store }),
  )
}

function registerSettings(ctx, store) {
  const slots = ctx.get ? (ctx.get('slots') ?? ctx.slots) : ctx.slots
  if (slots === undefined || typeof slots.inject !== 'function') return
  try {
    slots.inject('settings.general.item', () => slots.register(
      { name: 'settings.general.item', id: 'qq2006-skin', order: 15 },
      () => React.createElement(SkinToggleRow, { store }),
    ))
  } catch {
    // Slot not declared on this composition (unexpected on web).
  }
  const settingsScope = ctx.get ? ctx.get('settingsScope') : undefined
  if (settingsScope !== undefined && typeof settingsScope.bind === 'function') {
    try {
      const scope = settingsScope.bind({ namespace: SETTINGS_NS })
      ctx.effect(() => store.attachScope(scope))
    } catch { /* bind failed: localStorage still works */ }
    try {
      slots.inject('settings.plugin.item', () => slots.register(
        { name: 'settings.plugin.item', key: SETTINGS_NS },
        () => React.createElement(SkinSettingsCard, { store }),
      ))
    } catch {
      // rc.5/rc.6 have no plugin-card slot.
    }
  }
}

function apply(ctx) {
  const theme = ctx.get ? (ctx.get('theme') ?? ctx.theme) : ctx.theme
  const store = createEnabledStore()
  const tokenState = { overrideDispose: null, previousPreference: null }

  installStyles(ctx)
  const unregister = ensureRegistered(theme)

  const sync = () => {
    const enabled = store.get()
    syncSkinAttribute(enabled)
    applyTokens(theme, enabled, tokenState)
  }
  ctx.effect(() => {
    const stop = store.subscribe(sync)
    return () => {
      stop()
      if (tokenState.overrideDispose) {
        try { tokenState.overrideDispose() } catch { /* ignore */ }
      }
      if (typeof unregister === 'function') {
        try { unregister() } catch { /* ignore */ }
      }
      syncSkinAttribute(false)
    }
  })
  sync()
  registerSettings(ctx, store)
}

module.exports = {
  name: 'ui-skin-qq2006-client',
  THEME_ID,
  SKIN_ATTRIBUTE,
  QQ2006_TOKENS,
  inject: ['theme'],
  apply,
}
