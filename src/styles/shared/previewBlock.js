// @flow
import { css } from 'emotion';
import colors from '../config/colors';
import fontWeights from '../config/fontWeights';

export const blockPreviewColors = {
  bg: colors.blackInactiveBlue,
  activeBg: colors.blackBlue,
  inactiveBg: '#131723',
  barHighlight: colors.brightBlue,
  barDim: '#3f4962',
  bar: '#768099',
};

export const previewBlockBody = css`
  padding: 5px 5px 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: ${colors.lightMid};

  &:hover {
    color: ${colors.light};
  }
`;

export const previewBlockInactiveBorder = css`
  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 3px;
    height: 100%;
    background-color: ${blockPreviewColors.barDim};
    visibility: hidden;
  }

  &::after {
    background-color: ${blockPreviewColors.bar};
    //height: 50%;
    transform: translateY(-100%);

    transition: transform 200ms ease-out, height 200ms ease;
  }

  &:hover {
    background: linear-gradient(to right, ${blockPreviewColors.activeBg}, #141924);
    box-shadow: inset -1px 0 #0000004d;

    &::before,
    &::after {
      visibility: visible;
    }

    &::after {
      height: 100%;
      transform: translateY(0);
    }
  }
`;

export const previewBlockSelected = css`
  background: ${blockPreviewColors.activeBg};
  color: ${colors.light};

  &::after {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 3px;
    background-color: ${blockPreviewColors.barHighlight};
  }

  &:hover {
    background: ${blockPreviewColors.activeBg};
  }
`;

export const previewBlockLabel = css`
  font-size: 12px;
  opacity: 0.5;
`;

export const previewBlockTitle = css`
  font-size: 14px;
  font-weight: ${fontWeights.medium};
`;

export const previewBlockIcon = css`
  margin-left: 5px;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 3px;
  color: rgba(195, 217, 255, 0.5);
  opacity: 0.5;

  &:hover {
    background-color: rgba(136, 170, 255, 0.1);
    opacity: 1;
  }

  svg {
    display: block;
  }
`;
