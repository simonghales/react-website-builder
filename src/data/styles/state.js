// @flow

import type { BlockModifierStyles, BlockStyles, MappedStyleModel, StylesModel } from './models';
import type {
  DataBlockMixinModel,
  DataBlockMixinStylesModel,
  DataBlockModel,
} from '../blocks/models';
import { blockStylesModifiers } from './models';
import type { MixinModel, MixinsModel } from '../mixins/models';
import { getMixinFromMixins } from '../mixins/state';

function getModifierStyleValue(cssKey: string, modifierStyles: BlockModifierStyles): string {
  const { editor } = modifierStyles;
  if (editor && editor[cssKey]) {
    return editor[cssKey];
  }
  return '';
}

export function getStyleValue(cssKey: string, blockStyles: BlockStyles): string {
  const { styles } = blockStyles;
  return getModifierStyleValue(cssKey, styles[blockStylesModifiers.default]);
}

function getValidStyles(styles: { [string]: string }): { [string]: string } {
  const validStyles = {};
  Object.keys(styles).forEach(styleKey => {
    const value = styles[styleKey];
    if (value !== '') {
      validStyles[styleKey] = value;
    }
  });
  return validStyles;
}

function getEditorStyles(styles: BlockModifierStyles): {} {
  const { editor = {} } = styles;
  return getValidStyles(editor);
}

function getCustomStyles(styles: BlockModifierStyles): {} {
  const { custom = {} } = styles;
  return getValidStyles(custom);
}

export function getMappedStyles(styles: StylesModel): MappedStyleModel {
  if (!styles) return {};
  const editorStyles = getEditorStyles(styles[blockStylesModifiers.default]);
  const customStyles = getCustomStyles(styles[blockStylesModifiers.default]);
  return {
    ...editorStyles,
    ...customStyles,
  };
}

function getMappedMixinStyles(mixin: MixinModel): MappedStyleModel {
  const { styles } = mixin;
  return getMappedStyles(styles);
}

export function getMappedMixinsStyles(
  mixinStyles: DataBlockMixinStylesModel,
  mixins: MixinsModel
): Array<MappedStyleModel> {
  return mixinStyles.map((mixinData: DataBlockMixinModel) => {
    const mixin = getMixinFromMixins(mixinData.key, mixins);
    return getMappedMixinStyles(mixin);
  });
}

export function getMappedBlockStyles(block: DataBlockModel, mixins: MixinsModel): MappedStyleModel {
  const { mixinStyles, rawStyles } = block;

  const mappedMixinStyles = mixinStyles ? getMappedMixinsStyles(mixinStyles, mixins) : [];

  const customStyles = rawStyles && rawStyles.styles ? getMappedStyles(rawStyles.styles) : {};

  let mappedStyles = {};

  mappedMixinStyles.forEach((styles: MappedStyleModel) => {
    mappedStyles = {
      ...mappedStyles,
      ...styles,
    };
  });

  return {
    ...mappedStyles,
    ...customStyles,
  };
}

export function getBlockStyles(block: DataBlockModel): BlockStyles {
  const { rawStyles } = block;
  return rawStyles;
}
