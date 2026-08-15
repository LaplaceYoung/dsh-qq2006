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
import type { Context } from '@deepseek-ai/cordis';
/** Theme id this skin registers; also the value of the body skin attribute. */
export declare const THEME_ID = "qq2006";
/** Body attribute the skin mirror writes (component patches scope on it). */
export declare const SKIN_ATTRIBUTE = "data-ds-skin";
/**
 * QQ2006 coral-blue alias-token overrides, applied by the theme presenter as
 * inline CSS variables on body (the light base palette + these overrides
 * produce the classic 2006 look; component-level chrome comes from the skin
 * stylesheet and per-component patches).
 */
export declare const QQ2006_TOKENS: Readonly<Record<string, string>>;
/** Required services: the theme registry (theme/change + register). */
export declare const inject: string[];
/**
 * Client plugin body: register the theme and mirror the active theme onto
 * the body skin attribute (exact retraction set).
 * @param ctx - client cordis context.
 */
export declare function apply(ctx: Context): void;
//# sourceMappingURL=index.d.ts.map