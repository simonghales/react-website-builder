// @flow
import { css } from 'emotion';
import colors from './config/colors';

export const inputReset = css`
  font: inherit;
  border: 0;
  background: none;
  border-radius: 0;
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const inputStylesConfig = {
  color: colors.light,
  darkColor: colors.blackInactiveBlue,
  fontSize: 14,
  minHeight: 41,
  backgroundColor: '#343b48',
  backgroundHoverColor: '#3a4250',
  borderFocusedColor: colors.brightBlue,
};

export const textInputStyles = css`
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
