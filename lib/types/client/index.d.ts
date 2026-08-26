/**
 * QQ2006 skin plugin (browser half).
 *
 * Appearance on current DSH is still the built-in trio. This plugin owns
 * its own enable path: settings toggle + token overlay + CSS inject +
 * `body[data-ds-skin=qq2006]`.
 */
import type { Context } from '@deepseek-ai/cordis'

/** Theme id this skin registers; also the value of the body skin attribute. */
export declare const THEME_ID = "qq2006"
/** Body attribute the skin mirror writes (component patches scope on it). */
export declare const SKIN_ATTRIBUTE = "data-ds-skin"
/** Settings namespace / `settings.plugin.item` key. */
export declare const SETTINGS_NS = "qq2006"
/** QQ2006 coral-blue alias-token overrides. */
export declare const QQ2006_TOKENS: Readonly<Record<string, string>>
/** Required services: the theme registry. */
export declare const inject: string[]
/**
 * Client plugin body: inject the sheet, apply tokens, and register the
 * settings toggle.
 */
export declare function apply(ctx: Context): void
