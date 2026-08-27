/**
 * Browser half of `@dsh-external/dsh-qq2006`.
 *
 * Published artifact is `lib/client.js` (ModuleLoader factory). The runtime
 * lives in `runtime.js` and is assembled by `scripts/build-client.mjs`.
 *
 * On current DSH (through 0.1.2-alpha.1) Appearance still hardcodes light /
 * dark / system, so this plugin owns its own enable path:
 *
 * 1. Inject `qq2006.css` for the plugin lifetime (npm installs never see
 *    the monorepo `base.css` import).
 * 2. Persist enablement in `dsh.qq2006.enabled` (and Host settings when the
 *    `qq2006` namespace is served).
 * 3. When on: set `body[data-ds-skin=qq2006]` and apply coral-blue tokens
 *    via `theme.overrideTokens` (rc.7+) or `theme.register` + `setTheme`
 *    (rc.5/rc.6).
 * 4. Register 设置 → 通用 → QQ2006 皮肤, plus 设置 → 插件 card on rc.7+.
 * 5. Register zh/en copy through `ctx.locale` (0.1.2 third-party UI language).
 */
import type { Context } from '@deepseek-ai/cordis'

/** Theme id / skin attribute value. */
export const THEME_ID = 'qq2006'

/** Body attribute component patches and the global sheet scope on. */
export const SKIN_ATTRIBUTE = 'data-ds-skin'

/** Settings namespace / `settings.plugin.item` key. */
export const SETTINGS_NS = 'qq2006'

/** Required services: theme registry (overrideTokens or register/setTheme). */
export const inject = ['theme']

/** Coral-blue alias-token overrides (see `src/qq2006-tokens.json`). */
export const QQ2006_TOKENS: Readonly<Record<string, string>> = Object.freeze({})

/**
 * Client plugin body. Implementation is the published ModuleLoader factory.
 * @param ctx - client cordis context.
 */
export function apply(ctx: Context): void {
  void ctx
}
