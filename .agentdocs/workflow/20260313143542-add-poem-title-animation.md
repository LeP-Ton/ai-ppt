# 接入 poem-text-animator 标题动画

## 背景与目标
- 用户希望复用本地 `/Users/didi/Documents/program/poem` 文字动画库能力。
- 将每页标题改造为逐字动画，提升演示视觉表现与页面切换节奏。

## 约束与原则
- 保持当前项目“静态可直接运行”的特性，不引入打包依赖。
- 以最小侵入方式接入库能力，避免样式污染现有页面。
- 所有新增注释与文档继续保持中文可读性。

## 阶段与 TODO
- [x] 读取并确认 poem-text-animator API 与预设动画类。
- [x] 将库核心 JS vendor 到项目内，避免外部路径引用问题。
- [x] 为每页 `h2` 标题接入切页重播动画。
- [x] 更新 README 使用说明与 AGENTS 项目认知。
- [x] 更新 `.agentdocs/index.md` 与本次变更留痕文档。

## 关键风险
- 标题动画依赖字符拆分，过长标题在低性能设备上可能产生轻微卡顿。
- 后续若改为 npm 依赖，需要引入构建工具以支持包路径解析。

## 当前进展
- 已完成每页标题逐字动画接入，按页序循环 `one ~ seven` 预设。
- 标题已与原 `reveal` 动画解耦，避免动画叠加造成视觉冲突。

