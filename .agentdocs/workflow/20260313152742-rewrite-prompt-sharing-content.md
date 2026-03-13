# 按提示词实践重写 PPT 标题与内容

## 背景与目标
- 用户提供了完整分享思路（前言、提示词方法、skills、多线程/自动化、启发、附录）。
- 目标是在保持现有 PPT 布局与样式不变的前提下，重写整套标题与文案，使叙事贴合个人分享逻辑。

## 约束与原则
- 不改动现有页面结构与样式类名，避免影响翻页、目录与动画逻辑。
- 文案以“可演讲、可讨论、可延展”为导向，保留用户原始表达风格。
- 同步更新项目认知与索引文档，满足治理规范。

## 阶段与 TODO
- [x] 读取当前 `index.html` 并映射现有 8 页布局结构。
- [x] 按用户文案思路完成 8 页标题、正文、备注重写。
- [x] 更新 `AGENTS.md` 项目新认知。
- [x] 更新 `.agentdocs/index.md` 索引映射与关键记忆。
- [x] 产出本次变更留痕文档并记录完整 diff。

## 关键风险
- 文案显著变更后，单页文字量增加，可能在小屏场景出现局部拥挤。
- 附录链接目前保留“现场补充”，正式演讲前需要补齐实际 URL。

## 当前进展
- 已完成 8 页内容重构，主题聚焦“提示词 + Prompt Skills + 自动化工作流”。
- 已保留原交互和样式结构，避免引入额外回归风险。
- 已同步更新文档治理与项目认知记录。

