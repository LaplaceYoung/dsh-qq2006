window.__ModuleLoader__.load({
	id: "@dsh-external/dsh-qq2006",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		/* Published client factory body. Wrapped by scripts/build-client.mjs.
   Token / CSS placeholders below are replaced at build time. */

const React = require('react')

const THEME_ID = 'qq2006'
const SKIN_ATTRIBUTE = 'data-ds-skin'
const SETTINGS_NS = 'qq2006'
const LOCALE_NS = 'settings.qq2006'
const STORE_KEY = 'dsh.qq2006.enabled'
const LEGACY_THEME_KEY = 'dsh.theme'
const OVERRIDE_SOURCE = '@dsh-external/dsh-qq2006'
const PACKAGE_ID = '@dsh-external/dsh-qq2006'
const ZH = {
  'skin.title': 'QQ2006 皮肤',
  'skin.hint': '开启后把当前 DSH 壳换成 QQ2006 蓝框（标题栏、侧栏、输入区）。外观行仍是浅色 / 深色 / 跟随系统。',
  'skin.on': '开启',
  'skin.off': '关闭',
}
const EN = {
  'skin.title': 'QQ2006 skin',
  'skin.hint': 'When on, the live DSH shell becomes a QQ2006 blue frame (title bar, sidebar, composer). Appearance stays Light / Dark / System.',
  'skin.on': 'On',
  'skin.off': 'Off',
}
const QQ2006_TOKENS = {
  "--dsw-alias-bg-base": "rgb(212, 232, 248)",
  "--dsw-alias-bg-layer-1": "rgb(234, 245, 253)",
  "--dsw-alias-bg-layer-2": "rgb(214, 234, 250)",
  "--dsw-alias-bg-layer-3": "rgb(190, 220, 242)",
  "--dsw-alias-bg-mask-1": "rgba(255, 255, 255, 0.92)",
  "--dsw-alias-bg-mask-2": "rgba(240, 248, 255, 0.85)",
  "--dsw-alias-bg-mask-3": "rgba(230, 241, 252, 0.8)",
  "--dsw-alias-bg-mask-photo": "rgba(255, 255, 255, 0.9)",
  "--dsw-alias-bg-mask-drop": "rgba(240, 247, 253, 0.72)",
  "--dsw-alias-bg-module-platform": "rgb(235, 245, 254)",
  "--dsw-alias-bg-multi-select": "rgb(213, 232, 250)",
  "--dsw-alias-bg-overlay": "rgba(245, 250, 255, 0.94)",
  "--dsw-alias-bg-skeleton": "rgb(214, 232, 249)",
  "--dsw-alias-border-inverted": "rgb(220, 235, 250)",
  "--dsw-alias-border-inverted2": "rgb(200, 222, 245)",
  "--dsw-alias-border-l1": "rgb(150, 190, 230)",
  "--dsw-alias-border-l2": "rgb(120, 165, 215)",
  "--dsw-alias-border-l2-darkmode-thin": "rgb(120, 165, 215)",
  "--dsw-alias-border-l3": "rgb(90, 140, 200)",
  "--dsw-alias-border-l4": "rgb(70, 115, 175)",
  "--dsw-alias-brand-primary": "rgb(45, 128, 208)",
  "--dsw-alias-brand-primary-invert": "rgb(255, 255, 255)",
  "--dsw-alias-brand-primary-new-colorprimary-new-color": "rgb(45, 128, 208)",
  "--dsw-alias-brand-text": "rgb(255, 255, 255)",
  "--dsw-alias-button-contrast-fill": "rgb(45, 128, 208)",
  "--dsw-alias-button-elevated-fill": "rgb(250, 253, 255)",
  "--dsw-alias-button-floating-fill": "rgb(244, 250, 255)",
  "--dsw-alias-button-floating-hover": "rgb(224, 240, 253)",
  "--dsw-alias-button-ghost-active-border": "rgb(110, 165, 220)",
  "--dsw-alias-button-ghost-active-fill": "rgb(210, 232, 250)",
  "--dsw-alias-button-ghost-active-hover": "rgb(196, 224, 248)",
  "--dsw-alias-button-info-fill": "rgb(224, 239, 252)",
  "--dsw-alias-button-info-hover": "rgb(208, 231, 250)",
  "--dsw-alias-button-primary-dimmed": "rgb(160, 200, 240)",
  "--dsw-alias-button-primary-fill": "rgb(45, 128, 208)",
  "--dsw-alias-button-primary-hover": "rgb(64, 143, 228)",
  "--dsw-alias-button-tool-bar-fill": "rgb(236, 246, 254)",
  "--dsw-alias-button-tool-bar-fill-invisible": "rgba(236, 246, 254, 0)",
  "--dsw-alias-button-tool-bar-hover": "rgb(214, 235, 252)",
  "--dsw-alias-interactive-bg-active": "rgb(200, 226, 248)",
  "--dsw-alias-interactive-bg-hover": "rgb(222, 238, 252)",
  "--dsw-alias-interactive-bg-hover-accent": "rgb(205, 230, 250)",
  "--dsw-alias-interactive-bg-hover-danger": "rgb(250, 218, 218)",
  "--dsw-alias-interactive-bg-hover-solid": "rgb(64, 143, 228)",
  "--dsw-alias-label-caption": "rgb(150, 168, 186)",
  "--dsw-alias-label-dimmed": "rgb(120, 140, 160)",
  "--dsw-alias-label-primary": "rgb(35, 55, 80)",
  "--dsw-alias-label-primary-bluish": "rgb(35, 60, 90)",
  "--dsw-alias-label-primary-dimmed": "rgb(90, 110, 135)",
  "--dsw-alias-label-primary-foreground": "rgb(255, 255, 255)",
  "--dsw-alias-label-primary-inverted": "rgb(255, 255, 255)",
  "--dsw-alias-label-secondary": "rgb(90, 108, 128)",
  "--dsw-alias-label-tertiary": "rgb(130, 148, 168)",
  "--dsw-alias-markdown-citation": "rgb(226, 240, 252)",
  "--dsw-alias-markdown-code-block": "rgb(240, 247, 253)",
  "--dsw-alias-markdown-code-block-banner": "rgb(222, 238, 252)",
  "--dsw-alias-markdown-code-segment-selected": "rgb(205, 230, 250)",
  "--dsw-alias-markdown-code-segment-unselected": "rgb(235, 245, 253)",
  "--dsw-alias-markdown-inline-code": "rgb(232, 242, 252)",
  "--dsw-alias-markdown-placeholder": "rgb(160, 178, 196)",
  "--dsw-alias-markdown-tag": "rgb(214, 232, 248)",
  "--dsw-alias-scrollbar-bg-l1": "rgb(228, 240, 250)",
  "--dsw-alias-scrollbar-bg-l2": "rgb(214, 232, 248)",
  "--dsw-alias-scrollbar-hover-l1": "rgb(190, 220, 246)",
  "--dsw-alias-scrollbar-hover-l2": "rgb(170, 205, 240)",
  "--dsw-alias-state-business-primary": "rgb(45, 128, 208)",
  "--dsw-alias-state-business-tertiary": "rgb(222, 238, 252)",
  "--dsw-alias-state-error-primary": "rgb(220, 60, 60)",
  "--dsw-alias-state-error-secondary": "rgb(250, 224, 224)",
  "--dsw-alias-state-success-primary": "rgb(70, 160, 100)",
  "--dsw-alias-state-success-secondary": "rgb(222, 244, 230)",
  "--dsw-alias-state-success-tertiary": "rgb(205, 236, 216)",
  "--dsw-alias-state-warn-label": "rgb(140, 90, 20)",
  "--dsw-alias-state-warn-primary": "rgb(230, 150, 40)",
  "--dsw-alias-state-warn-secondary": "rgb(252, 240, 218)",
  "--dsw-alias-state-warn-tertiary": "rgb(248, 230, 190)",
  "--dsw-alias-toast-bg": "rgb(255, 252, 232)",
  "--dsw-alias-tooltip-bg": "rgb(255, 253, 225)",
  "--dsw-specific-sidebar-fill": "rgb(198, 224, 246)",
  "--dsw-specific-sidebar-nav-item-hover": "rgb(186, 216, 242)",
  "--dsw-specific-sidebar-nav-item-active": "rgb(170, 206, 236)",
  "--dsw-specific-sidebar-nav-item-active-accent": "rgb(45, 128, 208)",
  "--dsw-specific-input-major": "rgb(255, 255, 255)",
  "--dsw-specific-login-input": "rgb(244, 250, 255)",
  "--dsw-specific-menu": "rgb(234, 245, 253)",
  "--dsw-specific-selector": "rgb(222, 238, 252)",
  "--dsw-specific-bubble": "rgb(209, 232, 255)",
  "--dsw-specific-bubble-highlight": "rgb(186, 216, 242)",
  "--dsw-specific-tip": "rgb(255, 253, 225)"
}
const QQ2006_CSS = "/* QQ2006 skin sheet — the global half of the skin.\n *\n * Scope discipline: EVERY rule in this file is anchored to\n * `body[data-ds-skin='qq2006']`, the attribute the plugin writes when the\n * settings toggle is on. The client injects this sheet itself (npm installs\n * never see a monorepo `base.css` import). The default skin is therefore\n * untouched by this file.\n *\n * Contents: retro typography, selection, scrollbars, and the shared skin\n * kit — the classic three-slice window chrome (.qq-skin-title / .qq-skin-head\n * / .qq-skin-body), three-state title buttons, and the gradient .qq-btn.\n * Component-level patches (conversation bubbles, sidebar rows, composer…)\n * live in each component's own .module.css, scoped the same way:\n *\n *   body[data-ds-skin='qq2006'] .localClass { … }\n *\n * Assets referenced below are served from apps/web/public/qq2006/ (copied\n * from the mengkunsoft/QQ2006 reproduction; original QQ2006 assets,\n * copyright Tencent, learning use only — see public/qq2006/README.txt).\n */\n\nbody[data-ds-skin='qq2006'] {\n  --dsw-font-family: Tahoma, 'SimSun', '宋体', 'Microsoft YaHei', sans-serif;\n  font-family: Tahoma, 'SimSun', '宋体', 'Microsoft YaHei', sans-serif;\n  /* Coral-blue alias tokens come from the ui-theme presenter (QQ2006_TOKENS);\n     the names below are the official --dsw-alias-* set. */\n  color: var(--dsw-alias-label-primary);\n}\n\nbody[data-ds-skin='qq2006'] ::selection {\n  background: var(--dsw-alias-brand-primary);\n  color: var(--dsw-alias-label-primary-foreground);\n}\n\n/* ── retro scrollbars ─────────────────────────────────────────────────────── */\nbody[data-ds-skin='qq2006'] {\n  scrollbar-width: thin;\n  scrollbar-color: var(--dsw-alias-border-l2) var(--dsw-alias-scrollbar-bg-l1);\n}\nbody[data-ds-skin='qq2006'] ::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\nbody[data-ds-skin='qq2006'] ::-webkit-scrollbar-track {\n  background: var(--dsw-alias-scrollbar-bg-l1);\n}\nbody[data-ds-skin='qq2006'] ::-webkit-scrollbar-thumb {\n  background: linear-gradient(to right, rgb(178, 205, 232), rgb(140, 178, 216));\n  border: 1px solid rgb(120, 165, 215);\n  border-radius: 4px;\n}\nbody[data-ds-skin='qq2006'] ::-webkit-scrollbar-thumb:hover {\n  background: linear-gradient(to right, rgb(150, 190, 230), rgb(120, 165, 215));\n}\n\n/* ── nine-slice window chrome kit ────────────────────────────────────────────\n * The 2006 skin is three horizontal bands (title / head / body), each a\n * left cap + tiling center + right cap at natural size (the original tiles\n * 10px-wide repeat patterns). Components compose them as background layers\n * on one element — no extra DOM. Use the .qq-skin-* classes directly from\n * TSX (they are :global utilities).\n */\nbody[data-ds-skin='qq2006'] .qq-skin-title {\n  background:\n    url('/qq2006/img/BackgroundTitleRight.png') right top no-repeat,\n    url('/qq2006/img/BackgroundTitleCenter.png') center top repeat-x,\n    url('/qq2006/img/BackgroundTitleLeft.png') left top no-repeat;\n  height: 24px;\n}\n\nbody[data-ds-skin='qq2006'] .qq-skin-head {\n  background:\n    url('/qq2006/img/BackgroundTitleRight2.png') right top no-repeat,\n    url('/qq2006/img/BackgroundTitleCenter2.png') center top repeat-x,\n    url('/qq2006/img/BackgroundTitleLeft2.png') left top no-repeat;\n  /* Full natural band height (BackgroundTitle2* are 61px tall); showing the\n     whole tile keeps the toolbar surface AND the dark bottom strip that the\n     original QQ2006 toolbar band carries. */\n  height: 61px;\n}\n\nbody[data-ds-skin='qq2006'] .qq-skin-body {\n  background:\n    url('/qq2006/img/BackgroundR.png') right top repeat-y,\n    url('/qq2006/img/BackgroundC.png') center top repeat,\n    url('/qq2006/img/BackgroundL.png') left top repeat-y;\n}\n\n/* ── three-state title buttons (16×16, Normal/Hover/Down) ─────────────────── */\nbody[data-ds-skin='qq2006'] .qq-skin-btn-min,\nbody[data-ds-skin='qq2006'] .qq-skin-btn-menu,\nbody[data-ds-skin='qq2006'] .qq-skin-btn-color,\nbody[data-ds-skin='qq2006'] .qq-skin-btn-close {\n  width: 16px;\n  height: 16px;\n  border: 0;\n  padding: 0;\n  cursor: pointer;\n  background-color: transparent;\n}\n/* 菜单 is a 65×24 text button in the original QQ2006 (MenuButton_*.png are\n   65×24 — a green gradient button with the white 菜单 label), not a 16×16\n   icon. Display it at native size; the title strip is 24px tall so it fills\n   the band exactly and sits level with the 16×16 color/min/close buttons. */\nbody[data-ds-skin='qq2006'] .qq-skin-btn-menu {\n  width: 65px;\n  height: 24px;\n  background-size: 65px 24px;\n}\nbody[data-ds-skin='qq2006'] .qq-skin-btn-menu {\n  background-image: url('/qq2006/img/MenuButton_Normal.png');\n}\nbody[data-ds-skin='qq2006'] .qq-skin-btn-menu:hover {\n  background-image: url('/qq2006/img/MenuButton_Hover.png');\n}\nbody[data-ds-skin='qq2006'] .qq-skin-btn-menu:active {\n  background-image: url('/qq2006/img/MenuButton_Down.png');\n}\nbody[data-ds-skin='qq2006'] .qq-skin-btn-min {\n  background-image: url('/qq2006/img/MinButton_Normal.png');\n}\nbody[data-ds-skin='qq2006'] .qq-skin-btn-min:hover {\n  background-image: url('/qq2006/img/MinButton_Hover.png');\n}\nbody[data-ds-skin='qq2006'] .qq-skin-btn-min:active {\n  background-image: url('/qq2006/img/MinButton_Down.png');\n}\nbody[data-ds-skin='qq2006'] .qq-skin-btn-color {\n  background-image: url('/qq2006/img/ColorButton_Normal.png');\n}\nbody[data-ds-skin='qq2006'] .qq-skin-btn-color:hover {\n  background-image: url('/qq2006/img/ColorButton_Hover.png');\n}\nbody[data-ds-skin='qq2006'] .qq-skin-btn-color:active {\n  background-image: url('/qq2006/img/ColorButton_Down.png');\n}\nbody[data-ds-skin='qq2006'] .qq-skin-btn-close {\n  background-image: url('/qq2006/img/CloseButton_Normal.png');\n}\nbody[data-ds-skin='qq2006'] .qq-skin-btn-close:hover {\n  background-image: url('/qq2006/img/CloseButton_Hover.png');\n}\nbody[data-ds-skin='qq2006'] .qq-skin-btn-close:active {\n  background-image: url('/qq2006/img/CloseButton_Down.png');\n}\n\n/* ── classic gradient button (replica of the original .qq-btn) ────────────── */\nbody[data-ds-skin='qq2006'] .qq-btn {\n  font-size: 12px;\n  line-height: 1.6;\n  font-family: inherit;\n  background: linear-gradient(to bottom, #ffffff, #9fd4ff);\n  border: 1px solid #00558e;\n  border-radius: 3px;\n  cursor: pointer;\n  color: rgb(20, 40, 70);\n  padding: 1px 8px;\n}\nbody[data-ds-skin='qq2006'] .qq-btn:focus {\n  box-shadow: inset 0 0 0 1px #ffe762, inset 0 0 0 2px #fcb833;\n}\nbody[data-ds-skin='qq2006'] .qq-btn:hover {\n  background: linear-gradient(to bottom, #ffffff, #b9e1ff);\n}\nbody[data-ds-skin='qq2006'] .qq-btn:active {\n  background: linear-gradient(to bottom, #97c5ec, #d2f8fd);\n}\n\n/* ── status pill (在线/离线…) ─────────────────────────────────────────────── */\nbody[data-ds-skin='qq2006'] .qq-skin-status {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  border: 1px solid var(--dsw-alias-border-l3);\n}\nbody[data-ds-skin='qq2006'] .qq-skin-status-on {\n  background: var(--dsw-alias-state-success-primary);\n}\nbody[data-ds-skin='qq2006'] .qq-skin-status-off {\n  background: rgb(170, 180, 192);\n}\n\n/* ── global keyboard-focus ring: the QQ golden outline everywhere ──\n * warn-primary is the QQ2006 amber (#e69628 family) carried by the alias\n * token overrides; the golden focus ring rides it so the sheet stays\n * token-driven. */\nbody[data-ds-skin='qq2006'] :focus-visible {\n  outline: 2px solid var(--dsw-alias-state-warn-primary);\n  outline-offset: 1px;\n}\n\n/* ── message font-size cycle (the A toolbar button): 小/中/大 ── */\nbody[data-ds-skin='qq2006'] {\n  --qq-msg-font-size: 13px;\n}\nbody[data-ds-skin='qq2006'][data-qq-font='s'] {\n  --qq-msg-font-size: 12px;\n}\nbody[data-ds-skin='qq2006'][data-qq-font='l'] {\n  --qq-msg-font-size: 15px;\n}\n\n/* ── stock DSH 0.1.x shell overlay ──────────────────────────────────────────\n * The utility kit above (.qq-skin-*, .qq-btn) only paints when host\n * components opt in (the monorepo patch). The released plugin must still\n * change the live DSH frame — title bar, sidebar, composer — or the\n * settings toggle is a no-op. Every rule stays under data-ds-skin.\n * Selectors use stable attributes / #root / :has(), never hashed modules.\n */\nbody[data-ds-skin='qq2006'] {\n  background: #3d7cbf !important;\n}\n\nbody[data-ds-skin='qq2006'] #root {\n  box-sizing: border-box;\n  height: 100%;\n  padding: 26px 4px 4px;\n  background:\n    linear-gradient(to bottom, #1f6bb3 0%, #3d8ad4 45%, #6eb4ea 100%) top / 100% 24px no-repeat,\n    #6ea6d8;\n  position: relative;\n}\n\nbody[data-ds-skin='qq2006'] #root::before {\n  content: 'QQ2006';\n  position: absolute;\n  top: 0;\n  left: 10px;\n  right: 10px;\n  height: 24px;\n  line-height: 24px;\n  color: #fff;\n  font: 700 12px Tahoma, 'Microsoft YaHei', sans-serif;\n  letter-spacing: 0.4px;\n  text-shadow: 0 1px 0 #14508c;\n  pointer-events: none;\n  z-index: 4;\n}\n\nbody[data-ds-skin='qq2006'] #root > * {\n  border: 1px solid #245488;\n  background: #d6ebfb;\n  box-shadow: inset 1px 1px 0 #eef6fd, 0 0 0 1px #9ec4e8;\n}\n\n/* Sidebar column = first grid child of the app frame. */\nbody[data-ds-skin='qq2006'] #root > * > *:first-child {\n  background: #c5e0f5 !important;\n  border-right: 1px solid #7aa5d6 !important;\n}\n\nbody[data-ds-skin='qq2006'] #root > * > *:first-child > *:first-child {\n  background: transparent !important;\n}\n\nbody[data-ds-skin='qq2006'] #root button {\n  border-radius: 3px !important;\n}\n\n/* Conversation / hero column. */\nbody[data-ds-skin='qq2006'] #root > * > *:nth-child(2) {\n  background:\n    linear-gradient(to bottom, #b9d6f0 0 28px, transparent 28px),\n    #eaf4fc;\n}\n\nbody[data-ds-skin='qq2006'] button,\nbody[data-ds-skin='qq2006'] input,\nbody[data-ds-skin='qq2006'] select,\nbody[data-ds-skin='qq2006'] textarea {\n  font-family: Tahoma, 'SimSun', '宋体', 'Microsoft YaHei', sans-serif;\n}\n\n/* New Session and other labeled sidebar actions → classic QQ gradient. */\nbody[data-ds-skin='qq2006'] button[aria-label] {\n  border-radius: 3px;\n}\n\nbody[data-ds-skin='qq2006'] button[aria-label*='New Session'],\nbody[data-ds-skin='qq2006'] button[aria-label*='新会话'] {\n  background: linear-gradient(to bottom, #ffffff, #9fd4ff) !important;\n  border: 1px solid #00558e !important;\n  border-radius: 3px !important;\n  color: #143246 !important;\n}\n\n/* Composer card (the nearest box that owns a textarea). */\nbody[data-ds-skin='qq2006'] #root :is(div):has(> textarea),\nbody[data-ds-skin='qq2006'] #root :is(div):has(> [contenteditable='true']) {\n  border-radius: 2px !important;\n  border: 1px solid #7aa5d6 !important;\n  box-shadow: inset 1px 1px 0 #fff !important;\n  background: #fff !important;\n}\n\n/* Settings dialog → framed QQ window. The modal covers the shell, so this\n   is the surface the toggle must repaint immediately. */\nbody[data-ds-skin='qq2006'] [role='dialog'] {\n  box-sizing: border-box;\n  padding-top: 24px !important;\n  border-radius: 0 !important;\n  border: 2px solid #1f5f9e !important;\n  box-shadow: 0 0 0 1px #9ec4e8, 0 8px 24px rgba(20, 60, 110, 0.35) !important;\n  background: #d6ebfb !important;\n  overflow: hidden;\n}\n\nbody[data-ds-skin='qq2006'] [role='dialog']::before {\n  content: 'Settings · QQ2006';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 24px;\n  line-height: 24px;\n  padding: 0 8px;\n  color: #fff;\n  font: 700 12px Tahoma, 'Microsoft YaHei', sans-serif;\n  text-shadow: 0 1px 0 #14508c;\n  background: linear-gradient(to bottom, #1f6bb3 0%, #3d8ad4 45%, #6eb4ea 100%);\n  z-index: 2;\n}\n\nbody[data-ds-skin='qq2006'] [role='dialog'] button {\n  border-radius: 3px !important;\n}\n\nbody[data-ds-skin='qq2006'] .qq2006-settings-cube {\n  border-radius: 3px !important;\n  background: linear-gradient(to bottom, #ffffff, #cfe6f8);\n}\n\nbody[data-ds-skin='qq2006'] .qq2006-settings-cube-on {\n  background: linear-gradient(to bottom, #ffe762, #fcb833) !important;\n  border-color: #c48a10 !important;\n  color: #3a2a00 !important;\n}\n"
const SETTINGS_CSS = "/* Settings chrome for the plugin-owned toggle. Not scoped to data-ds-skin:\n   the row must stay visible while the skin is off. */\n\n.qq2006-settings {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 16px 0;\n  border-bottom: 1px solid var(--dsw-alias-border-l2, rgb(120, 165, 215));\n}\n\n.qq2006-settings-title {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 22px;\n  color: var(--dsw-alias-label-primary, rgb(35, 55, 80));\n}\n\n.qq2006-settings-hint {\n  font-size: 12px;\n  line-height: 18px;\n  color: var(--dsw-alias-label-secondary, rgb(90, 108, 128));\n}\n\n.qq2006-settings-row {\n  display: flex;\n  align-items: stretch;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.qq2006-settings-cube {\n  box-sizing: border-box;\n  flex: 1 1 140px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 12px 16px;\n  border: 1px solid var(--dsw-alias-border-l2, rgb(120, 165, 215));\n  border-radius: 16px;\n  background: transparent;\n  font: inherit;\n  font-size: 14px;\n  line-height: 22px;\n  color: var(--dsw-alias-label-primary, rgb(35, 55, 80));\n  cursor: pointer;\n}\n\n.qq2006-settings-cube:hover:not(.qq2006-settings-cube-on) {\n  background: var(--dsw-alias-interactive-bg-hover, rgb(222, 238, 252));\n}\n\n.qq2006-settings-cube-on {\n  background: var(--dsw-alias-bg-module-platform, rgb(235, 245, 254));\n  border-color: rgb(45, 128, 208);\n}\n\n.qq2006-plugin-card {\n  padding: 8px 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  min-width: 220px;\n  font-size: 13px;\n  color: var(--dsw-alias-label-primary, #333);\n}\n"

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

function translate(t, key) {
  if (typeof t === 'function') {
    try {
      const value = t(key)
      if (typeof value === 'string' && value.length > 0) return value
    } catch { /* fall through to zh */ }
  }
  return ZH[key] || key
}

function SkinToggleRow({ store, t }) {
  const [enabled, setEnabled] = React.useState(() => store.get())
  React.useEffect(() => store.subscribe(() => setEnabled(store.get())), [store])
  return React.createElement('div', { className: 'qq2006-settings' },
    React.createElement('div', { className: 'qq2006-settings-title' }, translate(t, 'skin.title')),
    React.createElement('div', { className: 'qq2006-settings-hint' }, translate(t, 'skin.hint')),
    React.createElement('div', { className: 'qq2006-settings-row' },
      React.createElement('button', {
        type: 'button',
        className: 'qq2006-settings-cube' + (enabled ? ' qq2006-settings-cube-on' : ''),
        'aria-pressed': enabled,
        onClick: () => store.set(true),
      }, translate(t, 'skin.on')),
      React.createElement('button', {
        type: 'button',
        className: 'qq2006-settings-cube' + (!enabled ? ' qq2006-settings-cube-on' : ''),
        'aria-pressed': !enabled,
        onClick: () => store.set(false),
      }, translate(t, 'skin.off')),
    ),
  )
}

function SkinSettingsCard({ store, t }) {
  return React.createElement('div', { className: 'qq2006-plugin-card' },
    React.createElement(SkinToggleRow, { store, t }),
  )
}

function registerLocale(ctx) {
  const locale = ctx.get ? (ctx.get('locale') ?? ctx.locale) : ctx.locale
  if (locale === undefined || typeof locale.register !== 'function') return
  try {
    ctx.effect(() => locale.register(LOCALE_NS, { zh: ZH, en: EN }))
    return
  } catch {
    // 0.1.1 and earlier expose only the (ns, locale, dict) overload.
  }
  try {
    ctx.effect(() => {
      const dropZh = locale.register(LOCALE_NS, 'zh', ZH)
      const dropEn = locale.register(LOCALE_NS, 'en', EN)
      return () => {
        if (typeof dropZh === 'function') dropZh()
        if (typeof dropEn === 'function') dropEn()
      }
    })
  } catch {
    // Locale service present but rejected the namespace: keep baked zh copy.
  }
}

function registerSettings(ctx, store) {
  const slots = ctx.get ? (ctx.get('slots') ?? ctx.slots) : ctx.slots
  if (slots === undefined || typeof slots.inject !== 'function') return
  try {
    slots.inject('settings.general.item', () => slots.register(
      { name: 'settings.general.item', id: 'qq2006-skin', order: 15, locale: LOCALE_NS },
      function Qq2006GeneralRow(props) {
        return React.createElement(SkinToggleRow, { store, t: props && props.t })
      },
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
        { name: 'settings.plugin.item', key: SETTINGS_NS, locale: LOCALE_NS },
        function Qq2006PluginCard(props) {
          return React.createElement(SkinSettingsCard, { store, t: props && props.t })
        },
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
  registerLocale(ctx)
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

		return module.exports;
	}
});
