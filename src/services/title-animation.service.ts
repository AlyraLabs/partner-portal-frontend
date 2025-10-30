export interface TitleAnimationConfig {
  animationFrames: number;
  animationSpeed: number;
  glitchChars: string;
  cyberChars: string;
  possibleChars: string;
}

const defaultConfig: TitleAnimationConfig = {
  animationFrames: 45,
  animationSpeed: 16,
  glitchChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  cyberChars: '0123456789',
  possibleChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
};

type TextNodeInfo = {
  node: Text;
  length: number;
};

type AnimationState = {
  textNodes: TextNodeInfo[];
  originalText: string;
  config: TitleAnimationConfig;
  mouseEnterHandler?: (event: MouseEvent) => void;
  isAnimating: boolean;
};

const animationStates = new Map<HTMLElement, AnimationState>();
const animationTimeouts = new Map<HTMLElement, number>();

/**
 * Initializes the animation for the given element and returns a cleanup handler.
 */
export const initializeTitleAnimation = (
  element: HTMLElement,
  config?: Partial<TitleAnimationConfig>
): (() => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  cleanupElement(element);

  const textNodes = collectTextNodes(element);
  const initialText = textNodes.map(info => info.node.textContent ?? '').join('');

  if (!initialText.trim().length) {
    return () => {};
  }

  const animationConfig: TitleAnimationConfig = { ...defaultConfig, ...config };

  const state: AnimationState = {
    textNodes,
    originalText: initialText,
    config: animationConfig,
    isAnimating: false,
  };

  const triggerAnimation = () => runAnimation(element, state);

  state.mouseEnterHandler = () => {
    if (!state.isAnimating) {
      const currentText = readCurrentText(state.textNodes);
      if (currentText !== state.originalText) {
        state.originalText = currentText;
      }
    }

    triggerAnimation();
  };

  animationStates.set(element, state);

  element.addEventListener('mouseenter', state.mouseEnterHandler);

  return () => {
    element.removeEventListener('mouseenter', state.mouseEnterHandler as EventListener);
    clearAnimationForElement(element);
  };
};

/**
 * Forces the animation to run for an element that has already been initialized.
 */
export const startTitleAnimation = (element: HTMLElement, config?: Partial<TitleAnimationConfig>): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const state = animationStates.get(element);
  if (!state) {
    initializeTitleAnimation(element, config);
    return;
  }

  state.config = { ...state.config, ...config };
  state.originalText = readCurrentText(state.textNodes);
  runAnimation(element, state);
};

/**
 * Stops every active animation and removes related listeners.
 */
export const clearAnimation = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  animationTimeouts.forEach(timeoutId => {
    clearTimeout(timeoutId);
  });
  animationTimeouts.clear();

  animationStates.forEach((state, element) => {
    applyTextToNodes(state.textNodes, state.originalText);
    state.isAnimating = false;
    element.removeEventListener('mouseenter', state.mouseEnterHandler as EventListener);
  });

  animationStates.clear();
};

/**
 * Clears the animation for a single element and restores its text.
 */
export const clearAnimationForElement = (element: HTMLElement): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const timeoutId = animationTimeouts.get(element);
  if (timeoutId) {
    clearTimeout(timeoutId);
    animationTimeouts.delete(element);
  }

  const state = animationStates.get(element);
  if (state) {
    if (state.isAnimating) {
      applyTextToNodes(state.textNodes, state.originalText);
    } else {
      state.originalText = readCurrentText(state.textNodes);
    }
    state.isAnimating = false;
    element.removeEventListener('mouseenter', state.mouseEnterHandler as EventListener);
    animationStates.delete(element);
  }
};

const cleanupElement = (element: HTMLElement) => {
  const existingState = animationStates.get(element);
  if (!existingState) {
    return;
  }

  const timeoutId = animationTimeouts.get(element);
  if (timeoutId) {
    clearTimeout(timeoutId);
    animationTimeouts.delete(element);
  }

  applyTextToNodes(existingState.textNodes, existingState.originalText);
  existingState.isAnimating = false;
  element.removeEventListener('mouseenter', existingState.mouseEnterHandler as EventListener);
  animationStates.delete(element);
};

const collectTextNodes = (element: HTMLElement): TextNodeInfo[] => {
  const nodes: TextNodeInfo[] = [];

  const traverse = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const textNode = node as Text;
      nodes.push({
        node: textNode,
        length: textNode.textContent?.length ?? 0,
      });
    } else {
      node.childNodes.forEach(traverse);
    }
  };

  traverse(element);

  return nodes;
};

const readCurrentText = (textNodes: TextNodeInfo[]): string => {
  return textNodes.map(info => info.node.textContent ?? '').join('');
};

const applyTextToNodes = (textNodes: TextNodeInfo[], value: string): void => {
  if (!textNodes.length) {
    return;
  }

  let cursor = 0;
  const totalLength = value.length;

  textNodes.forEach((info, index) => {
    const isLast = index === textNodes.length - 1;
    const segmentLength = info.length || info.node.textContent?.length || 0;
    const sliceEnd = isLast ? totalLength : cursor + segmentLength;
    const textSegment = value.slice(cursor, sliceEnd);

    info.node.textContent = textSegment;
    info.length = textSegment.length;
    cursor = sliceEnd;
  });
};

const runAnimation = (element: HTMLElement, state: AnimationState): void => {
  const targetText = state.originalText;
  if (!targetText.trim().length) {
    return;
  }

  const existingTimeout = animationTimeouts.get(element);
  if (existingTimeout) {
    clearTimeout(existingTimeout);
  }

  let frame = 0;
  const totalFrames = state.config.animationFrames;
  const totalLength = targetText.length;
  state.isAnimating = true;
  applyTextToNodes(state.textNodes, targetText);

  const animate = () => {
    if (frame >= totalFrames) {
      applyTextToNodes(state.textNodes, targetText);
      state.isAnimating = false;
      animationTimeouts.delete(element);
      return;
    }

    const revealProgress = frame / totalFrames;
    const revealedCharacters = Math.min(totalLength, Math.floor(revealProgress * (totalLength + 2)));

    let result = '';

    for (let i = 0; i < totalLength; i++) {
      const currentChar = targetText[i];

      if (i < revealedCharacters) {
        result += currentChar;
        continue;
      }

      if (currentChar === ' ') {
        result += ' ';
        continue;
      }

      result += getRandomChar(currentChar, state.config);
    }

    applyTextToNodes(state.textNodes, result);
    frame++;

    const timeoutId = window.setTimeout(animate, state.config.animationSpeed);
    animationTimeouts.set(element, timeoutId);
  };

  animate();
};

const getRandomChar = (originalChar: string, config: TitleAnimationConfig): string => {
  const rand = Math.random();

  if (rand < 0.4) {
    const glitchIndex = Math.floor(Math.random() * config.glitchChars.length);
    return config.glitchChars[glitchIndex];
  }

  if (rand < 0.7) {
    const cyberIndex = Math.floor(Math.random() * config.cyberChars.length);
    return config.cyberChars[cyberIndex];
  }

  const randomIndex = Math.floor(Math.random() * config.possibleChars.length);
  return config.possibleChars[randomIndex];
};
