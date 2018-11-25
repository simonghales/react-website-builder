// @flow
import { css } from 'emotion';
import { mediumLargeHeading } from '../../../styles/typography';

const containerClass = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const headerClass = css`
  ${mediumLargeHeading};
  padding: 10px;
`;

const listClass = css`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
`;

export default {
  containerClass,
  headerClass,
  listClass,
};
