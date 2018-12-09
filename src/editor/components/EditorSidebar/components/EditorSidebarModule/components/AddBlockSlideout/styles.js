// @flow

import { css } from 'emotion';
import colors from '../../../../../../../styles/config/colors';
import { mediumLargeHeading, sectionHeading } from '../../../../../../../styles/typography';
import fontWeights from '../../../../../../../styles/config/fontWeights';
import {
  addlistBlockClass,
  addListClassNames,
  addListIconClass,
  addListLabelClass,
} from '../../../../../../../styles/shared/addList';

const containerClass = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.darkBlue};
  border-top: 1px solid ${colors.blackBlue};
  border-left: 1px solid ${colors.blackBlue};
`;

const headerClass = css`
  ${mediumLargeHeading};
  padding: 10px;
`;

const bodyClass = css`
  flex: 1;
`;

const groupClass = css`
  &:not(:first-of-type) {
    margin-top: 10px;
  }
`;

const groupHeadingClass = css`
  ${sectionHeading};
  padding: 0 10px;
  margin-bottom: 5px;
`;

const groupBlocksClass = css``;

const classNames = {
  addBlockBlock: addListClassNames.addListBlock,
};

const blockClass = css`
  ${addlistBlockClass};
`;

const disabledBlockClass = css`
  opacity: 0.5;
  pointer-events: none;
`;

const blockIconClass = css`
  ${addListIconClass};
`;

const blockLabelClass = css`
  ${addListLabelClass};
`;

export default {
  classNames,
  containerClass,
  headerClass,
  bodyClass,
  groupClass,
  groupHeadingClass,
  groupBlocksClass,
  blockClass,
  disabledBlockClass,
  blockIconClass,
  blockLabelClass,
};
