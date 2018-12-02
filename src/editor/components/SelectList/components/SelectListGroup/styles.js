// @flow
import { css } from 'emotion';
import { sectionHeading } from '../../../../../styles/typography';

const containerClass = css`
  &:not(:first-of-type) {
    margin-top: 10px;
  }
`;

const headingClass = css`
  ${sectionHeading};
  padding: 0 10px;
  margin-bottom: 5px;
`;

export default {
  containerClass,
  headingClass,
};
