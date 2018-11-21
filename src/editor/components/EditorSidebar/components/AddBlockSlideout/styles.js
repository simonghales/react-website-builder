// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import { mediumLargeHeading, sectionHeading } from '../../../../../styles/typography';
import fontWeights from '../../../../../styles/config/fontWeights';

const containerClass = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.blackBlue};
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
  addBlockBlock: 'addBlockBlock',
};

const blockClass = css`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${colors.light};
  }
`;

const disabledBlockClass = css`
  opacity: 0.5;
  pointer-events: none;
`;

const blockIconClass = css`
  width: 24px;
  height: 24px;
  background-color: ${colors.lightFaintest};
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  color: ${colors.lightMid};

  .${classNames.addBlockBlock}:hover & {
    color: ${colors.light};
    background-color: ${colors.blackInactiveBlue};
  }
`;

const blockLabelClass = css`
  flex: 1;
  color: ${colors.lightSlight};
  font-size: 14px;
  font-weight: ${fontWeights.medium};

  .${classNames.addBlockBlock}:hover & {
    color: ${colors.blackBlue};
  }
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
