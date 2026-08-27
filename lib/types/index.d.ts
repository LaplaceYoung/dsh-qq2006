/**
 * Host loader entry for the browser implementation exported from `./client`.
 */
import type { Context } from '@deepseek-ai/cordis'

/** Settings namespace shared with the browser card. */
export declare const SETTINGS_NS = "qq2006"
/** Cordis plugin name (matches the bundle patch id). */
export declare const name = "ui-skin-qq2006"
/** Whether the QQ2006 skin overlay is enabled. */
export interface Qq2006Settings {
    enabled: boolean
}
/**
 * Register the optional settings section when `@deepseek-ai/dsh-settings`
 * is present. Missing peers are not fatal.
 */
export declare function apply(ctx: Context, config?: Partial<Qq2006Settings>): Promise<void>
