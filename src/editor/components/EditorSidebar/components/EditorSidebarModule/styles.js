// @flow
import { css } from 'emotion';
import colors from '../../../../../styles/config/colors';
import zindexes from '../../../../../styles/config/zindexes';
import {
  transitionEnter,
  transitionEnterActive,
  transitionExit,
  transitionExitActive,
} from '../../../../../styles/utils/transitions';
import { smallHeading } from '../../../../../styles/typography';
import { squareButton } from '../../../../../styles/buttons';

const classNames = {
  slideoutTransition: 'slideoutTransition',
};

const wrapperClass = css`
  height: 100%;
  position: relative;
`;

const containerClass = css`
  width: 100%;
  height: 100%;
  background-color: ${colors.darkBlue};
  position: relative;
  z-index: ${zindexes.sidebar};
  transition: box-shadow 250ms ease;
  display: flex;
  flex-direction: column;
`;

const containerRaisedClass = css`
  box-shadow: 0px 4px 2px rgba(11, 17, 31, 0.29);
`;

const slideOutTransitions = {
  enter: transitionEnter(classNames.slideoutTransition),
  enterActive: transitionEnterActive(classNames.slideoutTransition),
  exit: transitionExit(classNames.slideoutTransition),
  exitActive: transitionExitActive(classNames.slideoutTransition),
};

const slideoutClass = css`
  position: absolute;
  top: 0;
  left: 100%;
  bottom: 0;
  width: 200px;
  background-color: ${colors.blackInactiveBlue};
  z-index: ${zindexes.sidebarSlideout};

  &.${slideOutTransitions.enter} {
    transform: translateX(-100%);
  }

  &.${slideOutTransitions.enterActive} {
    transform: translateX(0);
    transition: all 300ms ease;
  }

  &.${slideOutTransitions.exit} {
    transform: translateX(0);
  }

  &.${slideOutTransitions.exitActive} {
    transform: translateX(-100%);
    transition: all 300ms ease;
  }
`;

const addBlockSectionClass = css`
  display: flex;
  align-items: center;
  padding: 5px;
`;

const returnToWrapperClass = css`
  flex: 1;
`;

const returnToClass = css`
  display: flex;
  align-items: center;
  ${smallHeading};
  cursor: pointer;

  &:hover {
    color: ${colors.light};
  }

  svg {
    margin-right: 3px;
  }
`;

const addBlockToggleClass = css`
  ${squareButton};
`;

const blocksSectionClass = css`
  flex: 1;
`;

export default {
  classNames,
  wrapperClass,
  containerClass,
  containerRaisedClass,
  slideoutClass,
  addBlockSectionClass,
  addBlockToggleClass,
  returnToWrapperClass,
  returnToClass,
  blocksSectionClass,
};
