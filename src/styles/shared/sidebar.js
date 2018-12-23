// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import zindexes from 'styles/config/zindexes';
import {
  transitionEnter,
  transitionEnterActive,
  transitionExit,
  transitionExitActive,
} from '../utils/transitions';

export const sidebarSlideoutTransitionClassName = 'slideoutTransition';

export const sidebarContainer = css`
  height: 100%;
  position: relative;
`;

export const sidebarContentContainer = css`
  width: 100%;
  height: 100%;
  background-color: ${colors.darkBlue};
  position: relative;
  z-index: ${zindexes.sidebar};
  transition: box-shadow 250ms ease;
  display: flex;
  flex-direction: column;
`;

export const sidebarContentContainerRaised = css`
  box-shadow: 0px 4px 2px rgba(11, 17, 31, 0.29);
`;

export const sidebarTopOption = css`
  display: flex;
  align-items: center;
  padding: 5px;
`;

export const sidebarSlideOutTransitions = {
  enter: transitionEnter(sidebarSlideoutTransitionClassName),
  enterActive: transitionEnterActive(sidebarSlideoutTransitionClassName),
  exit: transitionExit(sidebarSlideoutTransitionClassName),
  exitActive: transitionExitActive(sidebarSlideoutTransitionClassName),
};

export const sidebarSlideout = css`
  position: absolute;
  top: 0;
  left: 100%;
  bottom: 0;
  width: 200px;
  background-color: ${colors.blackInactiveBlue};
  z-index: ${zindexes.sidebarSlideout};

  &.${sidebarSlideOutTransitions.enter} {
    transform: translateX(-100%);
  }

  &.${sidebarSlideOutTransitions.enterActive} {
    transform: translateX(0);
    transition: all 300ms ease;
  }

  &.${sidebarSlideOutTransitions.exit} {
    transform: translateX(0);
  }

  &.${sidebarSlideOutTransitions.exitActive} {
    transform: translateX(-100%);
    transition: all 300ms ease;
  }
`;
