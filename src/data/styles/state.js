// @flow

import type { BlockModifierStyles, BlockStyles, MappedStyleModel } from './models';
import type { DataBlockModel } from '../blocks/models';

function getModifierStyleValue(cssKey: string, modifierStyles: BlockModifierStyles): string {
  const { editor } = modifierStyles;
  if (editor && editor[cssKey]) {
    return editor[cssKey];
  }
  return '';
}

export function getStyleValue(cssKey: string, blockStyles: BlockStyles): string {
  const { styles } = blockStyles;
  return getModifierStyleValue(cssKey, styles.default);
}

function getEditorStyles(styles: BlockModifierStyles): {} {
  const { editor = {} } = styles;
  return editor;
}

function getCustomStyles(styles: BlockModifierStyles): {} {
  const { custom = {} } = styles;
  return custom;
}

export function getMappedBlockStyles(block: DataBlockModel): MappedStyleModel {
  const { rawStyles } = block;
  if (!rawStyles) {
    return {};
  }
  const { styles } = rawStyles;
  if (!styles) return {};
  const editorStyles = getEditorStyles(styles.default);
  const customStyles = getCustomStyles(styles.default);
  return {
    ...editorStyles,
    ...customStyles,
  };
}

export function getBlockStyles(block: DataBlockModel): BlockStyles {
  const { rawStyles } = block;
  return rawStyles;
}
