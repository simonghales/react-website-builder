// @flow
import { css } from 'emotion';
import zindexes from '../../../../../../../../../styles/config/zindexes';
import colors from '../../../../../../../../../styles/config/colors';

const layout = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 300px;
`;

const containerClass = css`
  ${layout};
  z-index: ${zindexes.mixinDropdown};
`;

const contentClass = css`
  ${layout};
  background-color: ${colors.blackBlue};
  overflow-y: auto;
  border-radius: 0 0 3px 3px;
`;

export default {
  containerClass,
  contentClass,
};
