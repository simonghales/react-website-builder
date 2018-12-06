// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import { inputReset } from '../../../../styles/inputs';

export const inputStylesConfig = {
  color: colors.light,
  darkColor: colors.blackInactiveBlue,
  fontSize: 14,
  minHeight: 41,
  backgroundColor: '#343b48',
  backgroundHoverColor: '#3a4250',
  borderFocusedColor: colors.brightBlue,
};

const inputClass = css`
  ${inputReset};
  background-color: ${inputStylesConfig.backgroundColor};
  border: 2px solid ${inputStylesConfig.backgroundColor};
  border-radius: 3px;
  font-size: ${inputStylesConfig.fontSize}px;
  padding: 9px 5px;
  color: ${inputStylesConfig.color};

  &:hover {
    background-color: ${inputStylesConfig.backgroundHoverColor};
    border-color: ${inputStylesConfig.backgroundHoverColor};
  }

  &:focus {
    background-color: ${inputStylesConfig.backgroundHoverColor};
    border-color: ${inputStylesConfig.borderFocusedColor};
  }
`;

export default {
  inputClass,
};
