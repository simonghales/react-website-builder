// @flow

import { css } from 'emotion';
import { smallPlusText } from '../../../../../styles/typography';

const containerClass = css`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-column-gap: 10px;
`;

const mainClass = css`
  grid-column-start: 1;
  grid-column-end: 5;
`;

const sideClass = css`
  grid-column-start: 6;
  grid-column-end: 9;
`;

const sectionClass = css`
  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const sectionHeaderClass = css`
  display: flex;
  margin-bottom: 5px;
`;

const sectionHeaderTitleClass = css`
  ${smallPlusText};
  text-transform: uppercase;
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
  sectionBodyClass,
  sectionBodyGridClass,
};
