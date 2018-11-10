// @flow

import { css } from 'emotion';
import spacing from '../../../../../styles/config/spacing';

const containerClass = css``;

const fieldClass = css`
  &:not(:first-child) {
    margin-top: ${spacing.smallPlus}px;
  }
`;

export default {
  containerClass,
  fieldClass,
};
