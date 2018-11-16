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

export type BlockModifierStyles = {
  editor?: {
    [string]: string,
  },
  custom?: {
    [string]: string,
  },
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
