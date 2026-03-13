export const VERSION = "1.1.0";
export const ANIMATION_PRESETS = ["one", "two", "three", "four", "five", "six", "seven"];

export const DEFAULT_OPTIONS = Object.freeze({
  baseClass: "animate",
  animationClass: "one",
  lineTag: "p",
  charDelay: 0.05,
  lineInterval: 1000,
  clearBeforeRender: false,
});

function hasDocument() {
  return typeof document !== "undefined" && !!document.createElement;
}

function assertDocumentReady(action) {
  if (!hasDocument()) {
    throw new Error(`PoemTextAnimator 需要浏览器环境，当前无法执行：${action}`);
  }
}

function toFiniteNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function mergeOptions(baseOptions, extraOptions) {
  const nextOptions = {
    ...baseOptions,
    ...extraOptions,
  };

  nextOptions.charDelay = Math.max(
    0,
    toFiniteNumber(nextOptions.charDelay, DEFAULT_OPTIONS.charDelay)
  );
  nextOptions.lineInterval = Math.max(
    0,
    toFiniteNumber(nextOptions.lineInterval, DEFAULT_OPTIONS.lineInterval)
  );
  nextOptions.baseClass = String(nextOptions.baseClass || DEFAULT_OPTIONS.baseClass);
  nextOptions.animationClass = String(nextOptions.animationClass || DEFAULT_OPTIONS.animationClass);
  nextOptions.lineTag = String(nextOptions.lineTag || DEFAULT_OPTIONS.lineTag);

  return nextOptions;
}

function resolveContainer(container) {
  assertDocumentReady("resolveContainer");

  if (!container) {
    throw new Error("TextAnimator 需要一个有效的容器。");
  }

  if (typeof container === "string") {
    const matchedElement = document.querySelector(container);
    if (!matchedElement) {
      throw new Error(`未找到容器：${container}`);
    }
    return matchedElement;
  }

  if (container.nodeType === 1) {
    return container;
  }

  throw new Error("容器参数必须是 CSS 选择器或 DOM 元素。");
}

function normalizeLines(lines) {
  if (Array.isArray(lines)) {
    return lines.map((line) => String(line == null ? "" : line));
  }
  return [String(lines == null ? "" : lines)];
}

function resolveAnimationClass(options, lineIndex) {
  if (typeof options.animationResolver === "function") {
    const resolved = options.animationResolver(lineIndex, options);
    if (typeof resolved === "string" && resolved.trim()) {
      return resolved.trim();
    }
  }

  if (Array.isArray(options.animationClasses) && options.animationClasses.length > 0) {
    return String(options.animationClasses[lineIndex % options.animationClasses.length]);
  }

  return options.animationClass;
}

function createLineElement(tagName) {
  assertDocumentReady("createLineElement");
  return document.createElement(tagName);
}

// 将文本拆成 span，允许 CSS 按字符做动画。
export function splitTextToSpans(targetElement, text, charDelay) {
  assertDocumentReady("splitTextToSpans");

  if (!targetElement || typeof targetElement.appendChild !== "function") {
    throw new Error("splitTextToSpans 需要有效的 DOM 元素。");
  }

  const safeText = String(text == null ? "" : text);
  const safeDelay = Math.max(0, toFiniteNumber(charDelay, DEFAULT_OPTIONS.charDelay));

  targetElement.textContent = "";

  for (let index = 0; index < safeText.length; index += 1) {
    const span = document.createElement("span");
    span.textContent = safeText.charAt(index);
    span.style.animationDelay = `${(index * safeDelay).toFixed(3)}s`;
    targetElement.appendChild(span);
  }

  return targetElement;
}

function ensureUsable(instance) {
  if (instance.destroyed) {
    throw new Error("当前 TextAnimator 已被销毁，无法继续使用。");
  }
}

function renderSingleLine(instance, text, options, lineIndex) {
  const lineElement = createLineElement(options.lineTag);
  lineElement.className = `${options.baseClass} ${resolveAnimationClass(options, lineIndex)}`;
  splitTextToSpans(lineElement, text, options.charDelay);
  instance.container.appendChild(lineElement);
  return lineElement;
}

export class TextAnimator {
  constructor(container, options) {
    this.container = resolveContainer(container);
    this.options = mergeOptions(DEFAULT_OPTIONS, options || {});
    this.timerIds = [];
    this.destroyed = false;
  }

  updateOptions(nextOptions) {
    ensureUsable(this);
    this.options = mergeOptions(this.options, nextOptions || {});
    return this.options;
  }

  cancel() {
    for (let index = 0; index < this.timerIds.length; index += 1) {
      clearTimeout(this.timerIds[index]);
    }
    this.timerIds = [];
  }

  clear() {
    ensureUsable(this);
    this.cancel();
    this.container.textContent = "";
  }

  render(text, overrideOptions) {
    ensureUsable(this);

    const merged = mergeOptions(this.options, overrideOptions || {});
    if (merged.clearBeforeRender) {
      this.clear();
    } else {
      this.cancel();
    }

    return renderSingleLine(this, text, merged, 0);
  }

  // 逐行定时渲染，适合诗句、歌词、短文案轮播。
  renderLines(lines, overrideOptions) {
    ensureUsable(this);

    const merged = mergeOptions(this.options, overrideOptions || {});
    const safeLines = normalizeLines(lines);

    if (merged.clearBeforeRender) {
      this.clear();
    } else {
      this.cancel();
    }

    return new Promise((resolve) => {
      if (safeLines.length === 0) {
        resolve([]);
        return;
      }

      const createdElements = [];

      for (let lineIndex = 0; lineIndex < safeLines.length; lineIndex += 1) {
        const timerId = setTimeout(() => {
          if (this.destroyed) {
            return;
          }

          createdElements.push(renderSingleLine(this, safeLines[lineIndex], merged, lineIndex));
          if (createdElements.length === safeLines.length) {
            resolve(createdElements);
          }
        }, merged.lineInterval * lineIndex);

        this.timerIds.push(timerId);
      }
    });
  }

  destroy() {
    if (this.destroyed) {
      return;
    }

    this.cancel();
    this.container.textContent = "";
    this.container = null;
    this.destroyed = true;
  }
}

export function createTextAnimator(container, options) {
  return new TextAnimator(container, options);
}

const PoemTextAnimator = {
  version: VERSION,
  ANIMATION_PRESETS: ANIMATION_PRESETS.slice(),
  TextAnimator,
  createTextAnimator,
  splitTextToSpans,
};

export default PoemTextAnimator;
