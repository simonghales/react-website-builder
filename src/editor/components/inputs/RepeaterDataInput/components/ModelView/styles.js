// @flow
import { css } from 'emotion';
import spacing from 'styles/config/spacing';
import { resultsContainerStyles } from '../../styles';

const containerClass = css``;

const fieldsContainerClass = css`
  ${resultsContainerStyles};
`;

const fieldClass = css`
  display: flex;

  &:not(:first-of-type) {
    margin-top: ${spacing.tiny}px;
  }
`;

const fieldInputClass = css`
  flex: 1;
`;

const fieldColumnClass = css`
  margin: 0 ${spacing.micro}px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export default {
  containerClass,
  fieldsContainerClass,
  fieldClass,
  fieldColumnClass,
  fieldInputClass,
};
