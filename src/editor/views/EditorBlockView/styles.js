// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import spacing from '../../../styles/config/spacing';

const containerClass = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const headerClass = css`
  margin-top: ${spacing.medium}px;
  margin-bottom: ${spacing.medium}px;
  padding: 0 ${spacing.medium}px;
`;

const detailsClass = css`
  display: flex;
  align-items: center;
  min-height: 24px;
`;

const titleWrapperClass = css`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  min-height: 30px;
`;

const buttonClass = css`
  margin-right: 5px;

  &:last-of-type {
    margin-right: 10px;
  }
`;

const mainClass = css`
  display: flex;
  flex: 1;
`;

const editorClass = css`
  height: 100%;
  width: 700px;
  padding: 0 ${spacing.medium}px;
`;

const previewClass = css`
  height: 100%;
  flex: 1;
  padding-right: ${spacing.medium}px;
`;

export default {
  containerClass,
  headerClass,
  detailsClass,
  titleWrapperClass,
  buttonClass,
  mainClass,
  editorClass,
  previewClass,
};
