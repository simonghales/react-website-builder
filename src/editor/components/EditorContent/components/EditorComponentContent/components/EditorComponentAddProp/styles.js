// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import { fieldLabel } from '../../../../../../../styles/typography';

const addContainer = css`
  display: flex;
  align-items: flex-end;
`;

const columnClass = css`
  margin: 0 4px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const columnLabelClass = css`
  ${fieldLabel};
`;

const columnValidLabelClass = css`
  //color: ${colors.brightBlue};
`;

const columnInvalidLabelClass = css`
  color: ${colors.warningRed};
`;

const columnNameClass = css`
  width: 300px;
`;

const columnTypeClass = css`
  flex: 1;
`;

const cancelButtonClass = css`
  ${fieldLabel};
  cursor: pointer;
  justify-self: flex-end;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

export default {
  addContainer,
  columnClass,
  columnLabelClass,
  columnValidLabelClass,
  columnInvalidLabelClass,
  columnNameClass,
  columnTypeClass,
  cancelButtonClass,
};
