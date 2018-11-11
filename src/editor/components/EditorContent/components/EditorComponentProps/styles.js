// @flow

import { css } from 'emotion';
import spacing from '../../../../../styles/config/spacing';

const containerClass = css``;

const addPropClass = css`
  margin-bottom: ${spacing.medium}px;
`;

const fieldClass = css`
  &:not(:first-child) {
    margin-top: ${spacing.smallPlus}px;
  }
`;

export default {
  containerClass,
  fieldClass,
  addPropClass,
};
