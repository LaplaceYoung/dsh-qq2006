/**
 * QQ2006 skin plugin. Two jobs, both presentation-only:
 *
 * 1. Register the `qq2006` theme with the theme service (id
 *    `qq2006`, light colorScheme so the dark base palette never applies)
 *    carrying the coral-blue alias-token overrides. The registration puts
 *    the skin on the Appearance settings row as a selectable cube and
 *    persists through the theme service's own `dsh.theme` storage key —
 *    the boot kernel reads that key to restore the attribute before the
 *    loading page renders.
 *
 * 2. Mirror the resolved active theme onto `body[data-ds-skin]` so the
 *    scoped skin stylesheet (`src/styles/qq2006.css`, imported by the web
 *    shell base.css) and the component `.module.css` skin patches activate.
 *    The mirror is an exact retraction set: the plugin only ever removes
 *    the attribute it set, so foreign attributes survive.
 */
import type { Context } from '@deepseek-ai/cordis'
// Type-only: pulls the theme service's Context merge (ctx.theme) and the
// snapshot type; erased at build time, so no runtime cross-package value
// import (client bundle purity gate).
import type { ThemeSnapshot } from '@deepseek-ai/dsh-client-ui-theme/client'
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'

/** Theme id this skin registers; also the value of the body skin attribute. */
export const THEME_ID = 'qq2006'

/** Body attribute the skin mirror writes (component patches scope on it). */
export const SKIN_ATTRIBUTE = 'data-ds-skin'

/**
 * QQ2006 coral-blue alias-token overrides, applied by the theme presenter as
 * inline CSS variables on body (the light base palette + these overrides
 * produce the classic 2006 look; component-level chrome comes from the skin
 * stylesheet and per-component patches).
 */
export const QQ2006_TOKENS: Readonly<Record<string, string>> = Object.freeze({
  '--dsw-alias-bg-base': 'rgb(240, 247, 253)',
  '--dsw-alias-bg-layer-1': 'rgb(244, 250, 255)',
  '--dsw-alias-bg-layer-2': 'rgb(233, 243, 252)',
  '--dsw-alias-bg-layer-3': 'rgb(222, 236, 250)',
  '--dsw-alias-bg-mask-1': 'rgba(255, 255, 255, 0.92)',
  '--dsw-alias-bg-mask-2': 'rgba(240, 248, 255, 0.85)',
  '--dsw-alias-bg-mask-3': 'rgba(230, 241, 252, 0.8)',
  '--dsw-alias-bg-mask-photo': 'rgba(255, 255, 255, 0.9)',
  '--dsw-alias-bg-mask-drop': 'rgba(240, 247, 253, 0.72)',
  '--dsw-alias-bg-module-platform': 'rgb(235, 245, 254)',
  '--dsw-alias-bg-multi-select': 'rgb(213, 232, 250)',
  '--dsw-alias-bg-overlay': 'rgba(245, 250, 255, 0.94)',
  '--dsw-alias-bg-skeleton': 'rgb(214, 232, 249)',
  '--dsw-alias-border-inverted': 'rgb(220, 235, 250)',
  '--dsw-alias-border-inverted2': 'rgb(200, 222, 245)',
  '--dsw-alias-border-l1': 'rgb(150, 190, 230)',
  '--dsw-alias-border-l2': 'rgb(120, 165, 215)',
  '--dsw-alias-border-l2-darkmode-thin': 'rgb(120, 165, 215)',
  '--dsw-alias-border-l3': 'rgb(90, 140, 200)',
  '--dsw-alias-border-l4': 'rgb(70, 115, 175)',
  '--dsw-alias-brand-primary': 'rgb(45, 128, 208)',
  '--dsw-alias-brand-primary-invert': 'rgb(255, 255, 255)',
  '--dsw-alias-brand-primary-new-colorprimary-new-color': 'rgb(45, 128, 208)',
  '--dsw-alias-brand-text': 'rgb(255, 255, 255)',
  '--dsw-alias-button-contrast-fill': 'rgb(45, 128, 208)',
  '--dsw-alias-button-elevated-fill': 'rgb(250, 253, 255)',
  '--dsw-alias-button-floating-fill': 'rgb(244, 250, 255)',
  '--dsw-alias-button-floating-hover': 'rgb(224, 240, 253)',
  '--dsw-alias-button-ghost-active-border': 'rgb(110, 165, 220)',
  '--dsw-alias-button-ghost-active-fill': 'rgb(210, 232, 250)',
  '--dsw-alias-button-ghost-active-hover': 'rgb(196, 224, 248)',
  '--dsw-alias-button-info-fill': 'rgb(224, 239, 252)',
  '--dsw-alias-button-info-hover': 'rgb(208, 231, 250)',
  '--dsw-alias-button-primary-dimmed': 'rgb(160, 200, 240)',
  '--dsw-alias-button-primary-fill': 'rgb(45, 128, 208)',
  '--dsw-alias-button-primary-hover': 'rgb(64, 143, 228)',
  '--dsw-alias-button-tool-bar-fill': 'rgb(236, 246, 254)',
  '--dsw-alias-button-tool-bar-fill-invisible': 'rgba(236, 246, 254, 0)',
  '--dsw-alias-button-tool-bar-hover': 'rgb(214, 235, 252)',
  '--dsw-alias-interactive-bg-active': 'rgb(200, 226, 248)',
  '--dsw-alias-interactive-bg-hover': 'rgb(222, 238, 252)',
  '--dsw-alias-interactive-bg-hover-accent': 'rgb(205, 230, 250)',
  '--dsw-alias-interactive-bg-hover-danger': 'rgb(250, 218, 218)',
  '--dsw-alias-interactive-bg-hover-solid': 'rgb(64, 143, 228)',
  '--dsw-alias-label-caption': 'rgb(150, 168, 186)',
  '--dsw-alias-label-dimmed': 'rgb(120, 140, 160)',
  '--dsw-alias-label-primary': 'rgb(35, 55, 80)',
  '--dsw-alias-label-primary-bluish': 'rgb(35, 60, 90)',
  '--dsw-alias-label-primary-dimmed': 'rgb(90, 110, 135)',
  '--dsw-alias-label-primary-foreground': 'rgb(255, 255, 255)',
  '--dsw-alias-label-primary-inverted': 'rgb(255, 255, 255)',
  '--dsw-alias-label-secondary': 'rgb(90, 108, 128)',
  '--dsw-alias-label-tertiary': 'rgb(130, 148, 168)',
  '--dsw-alias-markdown-citation': 'rgb(226, 240, 252)',
  '--dsw-alias-markdown-code-block': 'rgb(240, 247, 253)',
  '--dsw-alias-markdown-code-block-banner': 'rgb(222, 238, 252)',
  '--dsw-alias-markdown-code-segment-selected': 'rgb(205, 230, 250)',
  '--dsw-alias-markdown-code-segment-unselected': 'rgb(235, 245, 253)',
  '--dsw-alias-markdown-inline-code': 'rgb(232, 242, 252)',
  '--dsw-alias-markdown-placeholder': 'rgb(160, 178, 196)',
  '--dsw-alias-markdown-tag': 'rgb(214, 232, 248)',
  '--dsw-alias-scrollbar-bg-l1': 'rgb(228, 240, 250)',
  '--dsw-alias-scrollbar-bg-l2': 'rgb(214, 232, 248)',
  '--dsw-alias-scrollbar-hover-l1': 'rgb(190, 220, 246)',
  '--dsw-alias-scrollbar-hover-l2': 'rgb(170, 205, 240)',
  '--dsw-alias-state-business-primary': 'rgb(45, 128, 208)',
  '--dsw-alias-state-business-tertiary': 'rgb(222, 238, 252)',
  '--dsw-alias-state-error-primary': 'rgb(220, 60, 60)',
  '--dsw-alias-state-error-secondary': 'rgb(250, 224, 224)',
  '--dsw-alias-state-success-primary': 'rgb(70, 160, 100)',
  '--dsw-alias-state-success-secondary': 'rgb(222, 244, 230)',
  '--dsw-alias-state-success-tertiary': 'rgb(205, 236, 216)',
  '--dsw-alias-state-warn-label': 'rgb(140, 90, 20)',
  '--dsw-alias-state-warn-primary': 'rgb(230, 150, 40)',
  '--dsw-alias-state-warn-secondary': 'rgb(252, 240, 218)',
  '--dsw-alias-state-warn-tertiary': 'rgb(248, 230, 190)',
  '--dsw-alias-toast-bg': 'rgb(255, 252, 232)',
  '--dsw-alias-tooltip-bg': 'rgb(255, 253, 225)',
})

