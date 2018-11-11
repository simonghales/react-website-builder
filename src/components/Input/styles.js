// @flow
import { css } from 'emotion';
import colors from '../../styles/config/colors';
import measurements from '../../styles/config/measurements';

const inputReset = css`
  font: inherit;
  border: 0;
  background: none;
  border-radius: 0;
  display: block;
  width: 100%;
`;

const inputClass = css`
  ${inputReset};
`;

const darkInputClass = css`
  background: ${colors.darkInput};
  height: ${measurements.inputHeight}px;
  border-radius: 3px;
  color: ${colors.light};
  padding: 0 10px;

  &:focus {
    outline: none;
    background: ${colors.darkInputFocused};
  }
`;

export default {
  inputClass,
  darkInputClass,
};
