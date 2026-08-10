# QQ2006 皮肤 —— 总览文档

把 DSH WebUI 完整改造成 QQ2006 客户端外观的可切换皮肤。素材来自
[mengkunsoft/QQ2006](https://github.com/mengkunsoft/QQ2006)（腾讯原版素材，
仅供学习交流、勿商用，出处见 `apps/web/public/qq2006/README.txt`）。

## 开启方式

设置 → 外观 → **QQ2006 皮肤**（Appearance 行第 4 个选项；偏好持久化于
localStorage `dsh.theme`，刷新后保持）。默认皮肤零影响（所有皮肤样式锚定
`body[data-ds-skin='qq2006']`）。

## 架构

| 层 | 位置 |
|---|---|
| 主题注册 + body 属性镜像 + reload 持久化 | `packages/client/ui-skin-qq2006`（`QQ2006_TOKENS`、`data-ds-skin`） |
| 全局皮肤表（字体/滚动条/九宫格工具类/焦点环） | `packages/client/ui-skin-qq2006/src/styles/qq2006.css`（由 shell `base.css` 引入，加载页也可用） |
| 组件皮肤段 | 各 `ui-*` 包 `.module.css` 尾部 `body[data-ds-skin='qq2006']` 作用域（外观行选中 cube 金环、命令面板内部控件等） |
| 气泡 | 自己气泡经典蓝预设为 **QQ 原版淡蓝渐变**（白→浅蓝；其他换肤预设保持平面淡色） |
| 命令面板/模型选择器 | 卡片/搜索框/选项行/状态行/错误行/详情列全部 QQ 化（聚焦蓝环、QQ 蓝底选中、错误红） |
| 静态素材 | `apps/web/public/qq2006/`（img 366 文件 + sound 8 个） |

## 界面覆盖（均已 QQ 化）

登录/加载页（含实时插件进度）、主面板（用户头部/10 钮面板栏/分组/好友项/搜索）、
聊天窗口（标题栏/大工具栏/气泡/日期条/打字动画/系统消息/输入区/底部；
**空白会话也显示完整窗口 chrome**——皮肤下恢复被默认皮肤隐藏的原生 header，标题栏/大工具栏常驻）、
群聊（群标题/群头像/成员条/成员列表/点击进子会话）、工具调用（传输条/错误条/
展开卡片）、产物文件（文件徽章+打开）、权限确认、目标条、轨迹视图（时间线/表格）、
详情面板、空态、设置面板、命令菜单、下拉、弹窗、代码块、搜索结果、上下文仪表、
消息操作、状态点、滚动条、焦点环。

## 真实实现清单（按钮 = 真实 DSH 功能）

| 按钮 | 实现 |
|---|---|
| 短信 | 聚焦输入框（`composer-focus` 注册表） |
| 邀请 | 预填启动子智能体指令（模型创建 → 群聊成员实时出现） |
| 视频 | 切换轨迹视图（执行回放） |
| 语音 | 新消息提示音开关 |
| 传文件 | 定位最近一次工具调用 |
| 分享（大工具栏） | 复制会话分享文本（剪贴板，真实） |
| 音乐（大工具栏） | 打开模型选择器（CommandService 可选服务） |
| 群邮件（大工具栏） | 打开设置面板（与标题栏菜单同源） |
| 窗口（大工具栏） | 收起右侧详情面板（layout.closeDetails） |
| 黑名单（大工具栏） | **归档当前会话**（workspaces.archiveSession，从列表隐藏、日志保留） |
| 群空间（大工具栏） | 打开当前会话的子智能体目录（SubagentCatalogService 可选服务） |

大工具栏 12 钮（短信/视频/语音/传文件/3D秀/邀请/分享/音乐/群邮件/窗口/黑名单/
群空间）紧凑排布单行（按钮 padding/间距收紧，62px 高度不变）。

群公告条：群聊窗口的群公告改为 QQ 黄色公告条（浅黄渐变 + 金边 +
「群公告：」加粗前缀），与群成员条视觉呼应。

发送按钮三态：发送(S) 按下时反向渐变+内阴影（按钮凹陷），停止态整钮转红
（边框/文字/渐变），hover 加深——还原 QQ2006 按钮手感。**Alt+S 提交**：
标签里的 (S) 即快捷键，输入区 Alt+S 与 Enter 等效提交（锁定/忙碌/IME
组合守卫一致——组合中 Alt+S 不提交；Ctrl+Z/Y 撤销在组合中放行给原生
栈（组合文本由浏览器撤销）。

小工具栏图标：8 个按钮（A 字体/表情/其他/图片/截图/场景/超级表情/语音对讲）
从 glyph 换为 **QQ2006 原版工具栏图标素材**（`IMSmallToolbar*`，18×18），
glyph 保留为无素材时的兜底与无障碍锚点。
| 3D秀 | 打开右侧详情面板 |
| 聊天记录(H) / 消息模式(T) | 加载更早消息 / 对话↔轨迹切换（底部按钮真实化） |
| ↓ | 滚动到最新消息 |
| ☰ | 打开命令面板 |
| ☺ / 🎒 | emoji 插入面板 |
| 🖼 | 插入图片引用模板 |
| ✂ | 复制最近回复 |
| A 字体 | 消息字号循环（小/中/大） |
| 🎵 场景 | 主题循环（浅色/深色/QQ2006） |
| 更换颜色（标题栏） | **聊天窗口换肤**：经典蓝/粉红/薄荷绿/紫罗兰 4 套预设循环（`dsh.qq.winSkin` 持久化，气泡/面板/窗口体/输入区实时换色） |
| 菜单（标题栏） | **打开设置面板**（ui-settings 的 SettingsService，`ctx.get('settings')` 可选服务；宿主无设置插件时提示兜底） |
| 隐藏（标题栏） | **折叠主面板**（layout.toggleSidebar，QQ2006 最小化语义；再点恢复） |
| 关闭（标题栏） | **清除当前会话**（sessions.clear，回到无会话视图；会话保留在列表中，空白会话因仅选中时显示会暂时从树中隐藏） |
| 🎤 语音对讲 | 朗读最近回复（浏览器 TTS，再点停止） |
| 发送(S) | 真实提交 + QQ 发送点击音；群聊会话按钮文案为「发送到群(S)」 |
| 音乐中心 | 打开 /model 模型选择器（`CommandService.openContribution`；无会话时如实提示「请先新建会话再选择模型」） |
| 网络硬盘 | 打开宿主目录选择器（`workspaces.pickDirectory`） |
| 钱包 | **真实查询额度**（`llm.balance` → DeepSeek `/user/balance`） |
| 综合业务 / 网络杂志 / 钱包(兜底) | 打开设置面板（`SettingsService`） |
| 面板管理器 | 工作区分组 ↔ 平铺切换（`workspaceView` 共享服务） |
| 企业好友 | 打开当前会话子智能体目录（`subagentCatalog` 信号） |
| 自定义面板 | 打开当前会话命令面板（`commandMenu` 注册表） |
| 状态按钮 | 实时连接状态 |
| 邮箱 / 无线乐园 | 新建会话 |
| 安全中心 / 互动空间 | 折叠面板 |
| 消息模式(T)（标题栏/底部） | 对话 ↔ 轨迹视图切换（`view-toggle` 注册表） |
| 群成员头像 | 打开子智能体会话 |
| 登录按钮（失败态） | 重试刷新 |

声音体系：新消息提示音（msg.mp3，可开关 + localStorage 持久化）、发送
点击音（Global.mp3）、🎤 TTS 朗读（解锁门控与提示音开关共用）。

聊天窗口配色：标题栏「更换颜色」按钮在 经典蓝（默认）/粉红/薄荷绿/紫罗兰
4 套预设间循环，**设置 → 通用 →「聊天窗口配色」** 行可直接点选（`QQWinSkinRow`，
皮肤专属行，非 QQ2006 皮肤下隐藏）；两处入口共享同一存储，持久化于
`dsh.qq.winSkin`；换色通过 `data-qq-win-skin` 属性 + `--qq-win-*` CSS 变量
实时作用于窗口体、消息面板、自己/对方气泡与输入区（存储模块
`chat/qq-win-skin.ts`，事件 `qq:win-skin`）。

引用块样式：markdown blockquote（含「引用」动作生成的 `> 块`）在 QQ
皮肤下呈黄色引用条（金边 + 浅黄渐变，与群公告条呼应）。

消息转发：消息操作行「转发」（⤴，仅皮肤下显示）把消息以引用格式
（`> 内容`）复制到剪贴板——QQ 转发语义（粘贴到其他会话/外部）。

消息引用：消息 hover 操作行新增「引用」（❝，仅皮肤下显示）——点击把
「> 引用文本」块追加进输入框并聚焦（`chat/qq-reply.ts` 注册表：输入框注册
插入器、消息侧调用，QQ 回复语义）；成功反馈 ✓ 1s。

消息右键复制：QQ 皮肤下右键消息气泡（自己/助手）直接复制全文并弹 QQTip
（`chat/qq-right-copy.ts`，点击时按 body 皮肤属性门控，默认皮肤保留浏览器原生菜单）。

登录窗零污染契约：`app-root-styles.spec.ts` 断言登录窗 CSS 文本——
默认皮肤下 titleBar/banner/form/勾选框行全部 `display:none`（加载页本体
`.boot` 保持 grid），仅皮肤作用域显示；勾选框 accent-color、登录按钮尺寸
均为契约项。QQ2006 登录窗新增「记住密码」（默认勾选）/「自动登录」
勾选框，真实切换并持久化（`dsh.qq.remember` / `dsh.qq.autoLogin`），
QQ 号码可输入并持久化（`dsh.qq.account`，默认 DeepSeek）；密码可输入但
**绝不持久化**（真实登录不存凭据）。QQ 号码为空时登录按钮禁用
（QQ 语义，皮肤下 0.5 透明度）；按下时反向渐变+内阴影（与发送按钮同款
QQ 按钮手感，契约测试覆盖）；「连接中」反馈文案带动态点动画
（连接中→连接中.→..→... 每 400ms 循环，仅 pressed 时运行）。勾选「自动登录」后 400ms 自动进入
「连接中…」反馈（2s 窗口，单次触发防循环——ref 防重入）；取消
「记住密码」会同步取消「自动登录」（QQ 联动语义）。
勾选「自动登录」时登录按钮文案联动为「自动登录」；默认皮肤下隐藏
（登录页零变化）。

群成员列表：展开的成员列表**在线（运行中）优先排序**（QQ 群成员列表
惯例）；「群成员 N 人 · 在线 X」按钮显示实时在线数。

群成员状态：成员条/成员列表头像 hover 显示「名字（在线/离线）」
（跟随 activity 实时）。

群聊输入框提示：群聊会话（有子智能体成员）输入框提示为「发送到群（N 人）」
（`chat/qq-group-count.ts` 注册表：header 发布成员数，输入框按会话读取，与
composer-focus 同模式）。

搜索结果行：QQ 皮肤下搜索结果（会话匹配）带确定性头像（与好友行一致，
24×24 圆角 + 蓝描边）。

搜索框图标：QQ 皮肤下搜索框按钮换为原版「查找」图标（SearchButton.png，
仅 wide 模式；rail 保持现代图标）。

搜索框/输入框占位提示：QQ 皮肤下搜索框提示换为原版文案「查找联系人、群、会话…」
（斜体浅灰），聊天输入框（hero 与常规）换为「想聊点什么？输入消息，Enter 发送」/
「请输入消息，Enter 发送」——共享 `useQqSkin` hook（ui-primitives 平台模块，
MutationObserver 观察 body 皮肤属性实时切换；默认皮肤保持产品文案）。

分组当前会话标记：含当前会话的好友分组带左侧珊瑚蓝强调条
（`data-active`）。

分组标题交互：好友分组行 hover 时标题与 (在线/总数) 计数加深为藏青
（QQ 原版分组行手感）；计数带 title 提示「在线 N / 共 M」。

分组展开动画：会话行挂载时播放 160ms 淡入下落（`qqRowIn`，仅皮肤作用域）
——好友分组展开/折叠时的 QQ 好友项出现手感。

右键菜单（QQ2006 好友/分组右键体验）：会话行右键在指针处弹出
重命名/分叉/归档/复制会话 ID 菜单（⋯ 按钮同菜单；复制 ID 真实写剪贴板）；工作区行（= QQ 好友分组）右键弹出
重命名/删除工作区/复制路径菜单（复制路径真实写剪贴板）；空白会话行（尚未发言）无操作菜单、右键不弹。
菜单经 Menu 组件 `getAnchorRect` 以指针坐标定位（`new DOMRect(clientX, clientY)`）。

其余按钮（仅 QQ好友 为当前视图指示，点击显示提示）——面板栏 10 钮已全部
真实化：企业好友 → 子智能体目录（subagentCatalog 信号）、自定义面板 → 命令面板
（commandMenu 注册表）。**10 钮点击均弹动作反馈 tip**（如「已切换到会话列表视图」、
「已打开子智能体目录」——QQ 按钮按下→黄条提示的完整手感）。用户头部
mini 按钮（邮箱=新建会话、安全中心=收起/展开面板、**QQ空间=详情面板、
QQ音乐=模型选择器、消息管理器=命令面板**——原版 16×16 顶层按钮素材）
同样带反馈 tip。（2026-08 修复：`qqUserHead` 皮肤段缺 `display` 覆盖，
头部（头像/状态/昵称/6 按钮）此前被默认 `display:none` 隐藏——补
`display: block` 后 e2e 可见性验证含全部 8 个头部元素。另修复
`detailsSession` 排除空白会话导致详情列无法打开的问题——空白会话现在
也可拥有详情列（空态统计兜底，会话切换仍自动关闭）。）

发送按钮：tooltip 提示 `发送 (Alt+S)`（皮肤下），Alt+S 与 Enter 等效提交；
消息气泡的 HH:MM:SS 时间戳 hover 显示完整日期时间
（`YYYY-MM-DD HH:MM:SS`，`formatQqFullTime`）；日期条（今天/昨天/日期）
hover 同样显示完整时间。

详情面板空态（3D秀 打开无选中调用）：显示会话概览统计
「消息 N 条 · 工具调用 M 次」（`details.stats`，真实计数），QQ 皮肤下为
蓝色状态胶囊样式（浅蓝底 + 蓝边 + 藏青字）。

## host 端新增面

- `llm.balance` RPC（loopback 特权）：`LlmAdapter.balance()` +
  `LlmService.queryBalance()` + DeepSeek `/user/balance` 实现（10s 超时、
  失败静默 null）
- `CommandService.openContribution(name, session)`：按名打开贡献 popup
- `SettingsService`（`ctx.settings`）：设置面板程序化开关
- `connection/state` 事件：连接状态对外发布

### 深色主题兼容性

QQ2006 皮肤注册为 `colorScheme: 'light'`；ThemePresenter 按
`active.colorScheme`（而非主题 id）维护 `body[data-ds-dark-theme]`，所以
皮肤↔深色切换双向清理：切深色 → QQ 皮肤镜像移除 `data-ds-skin` 并挂上 dark
属性；切回 QQ 皮肤 → dark 属性移除（e2e D 测试 `compat.darkRemovesSkin` /
`compat.skinRemovesDark` 双向断言）。

## 视觉回归（像素级证据）

e2e 截图（`apps/web/tests/.artifacts/qq2006-skin-*.png`，1680×1000）的
平均 RGB 三态可辨：默认皮肤近白（252,253,253）→ 皮肤激活偏蓝
（221,237,250，B>G>R 珊瑚蓝）→ 粉色换肤 R 升 B 降（226,226,240）；
e2e C 测试还断言换肤后 `--qq-win-bg` 实时翻转为粉红渐变并产出
`qq2006-skin-chat-pink.png` 作为视觉证据。另有大工具栏布局断言
（12 钮单行、同 top、不溢出）。第 50 轮基线 vs 最新截图的像素回归：
5 张图最大漂移 0.3/255（<1%），视觉零漂移。e2e B 测试另含登录窗
best-effort 捕获（`boot.loginWindowVisible`，本地 boot 快于 3s 时跳过；
登录窗视觉由 app-root 单测覆盖）。

## e2e 报告状态（`qq2006-skin-report.json`，33 steps）

默认皮肤零污染（skinAttr=null、可见 QQ 图 0、DOM 隐藏图 23 为基线）、
reload 持久化 OK、皮肤激活（brandToken 珊瑚蓝）、全部按钮真实动作
（右键 2 项菜单 / 设置 / 隐藏折叠 / 关闭清会话 / 换肤粉色变量 / 模型选择 /
钱包余额链路 / 深色双向兼容）、大工具栏 12 钮单行 fits。

## 当前验证状态（第 256 轮 · 最终）

核心包单测 **1561 全绿**（8 包 102 文件）；像素回归 **0/255 零漂移**；
e2e 6/6 全绿（40+ step 报告：默认零污染/reload 持久化/头部 7 元素可见/
全部按钮真实动作/轨迹切换/深色兼容/换肤变量翻转/右键菜单复制项/详情双入口）。

# 构建与验证

```bash
# 类型检查（务必用根级或显式 tsconfig 路径，勿用目录参数——曾致 emit 污染 src）
pnpm exec tsc -b tsconfig.json
# web 构建
pnpm --filter @deepseek-ai/dsh-frontend run build
# 测试
pnpm exec vitest run packages/client/ui-conversation/tests ...
# 双皮肤 e2e（6 项：默认皮肤零污染 / reload 持久化 / 群聊标题 / 模型选择器弹层 /
# 钱包额度查询链路 / 设置项）
pnpm exec vitest run --config vitest.web.config.ts apps/web/tests/qq2006-skin-shots.e2e.ts
```

已知预先存在失败（与皮肤无关）：`ui-workflow`（用户 WIP）引起的 scrollbar 契约
测试与类型错误；`session-cluster` 类型错误；ui-primitives 3 个语法 grammar
慢测试在并行池偶发超时（单独运行通过）。

构建注意事项补充：CSS 皮肤补丁的 python 追加脚本若把原规则的闭合括号
一并写入会导致多余 `}`（AppRoot.module.css 曾因此 build 失败）——追加
补丁时 new 字符串必须精确到原规则的截断点。

构建注意事项补充：**勿用 `tsc -b packages/client/<pkg>` 目录参数**（曾致
src 树 emit 污染 294+ 文件）；发现 src 树下出现 untracked 的 `.js` /
`.d.ts` / `.map` 产物时立即删除（同目录 `.js` 会优先于 `.ts` 被解析，
可能让运行时加载旧编译产物）——2026-08 清理过 ui-command / ui-settings /
plan-mode / tool-todo 四处共 60 个文件。
