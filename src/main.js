import { ANIMATION_PRESETS, splitTextToSpans } from "./libs/poem-text-animator/index.js";

const slideNodes = Array.from(document.querySelectorAll(".slide"));
const outlineList = document.querySelector("#outlineList");
const statusText = document.querySelector("#statusText");
const progressBar = document.querySelector("#progressBar");
const notePanel = document.querySelector("#notePanel");
const noteContent = document.querySelector("#noteContent");
const autoplayBtn = document.querySelector("#autoplayBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const fullscreenBtn = document.querySelector("#fullscreenBtn");

const state = {
  currentIndex: 0,
  autoplay: false,
  autoplayMs: 8000,
  autoplayTimer: null,
  noteVisible: false,
  touchStartX: 0,
};

const TITLE_CHAR_DELAY = 0.03;

if (!slideNodes.length) {
  throw new Error("未找到任何幻灯片节点，请检查 .slide 元素是否存在。");
}

/**
 * 根据 slide 元数据生成目录按钮，便于演讲时快速跳转。
 */
function buildOutline() {
  const fragment = document.createDocumentFragment();

  slideNodes.forEach((slide, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = slide.dataset.title || `第 ${index + 1} 页`;
    button.addEventListener("click", () => goTo(index));

    item.append(button);
    fragment.append(item);
  });

  outlineList.append(fragment);
}

/**
 * 给当前页的关键内容添加分段浮现动画，让节奏更清晰。
 */
function runRevealAnimation(slide) {
  const revealNodes = Array.from(slide.querySelectorAll(".reveal"));

  revealNodes.forEach((node) => {
    node.classList.remove("is-visible");
  });

  revealNodes.forEach((node, idx) => {
    window.setTimeout(() => {
      node.classList.add("is-visible");
    }, 70 * idx);
  });
}

/**
 * 初始化标题动画所需的原始文本，避免重复拆字后文本丢失。
 */
function prepareSlideTitles() {
  slideNodes.forEach((slide) => {
    const titleNode = slide.querySelector(".slide-title");
    if (!titleNode) {
      return;
    }

    titleNode.dataset.rawText = titleNode.textContent?.trim() || "";
  });
}

function resolveTitlePreset(slideIndex) {
  return ANIMATION_PRESETS[slideIndex % ANIMATION_PRESETS.length] || "one";
}

/**
 * 每次切页时，重建当前页标题字符节点并重新触发动画。
 */
function runTitleAnimation(slide, slideIndex) {
  const titleNode = slide.querySelector(".slide-title");
  if (!titleNode) {
    return;
  }

  const rawText = titleNode.dataset.rawText || titleNode.textContent?.trim() || "";
  const preset = resolveTitlePreset(slideIndex);

  ANIMATION_PRESETS.forEach((presetClass) => {
    titleNode.classList.remove(presetClass);
  });

  titleNode.classList.add("animate", preset);
  splitTextToSpans(titleNode, rawText, TITLE_CHAR_DELAY);
}

function updateOutlineCurrent() {
  const buttons = Array.from(outlineList.querySelectorAll("button"));

  buttons.forEach((button, index) => {
    button.classList.toggle("is-current", index === state.currentIndex);
  });
}

function updateStatus() {
  statusText.textContent = `${state.currentIndex + 1} / ${slideNodes.length}`;
  progressBar.style.width = `${((state.currentIndex + 1) / slideNodes.length) * 100}%`;
}

function updateNote() {
  const currentSlide = slideNodes[state.currentIndex];
  noteContent.textContent = currentSlide.dataset.note || "当前页面没有备注。";
}

function renderSlides() {
  slideNodes.forEach((slide, index) => {
    const isCurrent = index === state.currentIndex;

    slide.classList.toggle("is-active", isCurrent);
    slide.setAttribute("aria-hidden", isCurrent ? "false" : "true");
  });

  runTitleAnimation(slideNodes[state.currentIndex], state.currentIndex);
  runRevealAnimation(slideNodes[state.currentIndex]);
  updateOutlineCurrent();
  updateStatus();
  updateNote();
}

function goTo(nextIndex) {
  const clampedIndex = Math.max(0, Math.min(nextIndex, slideNodes.length - 1));

  if (clampedIndex === state.currentIndex) {
    return;
  }

  state.currentIndex = clampedIndex;
  renderSlides();
}

function next() {
  if (state.currentIndex >= slideNodes.length - 1) {
    goTo(0);
    return;
  }

  goTo(state.currentIndex + 1);
}

function prev() {
  if (state.currentIndex <= 0) {
    goTo(slideNodes.length - 1);
    return;
  }

  goTo(state.currentIndex - 1);
}

function stopAutoplay() {
  if (state.autoplayTimer) {
    window.clearInterval(state.autoplayTimer);
    state.autoplayTimer = null;
  }

  state.autoplay = false;
  autoplayBtn.textContent = "自动播放：关";
}

function startAutoplay() {
  state.autoplay = true;
  autoplayBtn.textContent = "自动播放：开";

  state.autoplayTimer = window.setInterval(() => {
    next();
  }, state.autoplayMs);
}

function toggleAutoplay() {
  if (state.autoplay) {
    stopAutoplay();
    return;
  }

  startAutoplay();
}

function toggleNotePanel() {
  state.noteVisible = !state.noteVisible;
  notePanel.classList.toggle("is-visible", state.noteVisible);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
    return;
  }

  document.exitFullscreen?.();
}

function bindEvents() {
  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
  autoplayBtn.addEventListener("click", toggleAutoplay);
  fullscreenBtn.addEventListener("click", toggleFullscreen);

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
      event.preventDefault();
      next();
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      prev();
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      goTo(slideNodes.length - 1);
      return;
    }

    if (event.key.toLowerCase() === "p") {
      event.preventDefault();
      toggleAutoplay();
      return;
    }

    if (event.key.toLowerCase() === "n") {
      event.preventDefault();
      toggleNotePanel();
      return;
    }

    if (event.key.toLowerCase() === "f") {
      event.preventDefault();
      toggleFullscreen();
    }
  });

  const stage = document.querySelector("#slidesStage");

  stage.addEventListener("touchstart", (event) => {
    state.touchStartX = event.changedTouches[0]?.clientX ?? 0;
  });

  stage.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const diff = touchEndX - state.touchStartX;

    if (Math.abs(diff) < 45) {
      return;
    }

    if (diff < 0) {
      next();
      return;
    }

    prev();
  });

  // 页面失焦后暂停自动播放，避免后台长时间空转。
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state.autoplay) {
      stopAutoplay();
    }
  });
}

function init() {
  prepareSlideTitles();
  buildOutline();
  bindEvents();
  renderSlides();
}

init();
