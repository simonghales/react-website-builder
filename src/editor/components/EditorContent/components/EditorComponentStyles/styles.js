// @flow

import { css } from 'emotion';
import { sectionHeading, smallPlusText } from '../../../../../styles/typography';
import colors from '../../../../../styles/config/colors';
import { squareButton } from '../../../../../styles/buttons';

const containerClass = css`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-column-gap: 10px;
  height: 100%;
  grid-auto-rows: minmax(200px, auto);
  overflow-y: hidden;
`;

const mainClass = css`
  grid-column-start: 1;
  grid-column-end: 5;
  height: 100%;
  overflow-y: auto;
`;

const sideClass = css`
  grid-column-start: 6;
  grid-column-end: 9;
  height: 100%;
  overflow-y: auto;
`;

const sectionClass = css`
  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const sectionHeaderClass = css`
  display: flex;
  margin-bottom: 5px;
  justify-content: space-between;
  align-items: center;
`;

const sectionHeaderTitleClass = css`
  ${sectionHeading};
`;

const sctionHeaderAddClass = css`
  ${squareButton};
  width: 24px;
  height: 24px;
`;

const sectionBodyClass = css``;

const sectionBodyGridClass = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  margin-top: -10px;
`;

export default {
  containerClass,
  mainClass,
  sideClass,
  sectionClass,
  sectionHeaderClass,
  sectionHeaderTitleClass,
  sctionHeaderAddClass,
  sectionBodyClass,
  sectionBodyGridClass,
};
