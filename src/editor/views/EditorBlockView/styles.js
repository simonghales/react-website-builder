// @flow

import { css } from 'emotion';
import spacing from '../../../styles/utils/spacing';

const containerClass = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const headerClass = css`
  margin-top: ${spacing.mediumPlus}px;
  margin-bottom: ${spacing.mediumPlus}px;
  padding: 0 ${spacing.medium}px;
`;

const mainClass = css`
  display: flex;
  flex: 1;
`;

const editorClass = css`
  height: 100%;
  width: 700px;
`;

const previewClass = css`
  height: 100%;
  flex: 1;
`;

export default {
  containerClass,
  headerClass,
  mainClass,
  editorClass,
  previewClass,
};
