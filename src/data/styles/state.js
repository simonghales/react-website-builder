// @flow

import type { AllBlockStyles, BlockModifierStyles, BlockStyles, MappedStyleModel } from './models';
import type { DataBlockModel } from '../blocks/models';

function getModifierStyleValue(cssKey: string, modifierStyles: BlockModifierStyles): string {
  const { editor } = modifierStyles;
  if (editor && editor[cssKey]) {
    return editor[cssKey];
  }
  return '';
}

export function getStyleValue(cssKey: string, blockStyles: BlockStyles | null): string {
  if (!blockStyles) return '';
  const { styles } = blockStyles;
  return getModifierStyleValue(cssKey, styles.default);
}

export function getBlockStylesFromBlockStyles(
  block: DataBlockModel,
  blockStyles: AllBlockStyles
): BlockStyles | null {
  const { styleKey } = block;
  if (!styleKey) return null;
  return blockStyles[styleKey];
}

function getEditorStyles(styles: BlockModifierStyles): {} {
  const { editor = {} } = styles;
  return editor;
}

function getCustomStyles(styles: BlockModifierStyles): {} {
  const { custom = {} } = styles;
  return custom;
}

export function getMappedBlockStyles(
  block: DataBlockModel,
  allBlockStyles: AllBlockStyles
): MappedStyleModel {
  const blockStyles = getBlockStylesFromBlockStyles(block, allBlockStyles);
  if (!blockStyles) return {};
  const { styles } = blockStyles;
  if (!styles) return {};
  const editorStyles = getEditorStyles(styles.default);
  const customStyles = getCustomStyles(styles.default);
  return {
    ...editorStyles,
    ...customStyles,
  };
}
