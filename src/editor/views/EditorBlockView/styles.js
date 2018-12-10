// @flow

import { css } from 'emotion';
import spacing from '../../../styles/config/spacing';
import {
  editViewContainer,
  editViewHeader,
  editViewHeaderButton,
  editViewHeaderDetails,
  editViewHeaderTitleWrapper,
  editViewMain,
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
  ${editViewHeaderButton};
`;

const mainClass = css`
  ${editViewMain};
  display: flex;
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
