// @flow

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

export type BlockStyles = {
  key: string,
  styles: {
    [string]: BlockModifierStyles,
  },
};

export type AllBlockStyles = {
  [string]: BlockStyles,
};

export type MappedStyleModel = {
  [string]: string | MappedStyleModel,
};
