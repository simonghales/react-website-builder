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
  display: flex;
  flex-direction: column;
`;

const headerClass = css`
  height: 64px;
  display: flex;
  background-color: #06080e;
`;

const sidebarWidth = 200;

const headerLogoClass = css`
  width: ${sidebarWidth}px;
`;

const headerRemainingClass = css`
  flex: 1;
`;

const mainClass = css`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const editorClass = css`
  width: ${sidebarWidth}px;
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
  headerLogoClass,
  headerRemainingClass,
  mainClass,
  editorClass,
  previewClass,
  previewContentClass,
  previewContentDisabledClass,
  previewBlockerClass,
};