## 代码变更
- index.html
```diff
diff --git a/index.html b/index.html
index c353256..ae5d0f6 100644
--- a/index.html
+++ b/index.html
@@ -3,7 +3,7 @@
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <title>AI 分享前端 PPT 初版</title>
+    <title>提示词与 AI 协作玩法分享</title>
     <link rel="preconnect" href="https://fonts.googleapis.com" />
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
     <link
@@ -22,8 +22,8 @@
 
     <header class="topbar">
       <div class="deck-meta">
-        <p class="deck-kicker">AI Sharing Deck v0.1</p>
-        <h1>让团队 30 分钟理解 AI 分享怎么做</h1>
+        <p class="deck-kicker">Prompt × Agent Sharing</p>
+        <h1>从提示词到工作流：我的 AI 协作实践</h1>
       </div>
       <div class="control-group">
         <button id="prevBtn" class="btn">上一页</button>
@@ -43,157 +43,157 @@
       </aside>
 
       <section class="slides-stage" id="slidesStage" aria-live="polite">
-        <article class="slide is-active" data-title="开场：为什么是现在" data-note="建议先讲业务压力，再讲机会窗口。">
-          <p class="slide-tag reveal">01 开场</p>
-          <h2 class="slide-title">为什么今天必须把 AI 分享做成团队共识</h2>
+        <article class="slide is-active" data-title="前言：先交代边界" data-note="先说明时间紧、准备有限，再明确希望得到建议。">
+          <p class="slide-tag reveal">01 前言</p>
+          <h2 class="slide-title">先说明三件事：时间紧、准备不充分、欢迎高手指点</h2>
           <p class="lead reveal">
-            分享目标不是“讲技术热词”，而是帮助产品、研发、运营在同一套价值语言里协作。
+            作为第一个分享者，我更希望先打开视野、抛砖引玉；如果讲得不够完整，也期待大家直接指出问题。
           </p>
           <div class="metric-grid reveal">
             <div>
-              <p class="metric-value">30 分钟</p>
-              <p class="metric-label">完成一次高质量分享</p>
+              <p class="metric-value">第 1 位</p>
+              <p class="metric-label">首位分享，目标是开启讨论</p>
             </div>
             <div>
-              <p class="metric-value">8 页</p>
-              <p class="metric-label">覆盖共识所需核心信息</p>
+              <p class="metric-value">这 周</p>
+              <p class="metric-label">准备时间较紧，先讲核心方法</p>
             </div>
             <div>
-              <p class="metric-value">3 层</p>
-              <p class="metric-label">战略、场景、执行</p>
+              <p class="metric-value">私 聊</p>
+              <p class="metric-label">游戏开发细节不展开，感兴趣可交流</p>
             </div>
           </div>
         </article>
 
-        <article class="slide" data-title="趋势：AI 价值窗口" data-note="用公司内部数据替换示例数字会更有说服力。">
-          <p class="slide-tag reveal">02 趋势</p>
-          <h2 class="slide-title">AI 价值窗口：降本、提效、增收同时发生</h2>
+        <article class="slide" data-title="提示词：全局设计" data-note="先讲自然语言模糊性，再讲上下文窗口限制与应对。">
+          <p class="slide-tag reveal">02 提示词</p>
+          <h2 class="slide-title">怎么设计提示词：全局提示词 + Agent 历史文档</h2>
           <div class="dual-column reveal">
             <div class="card">
-              <h3>外部环境变化</h3>
+              <h3>为什么要这样设计</h3>
               <ul>
-                <li>多模态模型推理成本持续下降</li>
-                <li>通用 Agent 工具链快速成熟</li>
-                <li>用户对智能体验的预期显著提高</li>
+                <li>自然语言天然有模糊地带，容易理解偏差</li>
+                <li>上下文长度有限，约束条件容易被冲掉</li>
+                <li>单轮 Prompt 难以稳定复现复杂任务</li>
               </ul>
             </div>
             <div class="card">
-              <h3>内部行动理由</h3>
+              <h3>我的实践做法</h3>
               <ul>
-                <li>流程中重复劳动占比高，自动化收益明确</li>
-                <li>已有数据资产，但复用效率偏低</li>
-                <li>需要统一方法，避免零散试错</li>
+                <li>全局提示词统一目标、边界、输出风格</li>
+                <li>Agent 历史文档沉淀决策与约束记忆</li>
+                <li>每次任务只补充差量信息，降低漂移</li>
               </ul>
             </div>
           </div>
         </article>
 
-        <article class="slide" data-title="能力：AI 分享内容地图" data-note="这里可以结合团队角色做内容取舍。">
-          <p class="slide-tag reveal">03 能力</p>
-          <h2 class="slide-title">一场 AI 分享，建议覆盖这 4 个能力象限</h2>
+        <article class="slide" data-title="Prompt 池：多思维模式" data-note="可按角色拆，也可按思维方式拆；这里重点讲思维模式。">
+          <p class="slide-tag reveal">03 Prompt 池</p>
+          <h2 class="slide-title">把 AI 拆成“思维模式”，形成可切换的 Prompt Skills</h2>
           <div class="quad-grid reveal">
             <div class="quad-item">
-              <h3>模型认知</h3>
-              <p>模型能做什么、不能做什么，边界要先讲清。</p>
+              <h3>发散思维</h3>
+              <p>`divergent-thinking`：适合开放问题，探索平行方案。</p>
             </div>
             <div class="quad-item">
-              <h3>Prompt 设计</h3>
-              <p>输入结构化，输出才能稳定可复用。</p>
+              <h3>逻辑分析</h3>
+              <p>`logical-analysis`：适合单路径推理，追求精确结论。</p>
             </div>
             <div class="quad-item">
-              <h3>业务落地</h3>
-              <p>把“酷炫演示”转换为“可衡量结果”。</p>
+              <h3>批判思维</h3>
+              <p>`critical-review`：用于找问题、纠错、突破思维定式。</p>
             </div>
             <div class="quad-item">
-              <h3>风险治理</h3>
-              <p>质量、合规、数据安全必须同步设计。</p>
+              <h3>系统思维</h3>
+              <p>关注全局依赖与反馈回路，适合复杂协同任务。</p>
             </div>
           </div>
         </article>
 
-        <article class="slide" data-title="框架：一页讲清选题" data-note="优先展示 1 个高频场景的切入方式。">
-          <p class="slide-tag reveal">04 选题</p>
-          <h2 class="slide-title">用“问题-方案-收益”结构快速定义一个分享主题</h2>
+        <article class="slide" data-title="可能性：Multi-Agent" data-note="这里强调“人格分裂”是可控协同，不是随机发挥。">
+          <p class="slide-tag reveal">04 可能性</p>
+          <h2 class="slide-title">当 Prompt 池可编排后：从单助手到 Multi-Agent 协同</h2>
           <div class="timeline reveal">
             <div class="timeline-item">
-              <p class="timeline-title">问题定义</p>
-              <p>目标用户是谁？当前损失在哪里？</p>
+              <p class="timeline-title">拆解方式</p>
+              <p>可按思维模式、职业角色或业务板块拆分 Agent。</p>
             </div>
             <div class="timeline-item">
-              <p class="timeline-title">方案设计</p>
-              <p>模型、工具、流程如何组合？</p>
+              <p class="timeline-title">并行产出</p>
+              <p>同一问题让多个 Agent 同时给出候选方案。</p>
             </div>
             <div class="timeline-item">
-              <p class="timeline-title">收益验证</p>
-              <p>上线前后用哪些指标对比？</p>
+              <p class="timeline-title">互评收敛</p>
+              <p>用批判型 Agent 做审核，淘汰弱方案并补漏。</p>
             </div>
             <div class="timeline-item">
-              <p class="timeline-title">推广路径</p>
-              <p>如何复制到第二个、第三个场景？</p>
+              <p class="timeline-title">沉淀复用</p>
+              <p>把有效 Prompt 回收进池子，形成持续进化体系。</p>
             </div>
           </div>
         </article>
 
-        <article class="slide" data-title="Demo：现场演示结构" data-note="演示环节建议控制在 8 分钟内。">
-          <p class="slide-tag reveal">05 Demo</p>
-          <h2 class="slide-title">一次高可用 Demo，建议包含 3 段式叙事</h2>
+        <article class="slide" data-title="冰山之下：广度与深度" data-note="后半部分偏抛砖引玉，重点展示可延展空间。">
+          <p class="slide-tag reveal">05 冰山</p>
+          <h2 class="slide-title">冰山之下：多线程（广度）与自动化（深度）</h2>
           <div class="dual-column reveal">
             <div class="card card-strong">
-              <h3>Before</h3>
-              <p>展示旧流程：手工、重复、延迟高。</p>
+              <h3>多线程（广度）</h3>
+              <p>结合 Git Worktree 与脑洞技能，并行开发多个版本，像在平行宇宙里同时试错。</p>
             </div>
             <div class="card card-strong">
-              <h3>After</h3>
-              <p>展示新流程：AI 辅助 + 人工复核。</p>
+              <h3>自动化（深度）</h3>
+              <p>把分析、改码、测试、评分串成 AI Workflow，中途尽量减少人工介入。</p>
             </div>
           </div>
           <div class="callout reveal">
-            <p>关键不是“模型有多强”，而是“团队今天就能用起来”。</p>
+            <p>关键词：平行宇宙、永动机、自博弈系统、低配版强化学习。</p>
           </div>
         </article>
 
-        <article class="slide" data-title="执行：90 天落地节奏" data-note="可以把甘特图替换成你们真实排期。">
-          <p class="slide-tag reveal">06 执行</p>
-          <h2 class="slide-title">建议执行节奏：先试点，再标准化，再规模化</h2>
+        <article class="slide" data-title="自动化案例：从脚本到自进化" data-note="从身边问题切入，比抽象概念更容易共鸣。">
+          <p class="slide-tag reveal">06 自动化</p>
+          <h2 class="slide-title">从日常脚本到代码自进化：自动化可以做什么？</h2>
           <div class="phase-grid reveal">
             <div class="phase-card">
-              <p class="phase-name">第 1-3 周</p>
-              <p class="phase-title">场景试点</p>
-              <p>确定单一高价值场景，完成闭环验证。</p>
+              <p class="phase-name">日常效率</p>
+              <p class="phase-title">自动抢会议室</p>
+              <p>把高频、重复、争抢型流程脚本化，减少无效消耗。</p>
             </div>
             <div class="phase-card">
-              <p class="phase-name">第 4-8 周</p>
-              <p class="phase-title">流程标准化</p>
-              <p>固化提示词模板与评估清单。</p>
+              <p class="phase-name">团队协作</p>
+              <p class="phase-title">吃饭推荐脚本</p>
+              <p>自动推荐每日选项，降低“吃什么”决策成本。</p>
             </div>
             <div class="phase-card">
-              <p class="phase-name">第 9-12 周</p>
-              <p class="phase-title">规模复制</p>
-              <p>跨团队复制并建立运营指标看板。</p>
+              <p class="phase-name">工程演化</p>
+              <p class="phase-title">Code Evolution System</p>
+              <p>AI 分析→自动改码→自动测试→评分→下一轮，用于持续优化 caseMind 性能。</p>
             </div>
           </div>
         </article>
 
-        <article class="slide" data-title="风险：上线前检查" data-note="建议把合规同学加入评审流程。">
-          <p class="slide-tag reveal">07 风险</p>
-          <h2 class="slide-title">上线前至少完成这 4 类检查</h2>
+        <article class="slide" data-title="启发：人和 AI 的关系" data-note="这一页先给观点，再解释为什么。">
+          <p class="slide-tag reveal">07 启发</p>
+          <h2 class="slide-title">我的判断：AI 不会减少任务，只会放大能力与欲望</h2>
           <div class="checklist reveal">
-            <p><span>质量稳定性</span> 输出一致性、幻觉率、失败回退。</p>
-            <p><span>数据安全</span> 脱敏策略、权限边界、日志审计。</p>
-            <p><span>合规要求</span> 版权、隐私、行业监管要求。</p>
-            <p><span>组织协同</span> 责任分工、人工兜底、反馈机制。</p>
+            <p><span>生产力悖论</span> AI 能力膨胀常常伴随目标膨胀，一天可能要做更多事。</p>
+            <p><span>职业定位</span> 面对 AI 时代，更像“一人成军”，要懂前端、后端、设计与调度。</p>
+            <p><span>实践成本</span> 思考能力逐渐接近动手能力，想法可以更快落地成原型。</p>
+            <p><span>协作模式</span> 从前后端分离回到端到端协作，技术形态仍在高速演进。</p>
           </div>
         </article>
 
-        <article class="slide" data-title="收尾：行动清单" data-note="结尾需要明确 owner 和截止时间。">
-          <p class="slide-tag reveal">08 行动</p>
-          <h2 class="slide-title">分享结束后，立刻推进的 3 个动作</h2>
+        <article class="slide" data-title="收尾：附录与交流" data-note="留好仓库地址与扩展话题，引导会后交流。">
+          <p class="slide-tag reveal">08 收尾</p>
+          <h2 class="slide-title">抛砖引玉：欢迎补充更多思维模式与自动化想法</h2>
           <ol class="action-list reveal">
-            <li>本周内确定第一个试点场景与负责人。</li>
-            <li>两周内完成 Demo 版流程并收集反馈。</li>
-            <li>一个月内沉淀可复用模板与评估指标。</li>
+            <li>附录一：`ai-ppt` 本次分享仓库地址（现场补充具体链接）。</li>
+            <li>附录二：标题动画库 `poem-text-animator` 引用地址（现场补充）。</li>
+            <li>会后交流：GameX / MusicX / BookX 等概念原型，感兴趣可私聊。</li>
           </ol>
-          <p class="closing reveal">谢谢，下一页可直接进入自由问答。</p>
+          <p class="closing reveal">谢谢，期待大家的建议，也欢迎继续共创。</p>
         </article>
       </section>
     </main>
```

