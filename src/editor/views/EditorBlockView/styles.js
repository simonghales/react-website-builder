// @flow

import { css } from 'emotion';
import spacing from '../../../styles/config/spacing';
import {
  editViewContainer,
  editViewHeader,
  editViewHeaderDetails,
  editViewHeaderTitleWrapper,
} from '../../../styles/shared/editView';

const containerClass = css`
  ${editViewContainer};
`;

const headerClass = css`
  ${editViewHeader};
`;

const detailsClass = css`
  ${editViewHeaderDetails};
`;

const titleWrapperClass = css`
  ${editViewHeaderTitleWrapper};
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
  overflow: hidden;
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
