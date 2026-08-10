# ui-skin-qq2006 — QQ2006 皮肤契约（子智能体必读）

把 DSH WebUI 改成 QQ2006 外观的可切换皮肤。**默认皮肤零回归是硬约束**。

## 机制（地基已完成，勿改动）

- 皮肤 = 注册主题 `qq2006`（`ctx.theme.register`，见 `src/client/index.ts`），
  在设置 → 外观（Appearance 行）作为第 4 个选项出现（light/dark/system/QQ2006 皮肤），
  偏好持久化在 localStorage `dsh.theme`。
- 生效标志：`body[data-ds-skin='qq2006']`（插件镜像 + boot.tsx 提前恢复，加载页也能被皮肤）。
- 全局皮肤表：`src/styles/qq2006.css`（由 web shell 的 base.css 引入）。
  含字体、滚动条、九宫格工具类（`.qq-skin-title/.qq-skin-head/.qq-skin-body`）、
  三态标题钮（`.qq-skin-btn-min/-color/-close`）、渐变按钮 `.qq-btn`、状态点 `.qq-skin-status`。
- 主题 token 覆盖：`QQ2006_TOKENS`（`--dsw-alias-*` 珊瑚蓝体系，body 内联变量）。

## 组件级补丁规则（子智能体的主要工作）

在**组件自己的 `.module.css`** 末尾追加皮肤段，全部用祖先作用域：

```css
body[data-ds-skin='qq2006'] .localClass { … }
```

不要用全局选择器去匹配其他组件的 hash 类名；必要时给组件 TSX 加 `data-*`
属性钩子（小改动、无副作用）。所有视觉改动必须只在皮肤作用域内生效。

## 素材

- 静态资源根：`/qq2006/img/...`、`/qq2006/sound/...`（apps/web/public/qq2006/，已拷贝）。
- 头像：`/qq2006/img/avatar/NN.png`（NN ∈ 1..119 附近）。
- 版权：腾讯素材、仅供学习、勿商用（public/qq2006/README.txt 已注明）。

## 文件所有权（并行子智能体互不越界）

| 子智能体 | 可改文件 |
|---|---|
| 主面板 | packages/client/ui-sidebar/**（全部） |
| 聊天窗口 | packages/client/ui-conversation/**（全部） |
| 登录/加载页 + 通用 chrome | packages/client/web/src/AppRoot.*、ui-primitives 的 ConnectionBanner/Modal/Button 等 .module.css |
| 禁止任何人 | packages/client/ui-skin-qq2006/**、packages/client/ui-theme/**、packages/client/ui-layout/**、base.css、cordis.patch.yml、一切 package.json（pnpm-lock 只由根安装生成） |

## 构建与验证命令（仓库根）

- `pnpm --filter @deepseek-ai/dsh-client-ui-sidebar run bundle` 等（各包 `tsdown`）
- `pnpm --filter @deepseek-ai/dsh-frontend build`（vite 全量 web 构建）
- 测试：`pnpm --filter @deepseek-ai/dsh-client-<pkg> exec vitest run tests/...`
- **不要**单独跑 `pnpm install`（锁文件并发冲突）；**不要**动 `pnpm-lock.yaml`。

## 构建注意事项（重要）

- 各 ui-* 包构建：`pnpm --filter @deepseek-ai/dsh-client-<pkg> run bundle`（tsdown）。
- 类型检查用**根级** `pnpm exec tsc -b tsconfig.json`，或显式指向 tsconfig 文件：
  `pnpm exec tsc -b packages/client/<pkg>/tsconfig.json`。
- **不要**用 `tsc -b packages/client/<pkg>`（目录参数）：tsc 可能解析到错误的
  tsconfig，把 .js/.d.ts emit 写进 src/ 树（曾发生，污染 vite 的源码解析，
  表现为 `TypeError: Cannot read properties of undefined (reading 'load')`）。
  若误触发，清理 `find packages/client/<pkg>/src -name '*.js' -o -name '*.d.ts'` 产物。
