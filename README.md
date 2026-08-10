# dsh-qq2006 — DSH 的 QQ2006 皮肤插件

把 **DSH（DeepSeek Harness）WebUI** 完整改造成 QQ2006 客户端外观的可切换皮肤。
本仓库是皮肤插件的独立快照：**插件源码 + 全局皮肤表 + 完整素材 + 集成文档**。

> 素材来自 [mengkunsoft/QQ2006](https://github.com/mengkunsoft/QQ2006)
> （腾讯原版素材，**仅供学习交流、勿商用**，出处见 `assets/qq2006/README.txt`）。

## 仓库结构

```
dsh-qq2006/
├── src/
│   ├── index.ts            # 插件入口：注册 qq2006 主题 + body[data-ds-skin] 镜像
│   ├── invariant.ts        # 包内不变量
│   ├── client/index.ts     # 主题注册与镜像实现（QQ2006_TOKENS 珊瑚蓝覆盖）
│   └── styles/qq2006.css   # 全局皮肤表：字体/滚动条/九宫格工具类/三态钮/.qq-btn/状态点
├── assets/qq2006/          # 完整素材（img 366 + sound 8 + 版权说明）
├── docs/qq2006-skin.md     # 总文档：架构/按钮映射/真实实现清单/验证记录（256 轮迭代）
├── README.package.md       # 皮肤契约（机制/组件级补丁规则/素材）
├── package.json            # 插件包清单（peerDependencies：theme/invariants/cordis）
├── tsconfig.json           # 独立类型配置（构建在 DSH monorepo 内进行）
└── LICENSE                 # BSD-3-Clause
```

## 集成回 DSH monorepo

皮肤是 DSH 客户端插件体系的成员，完整效果依赖宿主包（`ui-conversation` /
`ui-sidebar` / `ui-workspace` / `ui-theme` / `ui-command` / `ui-primitives` /
`ui-layout` / `ui-trajectory` / `web`）中的组件级皮肤补丁。集成步骤：

1. **插件**：把 `src/`、`package.json`、`tsconfig.json` 放入
   `packages/client/ui-skin-qq2006/`（包名恢复 `@deepseek-ai/dsh-client-ui-skin-qq2006`，
   `dshClient.inject` 按名解析；构建用 monorepo 的 `tsdown.client.ts`）。
2. **素材**：把 `assets/qq2006/` 拷贝到 `apps/web/public/qq2006/`。
3. **皮肤表**：web shell 的 `base.css` 引入 `ui-skin-qq2006` 的 `styles/qq2006.css`。
4. **组件补丁**：各组件 `.module.css` 的 `body[data-ds-skin='qq2006']` 作用域段
   需要宿主代码同步（见 `docs/qq2006-skin.md` 的映射清单）。

## 功能全景（插件启用后）

- **全部按钮真实化**：面板栏 10、用户头部 6（QQ空间/QQ音乐/消息管理器）、标题栏 4
  （换肤/菜单/隐藏/关闭）、大工具栏 12（分享/黑名单归档/群空间）、小工具栏 8
  （原版图标素材）、底部按钮、消息操作 3（复制/引用/转发）、右键菜单、登录窗全交互
- **真实能力链路**：额度查询（`llm.balance`）、模型选择器、子智能体目录、归档、
  命令面板、详情面板（QQ空间/3D秀双入口）、轨迹切换、窗口换肤 4 预设、深色兼容、
  Alt+S 发送（含 IME 守卫）、自动登录联动、搜索实时过滤、群聊成员在线排序
- **登录窗完整**：账号可输入持久化（密码不存）、记住密码/自动登录联动、
  连接中点动画、插件进度状态色
- **持久化**：`dsh.theme` / `dsh.qq.winSkin` / `dsh.qq.sound` / `dsh.qq.font` /
  `dsh.qq.account` / `dsh.qq.remember` / `dsh.qq.autoLogin`

## 验证状态

- **单测 1561 全绿**（DSH monorepo 内 8 核心包 102 文件）
- **像素回归 0/255 零漂移**（5 张截图基线：默认/激活/聊天/粉色换肤/设置）
- **e2e 6/6 全绿**（40+ step：默认皮肤零污染/reload 持久化/全部真实动作链路）
- 默认皮肤零影响（CSS 契约测试锁定）

## 版权与许可

- 插件代码：BSD-3-Clause（本仓库 LICENSE）
- QQ2006 素材：腾讯原版，仅供学习交流（`assets/qq2006/README.txt`）
