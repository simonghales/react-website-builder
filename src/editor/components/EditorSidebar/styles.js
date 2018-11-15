// @flow

import { css } from 'emotion';
import { transparentize } from 'polished';
import colors from '../../../styles/config/colors';
import spacing from '../../../styles/config/spacing';
import fontWeights from '../../../styles/config/fontWeights';

const containerClass = css`
  width: 100%;
  height: 100%;
  background-color: ${colors.mediumBlue};
  padding-top: ${spacing.medium}px;
`;

const classNames = {
  block: 'block',
  selectedBlock: 'selectedBlock',
};

const activeBgColor = colors.blackBlue;

const blockPreviewClass = css`
  //background: ${transparentize(0.7, colors.blackBlue)};
  background: ${colors.blackInactiveBlue};
  position: relative;
  //transition: background 150ms ease;
`;

const rootBlockPreviewClass = css``;

const selectedBlockClass = css`
  background: ${activeBgColor};

  &::after {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 3px;
    background-color: ${colors.light};
  }

  .${classNames.block} {
    background: ${activeBgColor};
  }
`;

const blockPreviewTextClass = css`
  padding: 5px 10px 5px 10px;
  opacity: 0.5;
  cursor: pointer;

  .nestable-drag-layer .nestable-item-copy &,
  &:hover,
  .${classNames.selectedBlock} > & {
    opacity: 1;
  }
`;

const blockPreviewTypeClass = css`
  font-size: 12px;
  font-weight: ${fontWeights.bold};
  color: ${transparentize(0.5, colors.light)};
`;

const blockPreviewLabelClass = css`
  font-size: 14px;
  font-weight: ${fontWeights.medium};
  color: ${colors.light};
`;

const blockPreviewChildrenClass = css`
  padding: 5px 0;
`;

export default {
  containerClass,
  blockPreviewClass,
  rootBlockPreviewClass,
  selectedBlockClass,
  blockPreviewTextClass,
  blockPreviewTypeClass,
  blockPreviewLabelClass,
  blockPreviewChildrenClass,
  classNames,
};
