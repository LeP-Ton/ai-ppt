# Agent Docs 索引

## 当前变更文档
`workflow/20260313152742-rewrite-prompt-sharing-content.md` - 按“提示词/skills/自动化”思路重写整套 PPT 标题与内容
`workflow/20260313141906-init-ai-share-ppt.md` - 搭建 AI 分享前端 PPT 初始版本（零依赖）
`workflow/20260313143542-add-poem-title-animation.md` - 接入 poem-text-animator，为每页标题增加逐字动画

## 读取场景
- 需要快速查看“同一套布局下如何替换成个人分享叙事”的内容改写示例时。
- 需要快速了解本项目第一版的技术选型、页面结构与交互能力时。
- 需要追溯首版代码落盘明细与可验证测试步骤时。
- 需要在后续版本中回滚到初始版本基线时。
- 需要了解标题动画如何接入、如何调整节奏与预设样式时。

## 关键记忆
- 页面布局与样式保持稳定时，可通过替换 `index.html` 文案快速切换分享主题。
- 当前项目为零依赖静态前端方案，核心入口文件是 `index.html`。
- 幻灯片交互由 `src/main.js` 管理，样式系统在 `src/styles.css`。
- 已具备翻页、目录、进度、自动播放、全屏、备注、移动端手势等基础能力。
- 标题动画已引用 `poem-text-animator` 能力，资源位于 `src/libs/poem-text-animator`。
