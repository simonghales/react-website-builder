// @flow

import type {
  BlockModifierStyles,
  BlockRawStyles,
  BlockStyles,
  EditorMappedModifierStyles,
  EditorMappedStyle,
  EditorMappedStyles,
  EditorMappedStylesContainer,
  InheritedMixinDetails,
  MappedStyleModel,
  StylesModel,
} from './models';
import type {
  DataBlockMixinModel,
  DataBlockMixinStylesModel,
  DataBlockModel,
} from '../blocks/models';
import { blockStylesModifiers } from './models';
import type { MixinModel, MixinsModel } from '../mixins/models';
import { getMixinFromMixins } from '../mixins/state';

function getModifierStyleValue(
  cssKey: string,
  modifierStyles: EditorMappedModifierStyles
): EditorMappedStyle {
  const { editor } = modifierStyles;
  if (editor && editor[cssKey]) {
    return editor[cssKey];
  }
  return {
    value: '',
    inheritedValue: '',
    inheritedMixins: [],
  };
}

export function getStyleValue(
  cssKey: string,
  styles: EditorMappedStylesContainer
): EditorMappedStyle {
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

function getStylesViaModifier(modifier: string, styles: StylesModel): BlockModifierStyles {
  const modifierStyles = styles[modifier];
  return modifierStyles || {};
}

function getMixinDetails(mixin: MixinModel): InheritedMixinDetails {
  return {
    key: mixin.key,
    name: mixin.name,
  };
}

function getEditorMappedStyles(
  previousStyles: EditorMappedStyles,
  styles: BlockRawStyles,
  mixin?: MixinModel
): EditorMappedStyles {
  const isMixin = !!mixin;
  const mappedStyles: EditorMappedStyles = {
    ...previousStyles,
  };
  Object.keys(styles).forEach(styleKey => {
    const styleValue = styles[styleKey];
    if (styleValue !== '') {
      if (mappedStyles[styleKey]) {
        const previousValue = mappedStyles[styleKey];
        const updatedValue = {
          ...previousValue,
          value: styleValue,
          inheritedValue: !isMixin ? previousValue.inheritedValue : styleValue,
          inheritedMixins: mixin
            ? previousValue.inheritedMixins.concat([getMixinDetails(mixin)])
            : previousValue.inheritedMixins,
          setInBlock: !mixin,
        };
        mappedStyles[styleKey] = updatedValue;
      } else {
        mappedStyles[styleKey] = {
          value: styleValue,
          inheritedValue: !isMixin ? '' : styleValue,
          inheritedMixins: mixin ? [getMixinDetails(mixin)] : [],
          setInBlock: !mixin,
        };
      }
    }
  });

  return mappedStyles;
}

export function getEditorMappedModifierStyles(
  modifier: string,
  blockStyles: StylesModel,
  blockMixins: Array<MixinModel>
): EditorMappedModifierStyles {
  let editorStyles: EditorMappedStyles = {};
  let customStyles: EditorMappedStyles = {};

  blockMixins.forEach(mixin => {
    const mixinStyles = mixin.styles;
    const modifierStyles = getStylesViaModifier(modifier, mixinStyles);
    const { editor = {}, custom = {} } = modifierStyles;
    editorStyles = getEditorMappedStyles(editorStyles, editor, mixin);
    customStyles = getEditorMappedStyles(customStyles, custom, mixin);
  });

  const modifierStyles = getStylesViaModifier(modifier, blockStyles);
  const { editor = {}, custom = {} } = modifierStyles;
  editorStyles = getEditorMappedStyles(editorStyles, editor);
  customStyles = getEditorMappedStyles(customStyles, custom);

  return {
    editor: editorStyles,
    custom: customStyles,
  };
}

export function getEditorMappedBlockStyles(
  blockStyles: StylesModel,
  blockMixins: Array<MixinModel>
): EditorMappedStylesContainer {
  return {
    [blockStylesModifiers.default]: getEditorMappedModifierStyles(
      blockStylesModifiers.default,
      blockStyles,
      blockMixins
    ),
  };
}