/** Required services: the theme registry (theme/change + register). */
export const inject = ['theme']

/**
 * Client plugin body: register the theme and mirror the active theme onto
 * the body skin attribute (exact retraction set).
 * @param ctx - client cordis context.
 */
export function apply(ctx: Context): void {
  ctx.theme.register({
    id: THEME_ID,
    colorScheme: 'light',
    tokens: { ...QQ2006_TOKENS },
  })

  // Restore a persisted preference this theme owns. The theme service's
  // restorePreference only accepts the built-in trio (light/dark/system), so
  // a persisted 'qq2006' falls back to 'system' at service construction.
  // Re-assert it now that the id is registered: setTheme persists (same
  // value) and republishes, so the mirror below applies the attribute. The
  // storage key is spelled out because ui-theme is not a module-table entry
  // (a value import would trip the client bundle purity gate); the shell's
  // boot.tsx reads the same key for the pre-settle loading page.
  if (typeof localStorage !== 'undefined') {
    try {
      if (localStorage.getItem('dsh.theme') === THEME_ID) ctx.theme.setTheme(THEME_ID)
    } catch {
      // Privacy-mode storage failure: the preference simply does not restore.
    }
  }

  const sync = (snapshot: ThemeSnapshot): void => {
    // Node e2e boots have no document; the mirror is browser presentation.
    if (typeof document === 'undefined') return
    if (snapshot.active.id === THEME_ID) document.body.setAttribute(SKIN_ATTRIBUTE, THEME_ID)
    else document.body.removeAttribute(SKIN_ATTRIBUTE)
  }
  ctx.on('theme/change', sync)
  // Seal the window between register()'s own event and this listener: a
  // snapshot read is authoritative at any point.
  sync(ctx.theme.getTheme())
}
