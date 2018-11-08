// @flow

import { css } from 'emotion';
import { transparentize } from 'polished';
import colors from '../../../../../styles/utils/colors';

const containerClass = css`
  display: flex;
  border-bottom: 2px solid ${transparentize(0.85, colors.light)};
`;

export default {
  containerClass,
};
