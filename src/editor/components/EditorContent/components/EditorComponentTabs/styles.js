// @flow

import { css } from 'emotion';
import { transparentize } from 'polished';
import colors from '../../../../../styles/config/colors';
import { mediumHeading } from '../../../../../styles/typography';

const containerClass = css`
  display: flex;
  border-bottom: 2px solid ${transparentize(0.85, colors.light)};
`;

const tabClass = css`
  ${mediumHeading};
  padding-right: 20px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  opacity: 0.3;
  cursor: pointer;

  svg {
    margin-right: 4px;
  }
`;

const activeTabClass = css`
  opacity: 1;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background-color: ${transparentize(0.7, colors.light)};
  }
`;

export default {
  containerClass,
  tabClass,
  activeTabClass,
};
