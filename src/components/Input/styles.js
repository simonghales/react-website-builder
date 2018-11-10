// @flow
import { transparentize } from 'polished';
import { css } from 'emotion';
import colors from '../../styles/config/colors';

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
  background: ${transparentize(0.65, '#000626')};
  height: 40px;
  border-radius: 3px;
  color: ${colors.light};
  padding: 0 10px;

  &:focus {
    outline: none;
    background: ${transparentize(0.45, '#000626')};
  }
`;

export default {
  inputClass,
  darkInputClass,
};
