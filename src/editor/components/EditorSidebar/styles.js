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

const activeBgColor = `rgba(16, 25, 44, 1)`;

const blockPreviewClass = css`
  background: rgba(16, 25, 44, 0.5);
  padding: 5px 0 5px 10px;
  position: relative;
  cursor: pointer;
  transition: background 150ms ease;

  &:hover {
    background: ${activeBgColor};
  }
`;

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
`;

const blockPreviewTextClass = css`
  padding-right: 10px;
  opacity: 0.5;

  .${classNames.block}:hover > &,
  .${classNames.selectedBlock} > & {
    opacity: 1;
  }
`;

const blockPreviewTypeClass = css`
  font-size: 12px;
  font-weight: ${fontWeights.bold};
  color: ${transparentize(0.6, colors.light)};
`;

const blockPreviewLabelClass = css`
  font-size: 14px;
  font-weight: ${fontWeights.medium};
  color: ${colors.light};
`;

const blockPreviewChildrenClass = css``;

export default {
  containerClass,
  blockPreviewClass,
  selectedBlockClass,
  blockPreviewTextClass,
  blockPreviewTypeClass,
  blockPreviewLabelClass,
  blockPreviewChildrenClass,
  classNames,
};
