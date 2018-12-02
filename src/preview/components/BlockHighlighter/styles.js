// @flow

import { css } from 'emotion';

const blockClass = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  background-color: #2fa7ff80;
  z-index: 999999999;
  border: 2px dotted #ffffff;
`;

export default {
  blockClass,
};
