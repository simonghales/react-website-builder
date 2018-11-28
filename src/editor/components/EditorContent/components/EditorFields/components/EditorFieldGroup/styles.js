// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import spacing from 'styles/config/spacing';

const fieldGroupClass = css`
  margin-bottom: ${spacing.smallPlus}px;

  &:last-child {
    margin-bottom: ${spacing.medium * 2}px;
  }
`;

const labelClass = css`
  color: ${colors.lightFaint};
  font-size: 15px;
  font-weight: 500;
  margin-bottom: ${spacing.tiny / 2}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const bodyClass = css`
  position: relative;
`;

const gridClass = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  margin-top: -${spacing.tiny}px;
`;

export default {
  fieldGroupClass,
  labelClass,
  gridClass,
  bodyClass,
};
