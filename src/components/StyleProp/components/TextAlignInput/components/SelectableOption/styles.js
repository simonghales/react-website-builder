// @flow

import { css } from 'emotion';
import colors from '../../../../../../styles/config/colors';
import measurements from '../../../../../../styles/config/measurements';

const containerClass = css`
  height: ${measurements.inputHeight}px;
  background-color: ${colors.darkInput};
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.lightMid};
`;

const notSelectedClass = css`
  &:focus,
  &:hover {
    background-color: ${colors.darkInputFocused};
  }
`;

const selectedClass = css`
  background-color: ${colors.light};
  color: ${colors.darkInputFocused};

  &:focus,
  &:hover {
    background-color: ${colors.lightClose};
  }
`;

export default {
  containerClass,
  notSelectedClass,
  selectedClass,
};
