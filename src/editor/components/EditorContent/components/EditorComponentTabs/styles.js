// @flow

import { css } from 'emotion';
import { transparentize } from 'polished';
import colors from '../../../../../styles/config/colors';
import { mediumHeading, mediumTab } from '../../../../../styles/typography';
import { blockPreviewColors } from '../../../../../styles/shared/previewBlock';

const containerClass = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid ${transparentize(0.85, colors.light)};
`;

const mainNavClass = css`
  display: flex;
`;

const tabClass = css`
  ${mediumTab};
  color: ${colors.light};
  padding-right: 20px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  opacity: 0.3;
  cursor: pointer;
  position: relative;

  svg {
    margin-right: 4px;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    visibility: hidden;
  }

  &::before {
  }

  &::after {
    background-color: #707d9e;
    width: 0;
    transition: width 200ms ease-out;
  }

  &:hover {
    opacity: 1;

    &::before,
    &::after {
      visibility: visible;
    }

    &::after {
      width: 100%;
    }
  }
`;

const activeTabClass = css`
  opacity: 1;

  &::before {
    background-color: ${blockPreviewColors.barHighlight};
    visibility: visible;
  }

  &::after {
    visibility: hidden;
  }

  &:hover {
    &::after {
      visibility: hidden;
    }
  }
`;

const extraNavClass = css`
  display: flex;
`;

export default {
  containerClass,
  mainNavClass,
  tabClass,
  activeTabClass,
  extraNavClass,
};
