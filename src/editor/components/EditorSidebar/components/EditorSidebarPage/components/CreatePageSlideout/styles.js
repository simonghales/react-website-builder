// @flow
import { css } from 'emotion';
import spacing from 'styles/config/spacing';
import {
  slideoutBodyClass,
  slideoutContainer,
  slideoutHeaderClass,
} from '../../../../../../../styles/shared/slideout';
import { fieldInactive, fieldLabel } from '../../../../../../../styles/typography';

const containerClass = css`
  ${slideoutContainer};
`;

const headerClass = css`
  ${slideoutHeaderClass};
`;

const bodyClass = css`
  ${slideoutBodyClass};
  display: flex;
  flex-direction: column;
`;

const formClass = css`
  flex: 1;
`;

const formFieldClass = css`
  padding: 0 ${spacing.tiny}px;
  &:not(:first-of-type) {
    margin-top: ${spacing.tiny}px;
  }
`;

const fieldLabelClass = css`
  ${fieldLabel};
`;

const fieldLabelInactiveClass = css`
  ${fieldInactive};
`;

const fieldErrorMessage = css`
  margin-top: ${spacing.micro}px;
`;

export default {
  containerClass,
  headerClass,
  bodyClass,
  formClass,
  formFieldClass,
  fieldLabelClass,
  fieldLabelInactiveClass,
  fieldErrorMessage,
};
