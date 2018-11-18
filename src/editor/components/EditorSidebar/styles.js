// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import zindexes from '../../../styles/config/zindexes';

const wrapperClass = css`
  height: 100%;
  position: relative;
`;

const containerClass = css`
  width: 100%;
  height: 100%;
  background-color: ${colors.mediumBlue};
  position: relative;
  z-index: ${zindexes.sidebar};
  transition: box-shadow 250ms ease;
`;

const containerRaisedClass = css`
  box-shadow: 0px 4px 2px rgba(11, 17, 31, 0.29);
`;

const slideoutClass = css`
  position: absolute;
  top: 0;
  left: 100%;
  bottom: 0;
  width: 200px;
  background-color: ${colors.blackInactiveBlue};
  z-index: ${zindexes.sidebarSlideout};
`;

export default {
  wrapperClass,
  containerClass,
  containerRaisedClass,
  slideoutClass,
};
