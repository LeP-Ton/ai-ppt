# AGENTS

## 项目认知记录

### 2026-03-13 13:00 初始版本认知
- 项目定位：用于 AI 主题分享的前端 PPT 模板，强调快速演示与可扩展。
- 技术选型：当前采用原生 HTML/CSS/JavaScript（零依赖），优先保证可直接运行。
- 页面结构：`index.html` 承载内容页；`src/main.js` 管理翻页与交互；`src/styles.css` 提供视觉系统。
- 现有能力：目录导航、键盘控制、自动播放、全屏、演讲备注、移动端滑动翻页。
- 扩展方向：可逐步接入 Markdown 数据源、主题系统、PDF 导出与组件化重构。

### 2026-03-13 14:30 文档治理补充认知
- 变更留痕规范：每次改动均需在 `.agentdocs/workflow` 追加独立时间戳文档，并在 `.agentdocs/index.md` 建立索引映射。
- 启动方式认知：当前项目通过静态服务器运行，推荐命令为 `python3 -m http.server 8080`。

### 2026-03-13 15:00 标题动画接入认知
- 已接入 `poem-text-animator`（来源：`/Users/didi/Documents/program/poem`）到 `src/libs/poem-text-animator`。
- 标题动画采用逐字拆分方案：在切页时重建 `.slide-title` 的字符节点并触发预设动画。
- 为避免样式污染，动画 CSS 已作用域限定为 `.slide-title`，不会覆盖全局 `body` 与通用元素样式。
