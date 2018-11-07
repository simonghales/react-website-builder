// @flow

import { css } from 'emotion';

const containerClass = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
`;

const editorClass = css`
  width: 400px;
  height: 100%;
`;

const previewClass = css`
  flex: 1;
  height: 100%;
`;

export default {
  containerClass,
  editorClass,
  previewClass,
};
