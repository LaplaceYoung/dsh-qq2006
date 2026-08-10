/**
 * Package-owned invariant companion for `@deepseek-ai/dsh-client-ui-skin-qq2006`.
 * @module @deepseek-ai/dsh-client-ui-skin-qq2006/invariant
 */

/* jscpd:ignore-start */
import type { Context } from 'cordis'
import type { InvariantInstaller } from '@deepseek-ai/dsh-invariants'

const PACKAGE_NAME = '@deepseek-ai/dsh-client-ui-skin-qq2006'

/** Cordis companion plugin name. */
export const name = 'client-ui-skin-qq2006-invariant'
/** Service required before the companion can reserve package ownership. */
export const inject = ['invariants']

/**
 * No runtime invariant: the skin is a pure presentation overlay — theme
 * registration and the body attribute mirror are exercised by the theme
 * registry's own behavior specs plus the web e2e snapshots.
 */
const install: InvariantInstaller = () => {}

/**
 * Register this package's invariant companion.
 * @param ctx - Cordis context carrying the invariant service.
 * @returns the installed registration's disposer after setup succeeds.
 */
export const apply = (ctx: Context): Promise<() => void> =>
  Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install))
/* jscpd:ignore-end */
