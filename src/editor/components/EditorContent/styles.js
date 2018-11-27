// @flow

import { css } from 'emotion';
import spacing from '../../../styles/config/spacing';

const containerClass = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const mainClass = css`
  margin-top: ${spacing.smallPlus}px;
  flex: 1;
  max-height: 100%;
  //overflow: hidden;
  // overflow-y: auto;
  // margin-bottom: ${spacing.mediumPlus}px;
`;

export default {
  containerClass,
  mainClass,
};
