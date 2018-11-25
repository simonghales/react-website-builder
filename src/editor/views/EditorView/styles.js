// @flow

import { css } from 'emotion';
import colors from '../../../styles/config/colors';

const containerClass = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: ${colors.white};
`;

const headerClass = css`
  height: 80px;
`;

const mainClass = css`
  display: flex;
  height: 100%;
`;

const editorClass = css`
  width: 200px;
  height: 100%;
`;

const previewClass = css`
  flex: 1;
  height: 100%;
  background: linear-gradient(to bottom right, ${colors.blackBlue}, #1c2433);
  overflow: hidden;
  position: relative;
`;

const previewContentClass = css`
  width: 100%;
  height: 100%;
  transition: opacity 300ms ease;
`;

const previewContentDisabledClass = css`
  opacity: 0.2;
  pointer-events: none;
`;

const previewBlockerClass = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default {
  containerClass,
  headerClass,
  mainClass,
  editorClass,
  previewClass,
  previewContentClass,
  previewContentDisabledClass,
  previewBlockerClass,
};
