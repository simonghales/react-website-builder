// @flow
import { css } from 'emotion';
import colors from '../../../../../styles/config/colors';
import zindexes from '../../../../../styles/config/zindexes';
import { smallHeading } from '../../../../../styles/typography';
import { squareButton } from '../../../../../styles/buttons';
import {
  sidebarContainer,
  sidebarTopOption,
  sidebarSlideoutTransitionClassName,
  sidebarSlideout,
  sidebarContentContainer,
  sidebarContentContainerRaised,
} from '../../../../../styles/shared/sidebar';

const classNames = {
  slideoutTransition: sidebarSlideoutTransitionClassName,
};

const wrapperClass = css`
  ${sidebarContainer};
`;

const containerClass = css`
  ${sidebarContentContainer};
`;

const containerRaisedClass = css`
  ${sidebarContentContainerRaised};
`;

const slideoutClass = css`
  ${sidebarSlideout};
`;

const addBlockSectionClass = css`
  ${sidebarTopOption};
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
