// @flow

import { css } from 'emotion';

const containerClass = css`
  width: 100%;
  height: 100%;
  position: relative;
`;

const iframeClass = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default {
  containerClass,
  iframeClass,
};
