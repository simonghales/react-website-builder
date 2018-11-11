// @flow

import type { StylePropModel } from './models';

const fontFamily: StylePropModel = {
  label: 'font-family',
  cssKey: 'fontFamily',
  type: 'fontFamily',
  defaultValue: '',
};

const fontSize: StylePropModel = {
  label: 'font-size',
  cssKey: 'fontSize',
  type: 'fontSize',
  defaultValue: '',
};

const color: StylePropModel = {
  label: 'color',
  cssKey: 'color',
  type: 'color',
  defaultValue: '',
};

const fontWeight: StylePropModel = {
  label: 'font-weight',
  cssKey: 'fontWeight',
  type: 'fontWeight',
  defaultValue: '',
};

const fontStyle: StylePropModel = {
  label: 'font-style',
  cssKey: 'fontStyle',
  type: 'fontStyle',
  defaultValue: '',
};

const lineHeight: StylePropModel = {
  label: 'line-height',
  cssKey: 'lineHeight',
  type: 'lineHeight',
  defaultValue: '',
};

const textAlign: StylePropModel = {
  label: 'text-align',
  cssKey: 'textAlign',
  type: 'textAlign',
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
};
