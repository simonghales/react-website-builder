// @flow
import { transparentize } from 'polished';

const white = '#FFFFFF';
const light = '#eaf0ff';
const lightClose = transparentize(0.1, light);
const lightSlight = transparentize(0.25, light);
const lightMid = transparentize(0.5, light);
const lightFaint = transparentize(0.7, light);
const lightFaintest = transparentize(0.9, light);
const blackBlue = '#20242d';
const blackBlueLight = 'rgb(47, 51, 61)';
const blackInactiveBlue = '#04060b';
const blackInactiveBlueMid = transparentize(0.25, blackBlue);
const darkBlue = '#080B12';
const mediumBlue = '#152036';
const siteBackground = darkBlue;
const faintInput = transparentize(0.75, '#000626');
const darkInput = `rgba(83, 87, 96, 0.3)`;
const darkInputFocused = `rgba(73, 77, 87, 0.3)`;
const brightBlue = '#2383ff';

// #373e4b

export default {
  white,
  light,
  lightClose,
  lightSlight,
  lightMid,
  lightFaint,
  lightFaintest,
  blackBlue,
  blackBlueLight,
  blackInactiveBlue,
  blackInactiveBlueMid,
  darkBlue,
  mediumBlue,
  siteBackground,
  faintInput,
  darkInput,
  darkInputFocused,
  brightBlue,
};
