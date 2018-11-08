// @flow

import { css } from 'emotion';
import spacing from '../../../styles/utils/spacing';

const containerClass = css`
  height: 100%;
  padding: 0 ${spacing.medium}px;
`;

const iframeWrapperClass = css`
  font-size: 0;
  padding-bottom: 65%;
  position: relative;
  width: 100%;
  margin-top: 60px;
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
  iframeWrapperClass,
  iframeClass,
};
