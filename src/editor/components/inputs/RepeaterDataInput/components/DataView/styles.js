// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import spacing from 'styles/config/spacing';
import { resultsContainerStyles } from '../../styles';
import { fieldLabel } from '../../../../../../styles/typography';

const dataContainerClass = css`
  ${resultsContainerStyles};
  height: 400px;
  overflow-y: auto;
`;

const dataValueContainerClass = css`
  background-color: rgba(0, 0, 0, 0.15);
  padding: ${spacing.tiny}px;
  margin-bottom: ${spacing.tiny}px;

  &:not(:first-of-type) {
    margin-top: ${spacing.tiny}px;
  }
`;

const dataValueFieldClass = css`
  &:not(:first-of-type) {
    margin-top: ${spacing.tiny}px;
  }
`;

const dataValueFieldLabelClass = css`
  ${fieldLabel};
`;

const dataValueOptionsClass = css`
  margin-top: ${spacing.tiny}px;
  padding-top: ${spacing.tiny}px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${colors.lightFaintest};
`;

const dataValueOptionsDirectionsClass = css`
  display: flex;
`;

const dataValueOptionsButtonClass = css`
  margin: 0 ${spacing.micro / 2}px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const addItemContainerClass = css`
  display: flex;
  justify-content: center;

  &:last-child {
    margin-bottom: ${spacing.tiny}px;
  }
`;

export default {
  dataContainerClass,
  dataValueContainerClass,
  dataValueFieldClass,
  dataValueFieldLabelClass,
  dataValueOptionsClass,
  dataValueOptionsDirectionsClass,
  dataValueOptionsButtonClass,
  addItemContainerClass,
};
