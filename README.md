# AI 分享前端 PPT（初始版本）

一个零依赖、开箱即用的前端演示文稿项目，适合团队内部做 AI 主题分享。

## 项目特性

- 零依赖：直接通过静态服务器即可运行
- 演示体验：键盘翻页、目录跳转、进度条、全屏、自动播放
- 标题动效：每页标题接入 `poem-text-animator` 逐字动画预设
- 分享辅助：支持演讲备注（Speaker Notes，演讲者备注）
- 可扩展：每页为独立 `article.slide`，方便快速增删内容
- 移动端友好：支持触控左右滑动切页

## 快速开始

1. 在项目根目录启动静态服务：

```bash
python3 -m http.server 8080
```

2. 浏览器访问：

```text
http://localhost:8080
```

## 快捷键

- `←` / `→`：上一页 / 下一页
- `PageUp` / `PageDown`：上一页 / 下一页
- `Home` / `End`：跳转到第一页 / 最后一页
- `P`：切换自动播放
- `N`：切换演讲备注面板
- `F`：切换全屏演示

## 目录结构

```text
.
├── index.html        # PPT 主页面与内容
├── src
│   ├── main.js       # 翻页逻辑、快捷键、自动播放、备注、标题动画触发
│   ├── styles.css    # 视觉主题、布局、响应式样式
│   └── libs
│       └── poem-text-animator
│           ├── index.js        # 引入自 /Users/didi/Documents/program/poem 的核心逻辑
│           └── animations.css  # 预设动画（作用域限定为 .slide-title）
└── README.md
```

## 标题动画说明

- 当前实现优先引用你的本地库能力：`splitTextToSpans` + `ANIMATION_PRESETS`。
- 每次切页会重播当前页标题动画，并按页序循环使用 `one ~ seven` 预设。
- 调整节奏：修改 `src/main.js` 中 `TITLE_CHAR_DELAY`。
- 调整风格：编辑 `src/libs/poem-text-animator/animations.css`。
- 若后续切换到 npm 包 `poem-text-animator`，可在引入构建工具后替换本地 `libs` 目录为包依赖。

## 如何改成你的分享内容

1. 编辑 `index.html` 中每个 `article.slide` 的标题和正文。
2. 修改 `data-title` 可更新左侧目录标题。
3. 修改 `data-note` 可更新演讲备注内容。
4. 如需增加页面，复制一个 `article.slide` 并修改内容即可。

## 下一步建议

- 接入 Markdown 内容源，实现“写文档即出 PPT”。
- 增加主题切换能力（业务风、科技风、极简风）。
- 增加导出 PDF 的打印样式。
