// @flow
import { css } from 'emotion';
import { transparentize } from 'polished';
import colors from 'styles/config/colors';

// const bgColor = transparentize(0.05, colors.blackBlue);
const bgColor = colors.blackBlueLight;

const tooltipClass = css`
  background-color: ${bgColor} !important;
  opacity: 1 !important;

  &::after {
    border-top-color: ${bgColor} !important;
  }
`;

export default {
  tooltipClass,
};
