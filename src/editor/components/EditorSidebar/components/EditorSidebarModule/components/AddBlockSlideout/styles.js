// @flow

import { css } from 'emotion';
import { sectionHeading } from '../../../../../../../styles/typography';
import {
  addlistBlockClass,
  addListClassNames,
  addListIconClass,
  addListLabelClass,
} from '../../../../../../../styles/shared/addList';
import {
  slideoutBodyClass,
  slideoutContainer,
  slideoutHeaderClass,
} from '../../../../../../../styles/shared/slideout';

const containerClass = css`
  ${slideoutContainer};
`;

const headerClass = css`
  ${slideoutHeaderClass};
`;

const bodyClass = css`
  ${slideoutBodyClass};
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
