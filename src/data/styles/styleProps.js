// @flow

import type { StylePropModel } from './models';

export const styleInputTypes = {
  fontFamily: 'fontFamily',
  color: 'color',
  fontWeight: 'fontWeight',
  fontStyle: 'fontStyle',
  textAlign: 'textAlign',
  plain: 'plain',
};

export type StyleInputTypes = $Keys<typeof styleInputTypes>;

const fontFamily: StylePropModel = {
  label: 'font-family',
  cssKey: 'fontFamily',
  type: styleInputTypes.fontFamily,
  defaultValue: '',
};

const fontSize: StylePropModel = {
  label: 'font-size',
  cssKey: 'fontSize',
  type: styleInputTypes.plain,
  defaultValue: '',
};

const color: StylePropModel = {
  label: 'color',
  cssKey: 'color',
  type: styleInputTypes.color,
  defaultValue: '',
};

const fontWeight: StylePropModel = {
  label: 'font-weight',
  cssKey: 'fontWeight',
  type: styleInputTypes.fontWeight,
  defaultValue: '',
};

const fontStyle: StylePropModel = {
  label: 'font-style',
  cssKey: 'fontStyle',
  type: styleInputTypes.fontStyle,
  defaultValue: '',
};

const lineHeight: StylePropModel = {
  label: 'line-height',
  cssKey: 'lineHeight',
  type: styleInputTypes.plain,
  defaultValue: '',
};

const textAlign: StylePropModel = {
  label: 'text-align',
  cssKey: 'textAlign',
  type: styleInputTypes.textAlign,
  defaultValue: '',
};

const width: StylePropModel = {
  label: 'width',
  cssKey: 'width',
  type: styleInputTypes.plain,
  defaultValue: '',
};

const maxWidth: StylePropModel = {
  label: 'max-width',
  cssKey: 'maxWidth',
  type: styleInputTypes.plain,
  defaultValue: '',
};

const minWidth: StylePropModel = {
  label: 'min-width',
  cssKey: 'minWidth',
  type: styleInputTypes.plain,
  defaultValue: '',
};

const height: StylePropModel = {
  label: 'height',
  cssKey: 'height',
  type: styleInputTypes.plain,
  defaultValue: '',
};

const maxHeight: StylePropModel = {
  label: 'max-height',
  cssKey: 'maxHeight',
  type: styleInputTypes.plain,
  defaultValue: '',
};

const minHeight: StylePropModel = {
  label: 'min-height',
  cssKey: 'minHeight',
  type: styleInputTypes.plain,
  defaultValue: '',
};

const background: StylePropModel = {
  label: 'background',
  cssKey: 'background',
  type: styleInputTypes.plain,
  defaultValue: '',
};

const border: StylePropModel = {
  label: 'border',
  cssKey: 'border',
  type: styleInputTypes.plain,
  defaultValue: '',
};

const boxShadow: StylePropModel = {
  label: 'box-shadow',
  cssKey: 'boxShadow',
  type: styleInputTypes.plain,
  defaultValue: '',
};

export default {
  fontFamily,
  fontSize,
  color,
  fontWeight,
  fontStyle,
  lineHeight,
  textAlign,
  width,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  background,
  border,
  boxShadow,
};