- AGENTS.md
```diff
diff --git a/AGENTS.md b/AGENTS.md
index 1741159..1c1d225 100644
--- a/AGENTS.md
+++ b/AGENTS.md
@@ -17,3 +17,8 @@
 - 已接入 `poem-text-animator`（来源：`/Users/didi/Documents/program/poem`）到 `src/libs/poem-text-animator`。
 - 标题动画采用逐字拆分方案：在切页时重建 `.slide-title` 的字符节点并触发预设动画。
 - 为避免样式污染，动画 CSS 已作用域限定为 `.slide-title`，不会覆盖全局 `body` 与通用元素样式。
+
+### 2026-03-13 15:27 分享文案重构认知
+- 在不改变布局和样式类名的前提下，已完成 `index.html` 8 页文案的整体重写，主题从“通用 AI 分享模板”切换为“提示词 + Skills + 自动化工作流实践”。
+- 页级元信息（`data-title`、`data-note`）已与新叙事同步更新，目录导航与演讲备注继续可用。
+- 当前内容结构包含：前言边界说明、全局提示词方法、Prompt 池思维模式、Multi-Agent 可能性、冰山之下（多线程/自动化）、自动化案例、个人启发、附录与交流。
```

- .agentdocs/index.md
```diff
diff --git a/.agentdocs/index.md b/.agentdocs/index.md
index dfa1028..2337db7 100644
--- a/.agentdocs/index.md
+++ b/.agentdocs/index.md
@@ -1,16 +1,19 @@
 # Agent Docs 索引
 
 ## 当前变更文档
+`workflow/20260313152742-rewrite-prompt-sharing-content.md` - 按“提示词/skills/自动化”思路重写整套 PPT 标题与内容
 `workflow/20260313141906-init-ai-share-ppt.md` - 搭建 AI 分享前端 PPT 初始版本（零依赖）
 `workflow/20260313143542-add-poem-title-animation.md` - 接入 poem-text-animator，为每页标题增加逐字动画
 
 ## 读取场景
+- 需要快速查看“同一套布局下如何替换成个人分享叙事”的内容改写示例时。
 - 需要快速了解本项目第一版的技术选型、页面结构与交互能力时。
 - 需要追溯首版代码落盘明细与可验证测试步骤时。
 - 需要在后续版本中回滚到初始版本基线时。
 - 需要了解标题动画如何接入、如何调整节奏与预设样式时。
 
 ## 关键记忆
+- 页面布局与样式保持稳定时，可通过替换 `index.html` 文案快速切换分享主题。
 - 当前项目为零依赖静态前端方案，核心入口文件是 `index.html`。
 - 幻灯片交互由 `src/main.js` 管理，样式系统在 `src/styles.css`。
 - 已具备翻页、目录、进度、自动播放、全屏、备注、移动端手势等基础能力。
```

## 测试用例
### TC-001 目录与页标题一致性
- 类型：功能测试
- 优先级：高
- 关联模块：`index.html` 文案、`src/main.js` 目录渲染
- 前置条件：通过静态服务器启动页面
- 操作步骤：
1. 打开首页并查看左侧目录导航
2. 逐页点击“下一页”并观察当前标题与目录高亮
- 预期结果：
- 每页标题与目录条目一致
- 页码进度与目录高亮同步变化
- 是否通过：待验证

### TC-002 新文案布局稳定性
- 类型：界面测试
- 优先级：中
- 关联模块：`index.html` 文案区块、`src/styles.css`
- 前置条件：桌面端浏览器宽度 >= 1280px
- 操作步骤：
1. 逐页检查 `metric-grid`、`dual-column`、`quad-grid`、`phase-grid` 区块
2. 切换到移动端宽度（DevTools）重复检查
- 预期结果：
- 无明显文字溢出与遮挡
- 动画与翻页仍正常触发
- 是否通过：待验证
