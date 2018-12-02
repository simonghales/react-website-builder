// @flow

import type { StylePropModel } from '../../../../../data/styles/models';
import styleProps from '../../../../../data/styles/styleProps';

type StyleModel = {
  columns: number,
  styleProp: StylePropModel,
};

export type StyleSectionModel = {
  title: string,
  styles: Array<StyleModel>,
};

const fontFamilyStyle: StyleModel = {
  columns: 3,
  styleProp: styleProps.fontFamily,
};
const fontSizeStyle: StyleModel = {
  columns: 1,
  styleProp: styleProps.fontSize,
};
const fontWeightStyle: StyleModel = {
  columns: 3,
  styleProp: styleProps.fontWeight,
};
const colorStyle: StyleModel = {
  columns: 1,
  styleProp: styleProps.color,
};
const fontStyleStyle: StyleModel = {
  columns: 3,
  styleProp: styleProps.fontStyle,
};
const lineHeightStyle: StyleModel = {
  columns: 1,
  styleProp: styleProps.lineHeight,
};
const textAlignStyle: StyleModel = {
  columns: 4,
  styleProp: styleProps.textAlign,
};
const backgroundStyle: StyleModel = {
  columns: 4,
  styleProp: styleProps.background,
};
const borderStyle: StyleModel = {
  columns: 4,
  styleProp: styleProps.border,
};
const boxShadowStyle: StyleModel = {
  columns: 4,
  styleProp: styleProps.boxShadow,
};
const widthStyle: StyleModel = {
  columns: 2,
  styleProp: styleProps.width,
};
const maxWidthStyle: StyleModel = {
  columns: 1,
  styleProp: styleProps.maxWidth,
};
const minWidthStyle: StyleModel = {
  columns: 1,
  styleProp: styleProps.minWidth,
};
const heightStyle: StyleModel = {
  columns: 2,
  styleProp: styleProps.height,
};
const maxHeightStyle: StyleModel = {
  columns: 1,
  styleProp: styleProps.maxHeight,
};
const minHeightStyle: StyleModel = {
  columns: 1,
  styleProp: styleProps.minHeight,
};

export const textStyleSection: StyleSectionModel = {
  title: 'Text',
  styles: [
    fontFamilyStyle,
    fontSizeStyle,
    fontWeightStyle,
    colorStyle,
    fontStyleStyle,
    lineHeightStyle,
    textAlignStyle,
  ],
};

export const appearanceStyleSection: StyleSectionModel = {
  title: 'Appearance',
  styles: [backgroundStyle, borderStyle, boxShadowStyle],
};

export const dimensionsStyleSection: StyleSectionModel = {
  title: 'Dimensions',
  styles: [widthStyle, maxWidthStyle, minWidthStyle, heightStyle, maxHeightStyle, minHeightStyle],
};
