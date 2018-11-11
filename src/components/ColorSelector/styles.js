// @flow

import { css } from 'emotion';
import measurements from '../../styles/config/measurements';
import colors from '../../styles/config/colors';

const containerClass = css`
  width: 100%;
  height: ${measurements.inputHeight}px;
  border-radius: 3px;
  border: 2px solid ${colors.darkInput};
`;

export default {
  containerClass,
};
