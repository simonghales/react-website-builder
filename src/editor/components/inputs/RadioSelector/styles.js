// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import spacing from 'styles/config/spacing';
import { inputStylesConfig, inputReset } from '../../../../styles/inputs';

const containerClass = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: ${spacing.tiny}px;
`;

const optionWrapperClass = css`
  grid-column: span 1;
`;

const optionClass = css`
  ${inputReset};
  background-color: ${inputStylesConfig.backgroundColor};
  border: 2px solid ${inputStylesConfig.backgroundColor};
  border-radius: 3px;
  cursor: pointer;
  height: ${inputStylesConfig.minHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.lightMid};

  &:hover {
    background-color: ${inputStylesConfig.backgroundHoverColor};
    border-color: ${inputStylesConfig.backgroundHoverColor};
  }

  &:focus {
    background-color: ${inputStylesConfig.backgroundHoverColor};
    border-color: ${inputStylesConfig.borderFocusedColor};
  }
`;

const selectedColor = '#c7cfde';

const selectedOptionClass = css`
  background-color: ${selectedColor};
  border-color: ${selectedColor};
  color: ${inputStylesConfig.darkColor};

  &:hover {
    background-color: ${selectedColor};
    border-color: ${selectedColor};
  }

  &:focus {
    background-color: ${selectedColor};
    border-color: ${inputStylesConfig.borderFocusedColor};
  }
`;

export default {
  containerClass,
  optionWrapperClass,
  optionClass,
  selectedOptionClass,
};
