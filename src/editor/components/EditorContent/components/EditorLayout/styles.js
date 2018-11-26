// @flow
import { css } from 'emotion';
import spacing from 'styles/config/spacing';

const gridClass = css`
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  grid-column-gap: ${spacing.tiny}px;
`;

export default {
  gridClass,
};
