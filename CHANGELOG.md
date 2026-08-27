# Changelog

## 0.1.2

Aligns the released plugin with upstream DSH `0.1.2-alpha.1`.

### DSH 0.1.2-alpha.1 alignment

- Drop `dsh.client.immediately`. 0.1.2 reserves that flag for stage-one
  infrastructure rows; a feature skin is an ordinary application plugin.
- Rewrite `dsh.client.inject` to the web roster packages this plugin
  actually collaborates with (`ui-theme`, `locale`, `ui-renderer`,
  `ui-settings`, `ui-settings-plugins`). `ui-slots` is a shell baseline
  module, not a graph row.
- Register zh / en copy through `ctx.locale` (`settings.qq2006`) so the
  new third-party UI language path and the `t` seat on settings rows work.
  Hosts without `locale` keep the previous baked Chinese strings.
- Host `apply(ctx, config)` now accepts the cookbook composition seat and
  uses it as the settings `base` (`enabled` still defaults to off).
- Add a `prepare` script so a git `dsh plugin add` rebuilds `lib/client.js`
  after pnpm allowlists the package.

Appearance is still Light / Dark / System only. The plugin still owns the
**QQ2006 皮肤** toggle and `overrideTokens` overlay.

## 0.1.1

Fixes the released `dsh plugin` install path reported in #5, and aligns the
plugin with upstream DSH through `dsh-v0.1.1-rc.2`.

### Fixes

- Ship `cordis.patch.yml` in the package `files` whitelist so git/pnpm
  installs no longer drop the overlay. Missing that file made `dsh web`
  fail loud (`ENOENT` while composing the web profile).
- Use an `insert:` patch. A bare `{ id, name }` entry is an id-targeted
  overlay and was skipped with `patch: entry "ui-skin-qq2006" not found`.

### DSH 0.1.1-rc.2 alignment

Upstream `AppearanceRow` still hardcodes Light / Dark / System and only
persists those three preferences. Registering `qq2006` as a theme is not
enough to get a fourth cube.

- Add 设置 → 通用 → **QQ2006 皮肤** (`settings.general.item`).
- On DSH ≥ 0.1.0-rc.7, also register Host settings namespace `qq2006` and
  a 设置 → 插件 card (`settings.plugin.item`).
- Apply coral-blue tokens with `theme.overrideTokens` when available, so
  the built-in Appearance preference stays intact. Fall back to
  `register` + `setTheme('qq2006')` on rc.5/rc.6.
- Inject `qq2006.css` from the client plugin. npm installs never see the
  monorepo `base.css` import, so the sheet previously never loaded.
- Persist enablement in `dsh.qq2006.enabled` (and Host settings when
  served). A leftover `dsh.theme=qq2006` value is migrated.

### Notes

Component-level chrome (login window, panel bar, chat chrome, assets
under `/qq2006/`) still needs the source monorepo / `patches/qq2006-skin.patch`
path. The released plugin now does what it can without patching host UI
packages: tokens, global sheet, and a reachable toggle.
