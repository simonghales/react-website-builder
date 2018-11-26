// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import spacing from 'styles/config/spacing';

const fieldGroupClass = css`
  &:not(:first-of-type) {
    margin-top: ${spacing.smallPlus}px;
  }
`;

const labelClass = css`
  color: ${colors.lightFaint};
  font-size: 15px;
  font-weight: 500;
  margin-bottom: ${spacing.tiny / 2}px;
`;

const fieldContainerClass = css`
  &:not(:first-of-type) {
    margin-top: ${spacing.tiny}px;
  }
`;

export default {
  fieldGroupClass,
  labelClass,
  fieldContainerClass,
};
