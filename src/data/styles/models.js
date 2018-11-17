// @flow

export const blockStylesModifiers = {
  default: 'default',
};

export type StylePropModel = {
  label: string,
  cssKey: string,
  type: string,
  defaultValue: string,
};

export type BlockRawStyles = {
  [string]: string,
};

export type BlockModifierStyles = {
  editor?: BlockRawStyles,
  custom?: BlockRawStyles,
};

export type StylesModel = {
  [string]: BlockModifierStyles,
};

export type BlockStyles = {
  styles: StylesModel,
};

export type MappedStyleModel = {
  [string]: string,
};

export type InheritedMixinDetails = {
  key: string,
  name: string,
};

export type EditorMappedStyle = {
  value: string,
  inheritedValue: string,
  inheritedMixins: Array<InheritedMixinDetails>,
  setInBlock?: boolean,
};

export type EditorMappedStyles = {
  [string]: EditorMappedStyle,
};

export type EditorMappedModifierStyles = {
  editor?: {},
  custom?: {},
};

export type EditorMappedStylesContainer = {
  [string]: EditorMappedModifierStyles,
};
