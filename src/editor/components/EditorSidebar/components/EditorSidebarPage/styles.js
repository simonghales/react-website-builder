// @flow
import { css } from 'emotion';
import {
  sidebarContainer,
  sidebarContentContainer,
  sidebarContentContainerRaised,
  sidebarTopOption,
} from '../../../../../styles/shared/sidebar';

const containerClass = css`
  ${sidebarContainer};
`;

const contentClass = css`
  ${sidebarContentContainer};
`;

const contentRaisedClass = css`
  ${sidebarContentContainerRaised};
`;

const addPageSectionClass = css`
  ${sidebarTopOption};
`;

const addPageSectionTextClass = css`
  flex: 1;
`;

export default {
  containerClass,
  contentClass,
  contentRaisedClass,
  addPageSectionClass,
  addPageSectionTextClass,
};
