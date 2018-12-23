// @flow
import { css } from 'emotion';
import spacing from 'styles/config/spacing';
import colors from 'styles/config/colors';
import { editViewGrid } from '../../../../styles/shared/editView';
import { fieldLabel } from '../../../../styles/typography';

export const resultsContainerStyles = css`
  border: 2px solid ${colors.lightFaintest};
  padding: ${spacing.tiny}px;
  border-radius: 3px;
  margin-bottom: ${spacing.tiny}px;
`;

const containerClass = css`
  ${editViewGrid};
`;

const labelClass = css`
  ${fieldLabel};
`;

export default {
  containerClass,
  labelClass,
};
