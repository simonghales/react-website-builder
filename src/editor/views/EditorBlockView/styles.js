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

const titleWrapperClass = css`
  display: flex;
  align-items: center;
  margin-top: 5px;
  min-height: 30px;
`;

const removeButtonClass = css`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  background-color: ${colors.darkInput};
  color: ${colors.lightMid};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.light};
    color: ${colors.blackBlue};
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
  titleWrapperClass,
  removeButtonClass,
  mainClass,
  editorClass,
  previewClass,
};
