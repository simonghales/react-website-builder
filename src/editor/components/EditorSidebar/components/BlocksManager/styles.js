// @flow

import { css } from 'emotion';
import { transparentize } from 'polished';
import colors from '../../../../../styles/config/colors';
import fontWeights from '../../../../../styles/config/fontWeights';

const containerClass = css`
  width: 100%;
  height: 100%;
`;

const classNames = {
  block: 'block',
  selectedBlock: 'selectedBlock',
  notSelectedBlock: 'notSelectedBlock',
};

export const blockPreviewColors = {
  bg: colors.blackInactiveBlue,
  activeBg: colors.blackBlue,
  inactiveBg: '#131723',
  barHighlight: colors.brightBlue,
  barDim: '#3f4962',
  bar: '#768099',
}

const notSelectedState = `&.${classNames.notSelectedBlock}`;

const activeBgColor = colors.blackBlue;

const blockPreviewClass = css`
  background: ${blockPreviewColors.bg};
  position: relative;
`;

const rootBlockPreviewClass = css``;

const selectedBlockClass = css`
  background: ${blockPreviewColors.activeBg};

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

  &:hover,
  .${classNames.block} {
    background: ${blockPreviewColors.activeBg};
  }
`;
const blockPreviewInfoClass = css`
  padding: 5px 5px 5px 10px;
  //opacity: 0.5;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: ${transparentize(0.5,colors.light)};

  .nestable-drag-layer .nestable-item-copy &,
  &:hover,
  .${classNames.selectedBlock} > & {
  color: ${colors.light};
  }
  
  .${classNames.selectedBlock} &, .nestItemSelected & {
  
    ${notSelectedState} {
        background-color: ${blockPreviewColors.inactiveBg};
        box-shadow: inset -1px 0 #0000004d;
    }
  
  }
  
  ${notSelectedState} {
    
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
      background: linear-gradient(to right, ${activeBgColor}, #141924);
      box-shadow: inset -1px 0 #0000004d;
      
      &::before,
      &::after
      {
          visibility: visible;
      }
      
      &::after
      {
      height: 100%;
      transform: translateY(0);
      }
      
    }
  }
  
 
  
`;

const blockPreviewTextClass = css`
  flex: 1;
`;

const blockPreviewTypeClass = css`
  font-size: 12px;
  //font-weight: ${fontWeights.bold};
  opacity: 0.5;
`;

const blockPreviewLabelClass = css`
  font-size: 14px;
  font-weight: ${fontWeights.medium};
`;

const blockPreviewEnterClass = css`
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
  }
`;

const blockPreviewEnterSelectedClass = css`
opacity: 1;
`;

const blockPreviewChildrenClass = css`
  //padding-bottom: 5px;
`;

export default {
  containerClass,
  blockPreviewClass,
  rootBlockPreviewClass,
  selectedBlockClass,
  blockPreviewInfoClass,
  blockPreviewTextClass,
  blockPreviewTypeClass,
  blockPreviewLabelClass,
  blockPreviewEnterClass,
  blockPreviewEnterSelectedClass,
  blockPreviewChildrenClass,
  classNames,
};