## 代码变更
- index.html
```diff
diff --git a/index.html b/index.html
new file mode 100644
index 0000000..c353256
--- /dev/null
+++ b/index.html
@@ -0,0 +1,216 @@
+<!doctype html>
+<html lang="zh-CN">
+  <head>
+    <meta charset="UTF-8" />
+    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
+    <title>AI 分享前端 PPT 初版</title>
+    <link rel="preconnect" href="https://fonts.googleapis.com" />
+    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
+    <link
+      href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Space+Grotesk:wght@500;700&display=swap"
+      rel="stylesheet"
+    />
+    <link rel="stylesheet" href="./src/styles.css" />
+    <link rel="stylesheet" href="./src/libs/poem-text-animator/animations.css" />
+  </head>
+  <body>
+    <div class="bg-shapes" aria-hidden="true">
+      <span class="shape shape-a"></span>
+      <span class="shape shape-b"></span>
+      <span class="shape shape-c"></span>
+    </div>
+
+    <header class="topbar">
+      <div class="deck-meta">
+        <p class="deck-kicker">AI Sharing Deck v0.1</p>
+        <h1>让团队 30 分钟理解 AI 分享怎么做</h1>
+      </div>
+      <div class="control-group">
+        <button id="prevBtn" class="btn">上一页</button>
+        <button id="nextBtn" class="btn btn-primary">下一页</button>
+        <button id="autoplayBtn" class="btn">自动播放：关</button>
+      </div>
+    </header>
+
+    <main class="deck-layout">
+      <aside class="outline-panel" aria-label="PPT 目录">
+        <h2>目录导航</h2>
+        <ol id="outlineList"></ol>
+        <div class="tips">
+          <p>快捷键</p>
+          <p>←/→ 翻页 · Home/End 跳转 · P 自动播放 · N 演讲备注</p>
+        </div>
+      </aside>
+
+      <section class="slides-stage" id="slidesStage" aria-live="polite">
+        <article class="slide is-active" data-title="开场：为什么是现在" data-note="建议先讲业务压力，再讲机会窗口。">
+          <p class="slide-tag reveal">01 开场</p>
+          <h2 class="slide-title">为什么今天必须把 AI 分享做成团队共识</h2>
+          <p class="lead reveal">
+            分享目标不是“讲技术热词”，而是帮助产品、研发、运营在同一套价值语言里协作。
+          </p>
+          <div class="metric-grid reveal">
+            <div>
+              <p class="metric-value">30 分钟</p>
+              <p class="metric-label">完成一次高质量分享</p>
+            </div>
+            <div>
+              <p class="metric-value">8 页</p>
+              <p class="metric-label">覆盖共识所需核心信息</p>
+            </div>
+            <div>
+              <p class="metric-value">3 层</p>
+              <p class="metric-label">战略、场景、执行</p>
+            </div>
+          </div>
+        </article>
+
+        <article class="slide" data-title="趋势：AI 价值窗口" data-note="用公司内部数据替换示例数字会更有说服力。">
+          <p class="slide-tag reveal">02 趋势</p>
+          <h2 class="slide-title">AI 价值窗口：降本、提效、增收同时发生</h2>
+          <div class="dual-column reveal">
+            <div class="card">
+              <h3>外部环境变化</h3>
+              <ul>
+                <li>多模态模型推理成本持续下降</li>
+                <li>通用 Agent 工具链快速成熟</li>
+                <li>用户对智能体验的预期显著提高</li>
+              </ul>
+            </div>
+            <div class="card">
+              <h3>内部行动理由</h3>
+              <ul>
+                <li>流程中重复劳动占比高，自动化收益明确</li>
+                <li>已有数据资产，但复用效率偏低</li>
+                <li>需要统一方法，避免零散试错</li>
+              </ul>
+            </div>
+          </div>
+        </article>
+
+        <article class="slide" data-title="能力：AI 分享内容地图" data-note="这里可以结合团队角色做内容取舍。">
+          <p class="slide-tag reveal">03 能力</p>
+          <h2 class="slide-title">一场 AI 分享，建议覆盖这 4 个能力象限</h2>
+          <div class="quad-grid reveal">
+            <div class="quad-item">
+              <h3>模型认知</h3>
+              <p>模型能做什么、不能做什么，边界要先讲清。</p>
+            </div>
+            <div class="quad-item">
+              <h3>Prompt 设计</h3>
+              <p>输入结构化，输出才能稳定可复用。</p>
+            </div>
+            <div class="quad-item">
+              <h3>业务落地</h3>
+              <p>把“酷炫演示”转换为“可衡量结果”。</p>
+            </div>
+            <div class="quad-item">
+              <h3>风险治理</h3>
+              <p>质量、合规、数据安全必须同步设计。</p>
+            </div>
+          </div>
+        </article>
+
+        <article class="slide" data-title="框架：一页讲清选题" data-note="优先展示 1 个高频场景的切入方式。">
+          <p class="slide-tag reveal">04 选题</p>
+          <h2 class="slide-title">用“问题-方案-收益”结构快速定义一个分享主题</h2>
+          <div class="timeline reveal">
+            <div class="timeline-item">
+              <p class="timeline-title">问题定义</p>
+              <p>目标用户是谁？当前损失在哪里？</p>
+            </div>
+            <div class="timeline-item">
+              <p class="timeline-title">方案设计</p>
+              <p>模型、工具、流程如何组合？</p>
+            </div>
+            <div class="timeline-item">
+              <p class="timeline-title">收益验证</p>
+              <p>上线前后用哪些指标对比？</p>
+            </div>
+            <div class="timeline-item">
+              <p class="timeline-title">推广路径</p>
+              <p>如何复制到第二个、第三个场景？</p>
+            </div>
+          </div>
+        </article>
+
+        <article class="slide" data-title="Demo：现场演示结构" data-note="演示环节建议控制在 8 分钟内。">
+          <p class="slide-tag reveal">05 Demo</p>
+          <h2 class="slide-title">一次高可用 Demo，建议包含 3 段式叙事</h2>
+          <div class="dual-column reveal">
+            <div class="card card-strong">
+              <h3>Before</h3>
+              <p>展示旧流程：手工、重复、延迟高。</p>
+            </div>
+            <div class="card card-strong">
+              <h3>After</h3>
+              <p>展示新流程：AI 辅助 + 人工复核。</p>
+            </div>
+          </div>
+          <div class="callout reveal">
+            <p>关键不是“模型有多强”，而是“团队今天就能用起来”。</p>
+          </div>
+        </article>
+
+        <article class="slide" data-title="执行：90 天落地节奏" data-note="可以把甘特图替换成你们真实排期。">
+          <p class="slide-tag reveal">06 执行</p>
+          <h2 class="slide-title">建议执行节奏：先试点，再标准化，再规模化</h2>
+          <div class="phase-grid reveal">
+            <div class="phase-card">
+              <p class="phase-name">第 1-3 周</p>
+              <p class="phase-title">场景试点</p>
+              <p>确定单一高价值场景，完成闭环验证。</p>
+            </div>
+            <div class="phase-card">
+              <p class="phase-name">第 4-8 周</p>
+              <p class="phase-title">流程标准化</p>
+              <p>固化提示词模板与评估清单。</p>
+            </div>
+            <div class="phase-card">
+              <p class="phase-name">第 9-12 周</p>
+              <p class="phase-title">规模复制</p>
+              <p>跨团队复制并建立运营指标看板。</p>
+            </div>
+          </div>
+        </article>
+
+        <article class="slide" data-title="风险：上线前检查" data-note="建议把合规同学加入评审流程。">
+          <p class="slide-tag reveal">07 风险</p>
+          <h2 class="slide-title">上线前至少完成这 4 类检查</h2>
+          <div class="checklist reveal">
+            <p><span>质量稳定性</span> 输出一致性、幻觉率、失败回退。</p>
+            <p><span>数据安全</span> 脱敏策略、权限边界、日志审计。</p>
+            <p><span>合规要求</span> 版权、隐私、行业监管要求。</p>
+            <p><span>组织协同</span> 责任分工、人工兜底、反馈机制。</p>
+          </div>
+        </article>
+
+        <article class="slide" data-title="收尾：行动清单" data-note="结尾需要明确 owner 和截止时间。">
+          <p class="slide-tag reveal">08 行动</p>
+          <h2 class="slide-title">分享结束后，立刻推进的 3 个动作</h2>
+          <ol class="action-list reveal">
+            <li>本周内确定第一个试点场景与负责人。</li>
+            <li>两周内完成 Demo 版流程并收集反馈。</li>
+            <li>一个月内沉淀可复用模板与评估指标。</li>
+          </ol>
+          <p class="closing reveal">谢谢，下一页可直接进入自由问答。</p>
+        </article>
+      </section>
+    </main>
+
+    <footer class="statusbar">
+      <p id="statusText">1 / 8</p>
+      <div class="progress-track" aria-hidden="true">
+        <span id="progressBar" class="progress-bar"></span>
+      </div>
+      <button id="fullscreenBtn" class="btn btn-ghost">全屏演示</button>
+    </footer>
+
+    <section id="notePanel" class="note-panel" aria-live="polite" aria-label="演讲备注">
+      <h3>演讲备注</h3>
+      <p id="noteContent">按 N 键可切换显示。</p>
+    </section>
+
+    <script type="module" src="./src/main.js"></script>
+  </body>
+</html>
```
- src/main.js
```diff
diff --git a/src/main.js b/src/main.js
new file mode 100644
index 0000000..da84937
--- /dev/null
+++ b/src/main.js
@@ -0,0 +1,295 @@
+import { ANIMATION_PRESETS, splitTextToSpans } from "./libs/poem-text-animator/index.js";
+
+const slideNodes = Array.from(document.querySelectorAll(".slide"));
+const outlineList = document.querySelector("#outlineList");
+const statusText = document.querySelector("#statusText");
+const progressBar = document.querySelector("#progressBar");
+const notePanel = document.querySelector("#notePanel");
+const noteContent = document.querySelector("#noteContent");
+const autoplayBtn = document.querySelector("#autoplayBtn");
+const prevBtn = document.querySelector("#prevBtn");
+const nextBtn = document.querySelector("#nextBtn");
+const fullscreenBtn = document.querySelector("#fullscreenBtn");
+
+const state = {
+  currentIndex: 0,
+  autoplay: false,
+  autoplayMs: 8000,
+  autoplayTimer: null,
+  noteVisible: false,
+  touchStartX: 0,
+};
+
+const TITLE_CHAR_DELAY = 0.03;
+
+if (!slideNodes.length) {
+  throw new Error("未找到任何幻灯片节点，请检查 .slide 元素是否存在。");
+}
+
+/**
+ * 根据 slide 元数据生成目录按钮，便于演讲时快速跳转。
+ */
+function buildOutline() {
+  const fragment = document.createDocumentFragment();
+
+  slideNodes.forEach((slide, index) => {
+    const item = document.createElement("li");
+    const button = document.createElement("button");
+
+    button.type = "button";
+    button.textContent = slide.dataset.title || `第 ${index + 1} 页`;
+    button.addEventListener("click", () => goTo(index));
+
+    item.append(button);
+    fragment.append(item);
+  });
+
+  outlineList.append(fragment);
+}
+
+/**
+ * 给当前页的关键内容添加分段浮现动画，让节奏更清晰。
+ */
+function runRevealAnimation(slide) {
+  const revealNodes = Array.from(slide.querySelectorAll(".reveal"));
+
+  revealNodes.forEach((node) => {
+    node.classList.remove("is-visible");
+  });
+
+  revealNodes.forEach((node, idx) => {
+    window.setTimeout(() => {
+      node.classList.add("is-visible");
+    }, 70 * idx);
+  });
+}
+
+/**
+ * 初始化标题动画所需的原始文本，避免重复拆字后文本丢失。
+ */
+function prepareSlideTitles() {
+  slideNodes.forEach((slide) => {
+    const titleNode = slide.querySelector(".slide-title");
+    if (!titleNode) {
+      return;
+    }
+
+    titleNode.dataset.rawText = titleNode.textContent?.trim() || "";
+  });
+}
+
+function resolveTitlePreset(slideIndex) {
+  return ANIMATION_PRESETS[slideIndex % ANIMATION_PRESETS.length] || "one";
+}
+
+/**
+ * 每次切页时，重建当前页标题字符节点并重新触发动画。
+ */
+function runTitleAnimation(slide, slideIndex) {
+  const titleNode = slide.querySelector(".slide-title");
+  if (!titleNode) {
+    return;
+  }
+
+  const rawText = titleNode.dataset.rawText || titleNode.textContent?.trim() || "";
+  const preset = resolveTitlePreset(slideIndex);
+
+  ANIMATION_PRESETS.forEach((presetClass) => {
+    titleNode.classList.remove(presetClass);
+  });
+
+  titleNode.classList.add("animate", preset);
+  splitTextToSpans(titleNode, rawText, TITLE_CHAR_DELAY);
+}
+
+function updateOutlineCurrent() {
+  const buttons = Array.from(outlineList.querySelectorAll("button"));
+
+  buttons.forEach((button, index) => {
+    button.classList.toggle("is-current", index === state.currentIndex);
+  });
+}
+
+function updateStatus() {
+  statusText.textContent = `${state.currentIndex + 1} / ${slideNodes.length}`;
+  progressBar.style.width = `${((state.currentIndex + 1) / slideNodes.length) * 100}%`;
+}
+
+function updateNote() {
+  const currentSlide = slideNodes[state.currentIndex];
+  noteContent.textContent = currentSlide.dataset.note || "当前页面没有备注。";
+}
+
+function renderSlides() {
+  slideNodes.forEach((slide, index) => {
+    const isCurrent = index === state.currentIndex;
+
+    slide.classList.toggle("is-active", isCurrent);
+    slide.setAttribute("aria-hidden", isCurrent ? "false" : "true");
+  });
+
+  runTitleAnimation(slideNodes[state.currentIndex], state.currentIndex);
+  runRevealAnimation(slideNodes[state.currentIndex]);
+  updateOutlineCurrent();
+  updateStatus();
+  updateNote();
+}
+
+function goTo(nextIndex) {
+  const clampedIndex = Math.max(0, Math.min(nextIndex, slideNodes.length - 1));
+
+  if (clampedIndex === state.currentIndex) {
+    return;
+  }
+
+  state.currentIndex = clampedIndex;
+  renderSlides();
+}
+
+function next() {
+  if (state.currentIndex >= slideNodes.length - 1) {
+    goTo(0);
+    return;
+  }
+
+  goTo(state.currentIndex + 1);
+}
+
+function prev() {
+  if (state.currentIndex <= 0) {
+    goTo(slideNodes.length - 1);
+    return;
+  }
+
+  goTo(state.currentIndex - 1);
+}
+
+function stopAutoplay() {
+  if (state.autoplayTimer) {
+    window.clearInterval(state.autoplayTimer);
+    state.autoplayTimer = null;
+  }
+
+  state.autoplay = false;
+  autoplayBtn.textContent = "自动播放：关";
+}
+
+function startAutoplay() {
+  state.autoplay = true;
+  autoplayBtn.textContent = "自动播放：开";
+
+  state.autoplayTimer = window.setInterval(() => {
+    next();
+  }, state.autoplayMs);
+}
+
+function toggleAutoplay() {
+  if (state.autoplay) {
+    stopAutoplay();
+    return;
+  }
+
+  startAutoplay();
+}
+
+function toggleNotePanel() {
+  state.noteVisible = !state.noteVisible;
+  notePanel.classList.toggle("is-visible", state.noteVisible);
+}
+
+function toggleFullscreen() {
+  if (!document.fullscreenElement) {
+    document.documentElement.requestFullscreen?.();
+    return;
+  }
+
+  document.exitFullscreen?.();
+}
+
+function bindEvents() {
+  prevBtn.addEventListener("click", prev);
+  nextBtn.addEventListener("click", next);
+  autoplayBtn.addEventListener("click", toggleAutoplay);
+  fullscreenBtn.addEventListener("click", toggleFullscreen);
+
+  document.addEventListener("keydown", (event) => {
+    if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
+      event.preventDefault();
+      next();
+      return;
+    }
+
+    if (event.key === "ArrowLeft" || event.key === "PageUp") {
+      event.preventDefault();
+      prev();
+      return;
+    }
+
+    if (event.key === "Home") {
+      event.preventDefault();
+      goTo(0);
+      return;
+    }
+
+    if (event.key === "End") {
+      event.preventDefault();
+      goTo(slideNodes.length - 1);
+      return;
+    }
+
+    if (event.key.toLowerCase() === "p") {
+      event.preventDefault();
+      toggleAutoplay();
+      return;
+    }
+
+    if (event.key.toLowerCase() === "n") {
+      event.preventDefault();
+      toggleNotePanel();
+      return;
+    }
+
+    if (event.key.toLowerCase() === "f") {
+      event.preventDefault();
+      toggleFullscreen();
+    }
+  });
+
+  const stage = document.querySelector("#slidesStage");
+
+  stage.addEventListener("touchstart", (event) => {
+    state.touchStartX = event.changedTouches[0]?.clientX ?? 0;
+  });
+
+  stage.addEventListener("touchend", (event) => {
+    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
+    const diff = touchEndX - state.touchStartX;
+
+    if (Math.abs(diff) < 45) {
+      return;
+    }
+
+    if (diff < 0) {
+      next();
+      return;
+    }
+
+    prev();
+  });
+
+  // 页面失焦后暂停自动播放，避免后台长时间空转。
+  document.addEventListener("visibilitychange", () => {
+    if (document.hidden && state.autoplay) {
+      stopAutoplay();
+    }
+  });
+}
+
+function init() {
+  prepareSlideTitles();
+  buildOutline();
+  bindEvents();
+  renderSlides();
+}
+
+init();
```
- src/styles.css
```diff
diff --git a/src/styles.css b/src/styles.css
new file mode 100644
index 0000000..4acaba4
--- /dev/null
+++ b/src/styles.css
@@ -0,0 +1,557 @@
+:root {
+  --bg-base: #f4f8ff;
+  --bg-soft: #fff5ea;
+  --panel-bg: rgba(255, 255, 255, 0.8);
+  --panel-border: rgba(12, 35, 64, 0.14);
+  --text-main: #0f2238;
+  --text-sub: #35506d;
+  --accent: #ff6a3d;
+  --accent-alt: #0076ff;
+  --shadow-soft: 0 12px 32px rgba(15, 34, 56, 0.12);
+  --radius-lg: 22px;
+  --radius-md: 14px;
+  --transition-fast: 220ms ease;
+}
+
+* {
+  box-sizing: border-box;
+}
+
+html,
+body {
+  margin: 0;
+  min-height: 100%;
+}
+
+body {
+  position: relative;
+  overflow: hidden;
+  font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
+  color: var(--text-main);
+  background: linear-gradient(130deg, var(--bg-base), var(--bg-soft));
+}
+
+h1,
+h2,
+h3,
+.deck-kicker,
+.metric-value,
+.slide-tag {
+  font-family: "Space Grotesk", "Noto Sans SC", sans-serif;
+  letter-spacing: 0.02em;
+}
+
+.bg-shapes {
+  position: fixed;
+  inset: 0;
+  z-index: 0;
+  pointer-events: none;
+}
+
+.shape {
+  position: absolute;
+  border-radius: 999px;
+  filter: blur(2px);
+  opacity: 0.58;
+}
+
+.shape-a {
+  width: 420px;
+  height: 420px;
+  top: -120px;
+  left: -60px;
+  background: radial-gradient(circle at 30% 30%, #ffd097, #ff7d45);
+  animation: floatA 14s infinite ease-in-out;
+}
+
+.shape-b {
+  width: 360px;
+  height: 360px;
+  right: 12%;
+  top: 8%;
+  background: radial-gradient(circle at 40% 40%, #8ce7ff, #0076ff);
+  animation: floatB 18s infinite ease-in-out;
+}
+
+.shape-c {
+  width: 280px;
+  height: 280px;
+  right: 10%;
+  bottom: -80px;
+  background: radial-gradient(circle at 30% 30%, #ffe8c2, #ffbe7d);
+  animation: floatC 16s infinite ease-in-out;
+}
+
+.topbar,
+.statusbar,
+.deck-layout,
+.note-panel {
+  position: relative;
+  z-index: 2;
+}
+
+.topbar {
+  display: flex;
+  justify-content: space-between;
+  align-items: flex-start;
+  gap: 16px;
+  padding: 20px 24px 10px;
+}
+
+.deck-meta {
+  max-width: min(720px, 72vw);
+}
+
+.deck-kicker {
+  margin: 0;
+  font-size: 0.88rem;
+  color: var(--accent-alt);
+  text-transform: uppercase;
+}
+
+.deck-meta h1 {
+  margin: 8px 0 0;
+  font-size: clamp(1.4rem, 1.8vw, 2.1rem);
+  line-height: 1.2;
+}
+
+.control-group {
+  display: flex;
+  flex-wrap: wrap;
+  gap: 10px;
+  justify-content: flex-end;
+}
+
+.btn {
+  border: 1px solid var(--panel-border);
+  background: rgba(255, 255, 255, 0.82);
+  color: var(--text-main);
+  border-radius: 999px;
+  padding: 8px 14px;
+  font-size: 0.88rem;
+  cursor: pointer;
+  transition: transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
+}
+
+.btn:hover {
+  transform: translateY(-1px);
+  box-shadow: var(--shadow-soft);
+}
+
+.btn-primary {
+  background: linear-gradient(120deg, var(--accent), #ff946e);
+  color: #fff;
+  border-color: transparent;
+}
+
+.btn-ghost {
+  background: rgba(255, 255, 255, 0.55);
+}
+
+.deck-layout {
+  display: grid;
+  grid-template-columns: 260px 1fr;
+  gap: 16px;
+  padding: 4px 24px 18px;
+  height: calc(100vh - 164px);
+}
+
+.outline-panel {
+  border: 1px solid var(--panel-border);
+  background: var(--panel-bg);
+  backdrop-filter: blur(8px);
+  border-radius: var(--radius-lg);
+  padding: 18px 16px;
+  box-shadow: var(--shadow-soft);
+  display: flex;
+  flex-direction: column;
+}
+
+.outline-panel h2 {
+  margin: 0 0 12px;
+  font-size: 1rem;
+}
+
+#outlineList {
+  margin: 0;
+  padding-left: 20px;
+  display: flex;
+  flex-direction: column;
+  gap: 9px;
+  overflow: auto;
+}
+
+#outlineList button {
+  border: none;
+  background: transparent;
+  color: var(--text-sub);
+  text-align: left;
+  cursor: pointer;
+  font-size: 0.9rem;
+  padding: 2px 4px;
+  border-radius: 8px;
+  transition: background var(--transition-fast), color var(--transition-fast);
+}
+
+#outlineList button:hover,
+#outlineList button.is-current {
+  background: rgba(0, 118, 255, 0.12);
+  color: var(--accent-alt);
+}
+
+.tips {
+  margin-top: auto;
+  border-top: 1px dashed var(--panel-border);
+  padding-top: 12px;
+  font-size: 0.78rem;
+  color: var(--text-sub);
+  line-height: 1.5;
+}
+
+.tips p {
+  margin: 4px 0;
+}
+
+.slides-stage {
+  position: relative;
+  border-radius: var(--radius-lg);
+  border: 1px solid var(--panel-border);
+  background: var(--panel-bg);
+  backdrop-filter: blur(8px);
+  box-shadow: var(--shadow-soft);
+  overflow: hidden;
+}
+
+.slide {
+  position: absolute;
+  inset: 0;
+  padding: clamp(20px, 3vw, 38px);
+  opacity: 0;
+  transform: translateX(48px) scale(0.97);
+  transition: opacity 340ms ease, transform 340ms ease;
+  pointer-events: none;
+  display: flex;
+  flex-direction: column;
+  gap: 16px;
+}
+
+.slide.is-active {
+  opacity: 1;
+  transform: translateX(0) scale(1);
+  pointer-events: auto;
+}
+
+.slide-tag {
+  margin: 0;
+  font-size: 0.82rem;
+  color: var(--accent-alt);
+  text-transform: uppercase;
+}
+
+.slide .slide-title {
+  margin: 0;
+  font-size: clamp(1.4rem, 2.5vw, 2.5rem);
+  line-height: 1.2;
+  word-break: break-word;
+}
+
+.lead {
+  margin: 0;
+  font-size: clamp(1rem, 1.4vw, 1.3rem);
+  color: var(--text-sub);
+  max-width: 70ch;
+}
+
+.metric-grid {
+  display: grid;
+  grid-template-columns: repeat(3, minmax(0, 1fr));
+  gap: 16px;
+}
+
+.metric-grid > div {
+  border: 1px solid var(--panel-border);
+  border-radius: var(--radius-md);
+  background: rgba(255, 255, 255, 0.7);
+  padding: 18px;
+}
+
+.metric-value {
+  margin: 0;
+  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
+  color: var(--accent);
+}
+
+.metric-label {
+  margin: 6px 0 0;
+  color: var(--text-sub);
+}
+
+.dual-column,
+.quad-grid,
+.phase-grid {
+  display: grid;
+  gap: 14px;
+}
+
+.dual-column {
+  grid-template-columns: repeat(2, minmax(0, 1fr));
+}
+
+.quad-grid {
+  grid-template-columns: repeat(2, minmax(0, 1fr));
+}
+
+.phase-grid {
+  grid-template-columns: repeat(3, minmax(0, 1fr));
+}
+
+.card,
+.quad-item,
+.phase-card,
+.timeline-item {
+  border: 1px solid var(--panel-border);
+  border-radius: var(--radius-md);
+  background: rgba(255, 255, 255, 0.73);
+  padding: 16px;
+}
+
+.card h3,
+.quad-item h3 {
+  margin: 0 0 8px;
+  font-size: 1.1rem;
+}
+
+.card ul {
+  margin: 0;
+  padding-left: 20px;
+  line-height: 1.8;
+}
+
+.card-strong {
+  background: linear-gradient(140deg, rgba(255, 255, 255, 0.93), rgba(231, 243, 255, 0.9));
+}
+
+.quad-item p,
+.phase-card p,
+.timeline-item p,
+.callout p,
+.checklist p,
+.action-list,
+.closing {
+  margin: 0;
+  color: var(--text-sub);
+  line-height: 1.7;
+}
+
+.timeline {
+  display: grid;
+  gap: 12px;
+}
+
+.timeline-title,
+.phase-title,
+.phase-name {
+  font-family: "Space Grotesk", "Noto Sans SC", sans-serif;
+  color: var(--text-main);
+}
+
+.timeline-title {
+  margin-bottom: 6px;
+  font-weight: 700;
+}
+
+.callout {
+  border-left: 5px solid var(--accent);
+  border-radius: 12px;
+  background: rgba(255, 106, 61, 0.11);
+  padding: 12px 14px;
+}
+
+.phase-name {
+  font-size: 0.82rem;
+  color: var(--accent-alt);
+}
+
+.phase-title {
+  font-size: 1rem;
+  margin: 5px 0;
+}
+
+.checklist {
+  display: grid;
+  gap: 10px;
+}
+
+.checklist span {
+  color: var(--text-main);
+  font-weight: 700;
+  margin-right: 8px;
+}
+
+.action-list {
+  margin: 0;
+  padding-left: 24px;
+  display: grid;
+  gap: 10px;
+}
+
+.closing {
+  margin-top: auto;
+  font-size: 1.1rem;
+  color: var(--accent-alt);
+}
+
+.statusbar {
+  display: grid;
+  grid-template-columns: auto 1fr auto;
+  align-items: center;
+  gap: 14px;
+  padding: 0 24px 16px;
+}
+
+#statusText {
+  margin: 0;
+  font-family: "Space Grotesk", "Noto Sans SC", sans-serif;
+  font-weight: 700;
+}
+
+.progress-track {
+  height: 8px;
+  background: rgba(255, 255, 255, 0.74);
+  border: 1px solid var(--panel-border);
+  border-radius: 999px;
+  overflow: hidden;
+}
+
+.progress-bar {
+  display: block;
+  width: 12.5%;
+  height: 100%;
+  background: linear-gradient(120deg, var(--accent-alt), #58b3ff);
+  transition: width 300ms ease;
+}
+
+.note-panel {
+  position: fixed;
+  right: 24px;
+  bottom: 84px;
+  width: min(340px, calc(100vw - 32px));
+  border: 1px solid var(--panel-border);
+  border-radius: var(--radius-md);
+  background: rgba(255, 255, 255, 0.92);
+  box-shadow: var(--shadow-soft);
+  padding: 14px 16px;
+  transform: translateY(10px);
+  opacity: 0;
+  pointer-events: none;
+  transition: transform var(--transition-fast), opacity var(--transition-fast);
+}
+
+.note-panel.is-visible {
+  transform: translateY(0);
+  opacity: 1;
+  pointer-events: auto;
+}
+
+.note-panel h3 {
+  margin: 0 0 8px;
+  font-size: 0.95rem;
+}
+
+.note-panel p {
+  margin: 0;
+  font-size: 0.86rem;
+  color: var(--text-sub);
+  line-height: 1.6;
+}
+
+.reveal {
+  opacity: 0;
+  transform: translateY(12px);
+}
+
+.reveal.is-visible {
+  opacity: 1;
+  transform: translateY(0);
+  transition: opacity 380ms ease, transform 380ms ease;
+}
+
+@keyframes floatA {
+  0%,
+  100% {
+    transform: translate(0, 0);
+  }
+  50% {
+    transform: translate(22px, 14px);
+  }
+}
+
+@keyframes floatB {
+  0%,
+  100% {
+    transform: translate(0, 0);
+  }
+  50% {
+    transform: translate(-18px, 20px);
+  }
+}
+
+@keyframes floatC {
+  0%,
+  100% {
+    transform: translate(0, 0);
+  }
+  50% {
+    transform: translate(-12px, -24px);
+  }
+}
+
+@media (max-width: 1040px) {
+  body {
+    overflow: auto;
+  }
+
+  .topbar {
+    flex-direction: column;
+    align-items: stretch;
+  }
+
+  .deck-layout {
+    grid-template-columns: 1fr;
+    height: auto;
+    min-height: 640px;
+  }
+
+  .outline-panel {
+    max-height: 180px;
+  }
+
+  .slides-stage {
+    min-height: 520px;
+  }
+
+  .slide {
+    overflow: auto;
+  }
+
+  .dual-column,
+  .quad-grid,
+  .phase-grid,
+  .metric-grid {
+    grid-template-columns: 1fr;
+  }
+
+  .statusbar {
+    grid-template-columns: 1fr;
+    gap: 10px;
+  }
+}
+
+@media (prefers-reduced-motion: reduce) {
+  *,
+  *::before,
+  *::after {
+    animation: none !important;
+    transition: none !important;
+  }
+}
```
- README.md
```diff
diff --git a/README.md b/README.md
index cdb8d0e..ab60694 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,71 @@
-init
\ No newline at end of file
+# AI 分享前端 PPT（初始版本）
+
+一个零依赖、开箱即用的前端演示文稿项目，适合团队内部做 AI 主题分享。
+
+## 项目特性
+
+- 零依赖：直接通过静态服务器即可运行
+- 演示体验：键盘翻页、目录跳转、进度条、全屏、自动播放
+- 标题动效：每页标题接入 `poem-text-animator` 逐字动画预设
+- 分享辅助：支持演讲备注（Speaker Notes，演讲者备注）
+- 可扩展：每页为独立 `article.slide`，方便快速增删内容
+- 移动端友好：支持触控左右滑动切页
+
+## 快速开始
+
+1. 在项目根目录启动静态服务：
+
+```bash
+python3 -m http.server 8080
+```
+
+2. 浏览器访问：
+
+```text
+http://localhost:8080
+```
+
+## 快捷键
+
+- `←` / `→`：上一页 / 下一页
+- `PageUp` / `PageDown`：上一页 / 下一页
+- `Home` / `End`：跳转到第一页 / 最后一页
+- `P`：切换自动播放
+- `N`：切换演讲备注面板
+- `F`：切换全屏演示
+
+## 目录结构
+
+```text
+.
+├── index.html        # PPT 主页面与内容
+├── src
+│   ├── main.js       # 翻页逻辑、快捷键、自动播放、备注、标题动画触发
+│   ├── styles.css    # 视觉主题、布局、响应式样式
+│   └── libs
+│       └── poem-text-animator
+│           ├── index.js        # 引入自 /Users/didi/Documents/program/poem 的核心逻辑
+│           └── animations.css  # 预设动画（作用域限定为 .slide-title）
+└── README.md
+```
+
+## 标题动画说明
+
+- 当前实现优先引用你的本地库能力：`splitTextToSpans` + `ANIMATION_PRESETS`。
+- 每次切页会重播当前页标题动画，并按页序循环使用 `one ~ seven` 预设。
+- 调整节奏：修改 `src/main.js` 中 `TITLE_CHAR_DELAY`。
+- 调整风格：编辑 `src/libs/poem-text-animator/animations.css`。
+- 若后续切换到 npm 包 `poem-text-animator`，可在引入构建工具后替换本地 `libs` 目录为包依赖。
+
+## 如何改成你的分享内容
+
+1. 编辑 `index.html` 中每个 `article.slide` 的标题和正文。
+2. 修改 `data-title` 可更新左侧目录标题。
+3. 修改 `data-note` 可更新演讲备注内容。
+4. 如需增加页面，复制一个 `article.slide` 并修改内容即可。
+
+## 下一步建议
+
+- 接入 Markdown 内容源，实现“写文档即出 PPT”。
+- 增加主题切换能力（业务风、科技风、极简风）。
+- 增加导出 PDF 的打印样式。
```
- AGENTS.md
```diff
diff --git a/AGENTS.md b/AGENTS.md
new file mode 100644
index 0000000..1741159
--- /dev/null
+++ b/AGENTS.md
@@ -0,0 +1,19 @@
+# AGENTS
+
+## 项目认知记录
+
+### 2026-03-13 13:00 初始版本认知
+- 项目定位：用于 AI 主题分享的前端 PPT 模板，强调快速演示与可扩展。
+- 技术选型：当前采用原生 HTML/CSS/JavaScript（零依赖），优先保证可直接运行。
+- 页面结构：`index.html` 承载内容页；`src/main.js` 管理翻页与交互；`src/styles.css` 提供视觉系统。
+- 现有能力：目录导航、键盘控制、自动播放、全屏、演讲备注、移动端滑动翻页。
+- 扩展方向：可逐步接入 Markdown 数据源、主题系统、PDF 导出与组件化重构。
+
+### 2026-03-13 14:30 文档治理补充认知
+- 变更留痕规范：每次改动均需在 `.agentdocs/workflow` 追加独立时间戳文档，并在 `.agentdocs/index.md` 建立索引映射。
+- 启动方式认知：当前项目通过静态服务器运行，推荐命令为 `python3 -m http.server 8080`。
+
+### 2026-03-13 15:00 标题动画接入认知
+- 已接入 `poem-text-animator`（来源：`/Users/didi/Documents/program/poem`）到 `src/libs/poem-text-animator`。
+- 标题动画采用逐字拆分方案：在切页时重建 `.slide-title` 的字符节点并触发预设动画。
+- 为避免样式污染，动画 CSS 已作用域限定为 `.slide-title`，不会覆盖全局 `body` 与通用元素样式。
```
- .agentdocs/index.md
```diff
diff --git a/.agentdocs/index.md b/.agentdocs/index.md
new file mode 100644
index 0000000..dfa1028
--- /dev/null
+++ b/.agentdocs/index.md
@@ -0,0 +1,17 @@
+# Agent Docs 索引
+
+## 当前变更文档
+`workflow/20260313141906-init-ai-share-ppt.md` - 搭建 AI 分享前端 PPT 初始版本（零依赖）
+`workflow/20260313143542-add-poem-title-animation.md` - 接入 poem-text-animator，为每页标题增加逐字动画
+
+## 读取场景
+- 需要快速了解本项目第一版的技术选型、页面结构与交互能力时。
+- 需要追溯首版代码落盘明细与可验证测试步骤时。
+- 需要在后续版本中回滚到初始版本基线时。
+- 需要了解标题动画如何接入、如何调整节奏与预设样式时。
+
+## 关键记忆
+- 当前项目为零依赖静态前端方案，核心入口文件是 `index.html`。
+- 幻灯片交互由 `src/main.js` 管理，样式系统在 `src/styles.css`。
+- 已具备翻页、目录、进度、自动播放、全屏、备注、移动端手势等基础能力。
+- 标题动画已引用 `poem-text-animator` 能力，资源位于 `src/libs/poem-text-animator`。
```
- src/libs/poem-text-animator/index.js
```diff
diff --git a/src/libs/poem-text-animator/index.js b/src/libs/poem-text-animator/index.js
new file mode 100644
index 0000000..7b2f6d6
--- /dev/null
+++ b/src/libs/poem-text-animator/index.js
@@ -0,0 +1,237 @@
+export const VERSION = "1.1.0";
+export const ANIMATION_PRESETS = ["one", "two", "three", "four", "five", "six", "seven"];
+
+export const DEFAULT_OPTIONS = Object.freeze({
+  baseClass: "animate",
+  animationClass: "one",
+  lineTag: "p",
+  charDelay: 0.05,
+  lineInterval: 1000,
+  clearBeforeRender: false,
+});
+
+function hasDocument() {
+  return typeof document !== "undefined" && !!document.createElement;
+}
+
+function assertDocumentReady(action) {
+  if (!hasDocument()) {
+    throw new Error(`PoemTextAnimator 需要浏览器环境，当前无法执行：${action}`);
+  }
+}
+
+function toFiniteNumber(value, fallback) {
+  const parsed = Number(value);
+  return Number.isFinite(parsed) ? parsed : fallback;
+}
+
+function mergeOptions(baseOptions, extraOptions) {
+  const nextOptions = {
+    ...baseOptions,
+    ...extraOptions,
+  };
+
+  nextOptions.charDelay = Math.max(
+    0,
+    toFiniteNumber(nextOptions.charDelay, DEFAULT_OPTIONS.charDelay)
+  );
+  nextOptions.lineInterval = Math.max(
+    0,
+    toFiniteNumber(nextOptions.lineInterval, DEFAULT_OPTIONS.lineInterval)
+  );
+  nextOptions.baseClass = String(nextOptions.baseClass || DEFAULT_OPTIONS.baseClass);
+  nextOptions.animationClass = String(nextOptions.animationClass || DEFAULT_OPTIONS.animationClass);
+  nextOptions.lineTag = String(nextOptions.lineTag || DEFAULT_OPTIONS.lineTag);
+
+  return nextOptions;
+}
+
+function resolveContainer(container) {
+  assertDocumentReady("resolveContainer");
+
+  if (!container) {
+    throw new Error("TextAnimator 需要一个有效的容器。");
+  }
+
+  if (typeof container === "string") {
+    const matchedElement = document.querySelector(container);
+    if (!matchedElement) {
+      throw new Error(`未找到容器：${container}`);
+    }
+    return matchedElement;
+  }
+
+  if (container.nodeType === 1) {
+    return container;
+  }
+
+  throw new Error("容器参数必须是 CSS 选择器或 DOM 元素。");
+}
+
+function normalizeLines(lines) {
+  if (Array.isArray(lines)) {
+    return lines.map((line) => String(line == null ? "" : line));
+  }
+  return [String(lines == null ? "" : lines)];
+}
+
+function resolveAnimationClass(options, lineIndex) {
+  if (typeof options.animationResolver === "function") {
+    const resolved = options.animationResolver(lineIndex, options);
+    if (typeof resolved === "string" && resolved.trim()) {
+      return resolved.trim();
+    }
+  }
+
+  if (Array.isArray(options.animationClasses) && options.animationClasses.length > 0) {
+    return String(options.animationClasses[lineIndex % options.animationClasses.length]);
+  }
+
+  return options.animationClass;
+}
+
+function createLineElement(tagName) {
+  assertDocumentReady("createLineElement");
+  return document.createElement(tagName);
+}
+
+// 将文本拆成 span，允许 CSS 按字符做动画。
+export function splitTextToSpans(targetElement, text, charDelay) {
+  assertDocumentReady("splitTextToSpans");
+
+  if (!targetElement || typeof targetElement.appendChild !== "function") {
+    throw new Error("splitTextToSpans 需要有效的 DOM 元素。");
+  }
+
+  const safeText = String(text == null ? "" : text);
+  const safeDelay = Math.max(0, toFiniteNumber(charDelay, DEFAULT_OPTIONS.charDelay));
+
+  targetElement.textContent = "";
+
+  for (let index = 0; index < safeText.length; index += 1) {
+    const span = document.createElement("span");
+    span.textContent = safeText.charAt(index);
+    span.style.animationDelay = `${(index * safeDelay).toFixed(3)}s`;
+    targetElement.appendChild(span);
+  }
+
+  return targetElement;
+}
+
+function ensureUsable(instance) {
+  if (instance.destroyed) {
+    throw new Error("当前 TextAnimator 已被销毁，无法继续使用。");
+  }
+}
+
+function renderSingleLine(instance, text, options, lineIndex) {
+  const lineElement = createLineElement(options.lineTag);
+  lineElement.className = `${options.baseClass} ${resolveAnimationClass(options, lineIndex)}`;
+  splitTextToSpans(lineElement, text, options.charDelay);
+  instance.container.appendChild(lineElement);
+  return lineElement;
+}
+
+export class TextAnimator {
+  constructor(container, options) {
+    this.container = resolveContainer(container);
+    this.options = mergeOptions(DEFAULT_OPTIONS, options || {});
+    this.timerIds = [];
+    this.destroyed = false;
+  }
+
+  updateOptions(nextOptions) {
+    ensureUsable(this);
+    this.options = mergeOptions(this.options, nextOptions || {});
+    return this.options;
+  }
+
+  cancel() {
+    for (let index = 0; index < this.timerIds.length; index += 1) {
+      clearTimeout(this.timerIds[index]);
+    }
+    this.timerIds = [];
+  }
+
+  clear() {
+    ensureUsable(this);
+    this.cancel();
+    this.container.textContent = "";
+  }
+
+  render(text, overrideOptions) {
+    ensureUsable(this);
+
+    const merged = mergeOptions(this.options, overrideOptions || {});
+    if (merged.clearBeforeRender) {
+      this.clear();
+    } else {
+      this.cancel();
+    }
+
+    return renderSingleLine(this, text, merged, 0);
+  }
+
+  // 逐行定时渲染，适合诗句、歌词、短文案轮播。
+  renderLines(lines, overrideOptions) {
+    ensureUsable(this);
+
+    const merged = mergeOptions(this.options, overrideOptions || {});
+    const safeLines = normalizeLines(lines);
+
+    if (merged.clearBeforeRender) {
+      this.clear();
+    } else {
+      this.cancel();
+    }
+
+    return new Promise((resolve) => {
+      if (safeLines.length === 0) {
+        resolve([]);
+        return;
+      }
+
+      const createdElements = [];
+
+      for (let lineIndex = 0; lineIndex < safeLines.length; lineIndex += 1) {
+        const timerId = setTimeout(() => {
+          if (this.destroyed) {
+            return;
+          }
+
+          createdElements.push(renderSingleLine(this, safeLines[lineIndex], merged, lineIndex));
+          if (createdElements.length === safeLines.length) {
+            resolve(createdElements);
+          }
+        }, merged.lineInterval * lineIndex);
+
+        this.timerIds.push(timerId);
+      }
+    });
+  }
+
+  destroy() {
+    if (this.destroyed) {
+      return;
+    }
+
+    this.cancel();
+    this.container.textContent = "";
+    this.container = null;
+    this.destroyed = true;
+  }
+}
+
+export function createTextAnimator(container, options) {
+  return new TextAnimator(container, options);
+}
+
+const PoemTextAnimator = {
+  version: VERSION,
+  ANIMATION_PRESETS: ANIMATION_PRESETS.slice(),
+  TextAnimator,
+  createTextAnimator,
+  splitTextToSpans,
+};
+
+export default PoemTextAnimator;
```
- src/libs/poem-text-animator/animations.css
```diff
diff --git a/src/libs/poem-text-animator/animations.css b/src/libs/poem-text-animator/animations.css
new file mode 100644
index 0000000..2124bdc
--- /dev/null
+++ b/src/libs/poem-text-animator/animations.css
@@ -0,0 +1,170 @@
+/*
+  基于 poem-text-animator 动画预设改造为标题作用域样式，
+  仅影响 .slide-title，避免污染全局布局。
+*/
+.slide-title.animate span {
+  display: inline-block;
+}
+
+.slide-title.one span {
+  color: #1e6fe0;
+  opacity: 0;
+  transform: translate(-120px, -40px) rotate(-180deg) scale(3);
+  animation: titleRevolveScale 0.45s forwards;
+}
+
+@keyframes titleRevolveScale {
+  60% {
+    transform: translate(18px, 14px) rotate(28deg) scale(0.3);
+  }
+
+  100% {
+    transform: translate(0) rotate(0) scale(1);
+    opacity: 1;
+  }
+}
+
+.slide-title.two span {
+  color: #79a31a;
+  opacity: 0;
+  transform: translate(160px, -100px) scale(2);
+  animation: titleBallDrop 0.35s forwards;
+}
+
+@keyframes titleBallDrop {
+  60% {
+    transform: translate(0, 20px) rotate(-180deg) scale(0.5);
+  }
+
+  100% {
+    transform: translate(0) rotate(0deg) scale(1);
+    opacity: 1;
+  }
+}
+
+.slide-title.three span {
+  color: #aa0f77;
+  opacity: 0;
+  transform: translate(-280px, 0) scale(0);
+  animation: titleSideSlide 0.5s forwards;
+}
+
+@keyframes titleSideSlide {
+  60% {
+    transform: translate(20px, 0) scale(1);
+    color: #aa0f77;
+  }
+
+  80% {
+    transform: translate(20px, 0) scale(1);
+    color: #aa0f77;
+  }
+
+  99% {
+    transform: translate(0) scale(1.2);
+    color: #0bafff;
+  }
+
+  100% {
+    transform: translate(0) scale(1);
+    opacity: 1;
+    color: #aa0f77;
+  }
+}
+
+.slide-title.four span {
+  color: #8d6a00;
+  opacity: 0;
+  transform: translate(0, -100px) rotate(360deg) scale(0);
+  animation: titleRevolveDrop 0.35s forwards;
+}
+
+@keyframes titleRevolveDrop {
+  30% {
+    transform: translate(0, -50px) rotate(180deg) scale(1);
+  }
+
+  60% {
+    transform: translate(0, 20px) scale(0.8) rotate(0deg);
+  }
+
+  100% {
+    transform: translate(0) scale(1) rotate(0deg);
+    opacity: 1;
+  }
+}
+
+.slide-title.five span {
+  color: #dd3f0f;
+  opacity: 0;
+  transform: translate(0, -100px) rotate(360deg) scale(0);
+  animation: titleDropVanish 0.5s forwards;
+}
+
+@keyframes titleDropVanish {
+  30% {
+    transform: translate(0, -50px) rotate(180deg) scale(1);
+  }
+
+  50% {
+    transform: translate(0, 20px) scale(0.8) rotate(0deg);
+    opacity: 1;
+  }
+
+  80% {
+    transform: translate(-90px, -90px) scale(1.5) rotate(-180deg);
+    opacity: 0;
+  }
+
+  100% {
+    transform: translate(0) scale(1) rotate(0deg);
+    opacity: 1;
+  }
+}
+
+.slide-title.six span {
+  color: #d99d06;
+  opacity: 0;
+  transform: rotate(-180deg) translate(150px, 0);
+  animation: titleTwister 0.45s forwards;
+}
+
+@keyframes titleTwister {
+  10% {
+    opacity: 1;
+  }
+
+  100% {
+    transform: rotate(0deg) translate(0);
+    opacity: 1;
+  }
+}
+
+.slide-title.seven span {
+  color: #2a980a;
+  opacity: 0;
+  transform: translate(-150px, 0) scale(0.3);
+  animation: titleLeftRight 0.48s forwards;
+}
+
+@keyframes titleLeftRight {
+  40% {
+    transform: translate(50px, 0) scale(0.7);
+    opacity: 1;
+    color: #2a980a;
+  }
+
+  60% {
+    color: #1d4ed8;
+  }
+
+  80% {
+    transform: translate(0) scale(2);
+    opacity: 0;
+  }
+
+  100% {
+    transform: translate(0) scale(1);
+    opacity: 1;
+  }
+}
```

