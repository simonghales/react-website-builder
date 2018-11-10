// @flow

import { css } from 'emotion';
import spacing from '../../../styles/config/spacing';

const containerClass = css`
  height: 100%;
`;

const mainClass = css`
  margin-top: ${spacing.smallPlus}px;
`;

const addPropClass = css`
  margin-bottom: ${spacing.medium}px;
`;

export default {
  containerClass,
  mainClass,
  addPropClass,
};
