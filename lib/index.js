/**
 * Host loader entry for `@dsh-external/dsh-qq2006`.
 * Registers the `qq2006` settings namespace on DSH 0.1.0-rc.7+ so the
 * Plugins configuration tab can pair a browser card with it.
 */
export const name = 'ui-skin-qq2006'
export const SETTINGS_NS = 'qq2006'

/**
 * @param {import('@deepseek-ai/cordis').Context} ctx
 */
export async function apply(ctx) {
  try {
    const [{ installSettingsSection, settingsNamespace }, schemastery] = await Promise.all([
      import('@deepseek-ai/dsh-settings'),
      import('@deepseek-ai/schemastery'),
    ])
    const z = schemastery.default
    const Config = z.object({
      enabled: z.boolean().default(false),
    })
    installSettingsSection(ctx, settingsNamespace(SETTINGS_NS), Config, { enabled: false }, {
      setSource() {},
      onChange() {},
    })
  } catch {
    // Host without the settings peer: the client persists via localStorage.
  }
}
