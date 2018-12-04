// @flow
import { css } from 'emotion';
import spacing from 'styles/config/spacing';

const containerClass = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const addPropContainerClass = css`
  margin-bottom: ${spacing.tiny}px;
`;

const fieldsContainerClass = css`
  flex: 1;
`;

export default {
  containerClass,
  addPropContainerClass,
  fieldsContainerClass,
};
