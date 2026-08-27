/**
 * Host half of `@dsh-external/dsh-qq2006`.
 *
 * On DSH 0.1.0-rc.7+ this registers the `qq2006` settings namespace so the
 * Plugins → 插件配置 tab can pair a `settings.plugin.item` card with it.
 * DSH 0.1.2-alpha.1 still uses `installSettingsSection`; missing peers
 * (rc.5/rc.6) are not fatal — the client persists via localStorage.
 */
import type { Context } from '@deepseek-ai/cordis'

/** Settings namespace shared with the browser card (`settings.plugin.item` key). */
export const SETTINGS_NS = 'qq2006'

/** Cordis plugin name (matches the bundle patch id). */
export const name = 'ui-skin-qq2006'

export interface Qq2006Settings {
  /** Whether the QQ2006 skin overlay is enabled. */
  enabled: boolean
}

/**
 * Register the optional settings section when `@deepseek-ai/dsh-settings`
 * is present. The cookbook `apply(ctx, config)` seat is accepted so a later
 * overlay can seed `enabled` as the composition `base`.
 * @param ctx - host cordis context.
 * @param config - optional composition entry (defaults stay off).
 */
export async function apply(ctx: Context, config: Partial<Qq2006Settings> = {}): Promise<void> {
  const base: Qq2006Settings = { enabled: config.enabled === true }
  try {
    const [{ installSettingsSection, settingsNamespace }, schemastery] = await Promise.all([
      import('@deepseek-ai/dsh-settings'),
      import('@deepseek-ai/schemastery'),
    ])
    const z = schemastery.default
    const Config = z.object({
      enabled: z.boolean().default(false),
    })
    installSettingsSection(ctx, settingsNamespace(SETTINGS_NS), Config, base, {
      setSource: () => {},
      onChange: () => {},
    })
  } catch {
    // Host without the settings peer: the client persists via localStorage.
  }
}
