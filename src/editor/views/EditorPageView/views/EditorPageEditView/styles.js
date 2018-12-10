// @flow
import { css } from 'emotion';
import spacing from 'styles/config/spacing';
import {
  editViewContainer,
  editViewHeader,
  editViewHeaderDetails,
  editViewHeaderTitleWrapper,
  editViewMain,
} from '../../../../../styles/shared/editView';

const containerClass = css`
  ${editViewContainer};
`;

const headerClass = css`
  ${editViewHeader};
`;

const headerDetailsClass = css`
  ${editViewHeaderDetails};
`;

const headerTitleWrapperClass = css`
  ${editViewHeaderTitleWrapper};
`;

const mainClass = css`
  ${editViewMain};
  padding: 0 ${spacing.medium}px;
`;

export default {
  containerClass,
  headerClass,
  headerDetailsClass,
  headerTitleWrapperClass,
  mainClass,
};