## 测试用例
### TC-101 标题动画播放
- 类型：功能测试
- 优先级：高
- 关联模块：`src/main.js` + `src/libs/poem-text-animator`
- 前置条件：页面启动后进入 PPT 首页
- 操作步骤：
1. 连续点击“下一页”浏览到第 8 页后回到第 1 页
2. 观察每页标题是否在切页后重新逐字动画
- 预期结果：
- 每页标题可见逐字动画
- 动画预设按页序循环切换
- 是否通过：待验证

### TC-102 标题样式隔离
- 类型：功能测试
- 优先级：中
- 关联模块：`src/libs/poem-text-animator/animations.css`
- 前置条件：页面启动完成
- 操作步骤：
1. 观察目录区、底部状态栏、正文段落样式
2. 对比标题动画启用前后的布局稳定性
- 预期结果：
- 非标题区域样式不被动画库样式污染
- 页面主布局无跳动或错位
- 是否通过：待验证

### TC-103 语法检查
- 类型：静态检查
- 优先级：中
- 关联模块：`src/main.js`、`src/libs/poem-text-animator/index.js`
- 前置条件：本地具备 Node.js
- 操作步骤：
1. 执行 `node --check --input-type=module < src/main.js`
2. 执行 `node --check --input-type=module < src/libs/poem-text-animator/index.js`
- 预期结果：
- 两条命令均无报错退出
- 是否通过：已通过
