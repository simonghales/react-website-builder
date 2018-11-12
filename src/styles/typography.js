// @flow

import { css } from 'emotion';
import transparentize from 'polished/lib/color/transparentize';
import fontSizes from './config/fontSizes';
import fontWeights from './config/fontWeights';
import colors from './config/colors';

const getFontSize = (font: number) => `${font}px`;

export const smallFont = css`
  font-size: ${getFontSize(fontSizes.small)};
`;

export const smallHeading = css`
  ${smallFont};
  color: ${colors.lightFaint};
  font-weight: ${fontWeights.bold};
`;

export const smallPlusFont = css`
  font-size: ${getFontSize(fontSizes.smallPlus)};
`;

export const smallPlusText = css`
  ${smallPlusFont};
  color: ${transparentize(0.3, colors.light)};
  font-weight: ${fontWeights.medium};
`;

export const mediumFont = css`
  font-size: ${getFontSize(fontSizes.medium)};
`;

export const mediumHeading = css`
  ${mediumFont};
  color: ${colors.light};
  font-weight: ${fontWeights.bold};
`;

export const mediumLargeFont = css`
  font-size: ${getFontSize(fontSizes.mediumLarge)};
`;

export const mediumLargeHeading = css`
  ${mediumLargeFont};
  color: ${colors.light};
  font-weight: ${fontWeights.medium};
`;

export const tinyFont = css`
  font-size: ${getFontSize(fontSizes.tiny)};
  line-height: 1;
`;

export const tinyLabel = css`
  ${tinyFont};
  color: ${transparentize(0.3, colors.light)};
`;
