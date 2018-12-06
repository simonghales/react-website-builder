// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import { inputStylesConfig } from '../../editor/components/inputs/TextInput/styles';
import { buttonReset } from '../../styles/buttons';

const classNames = {
  iconButtonHighlighted: 'iconButtonHighlighted',
  iconButtonDisabled: 'iconButtonDisabled',
};

const buttonClass = css`
  ${buttonReset};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.darkInput};
  color: ${colors.lightMid};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    color: ${colors.light};
  }

  &.${classNames.iconButtonDisabled} {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const largeButtonClass = css`
  width: 40px;
  height: 40px;
  background-color: ${inputStylesConfig.backgroundColor};
  border: 2px solid ${inputStylesConfig.backgroundColor};

  &:hover {
    background-color: ${inputStylesConfig.backgroundHoverColor};
    border-color: ${inputStylesConfig.backgroundHoverColor};
  }

  &:focus {
    border-color: ${colors.brightBlue};
  }

  &.${classNames.iconButtonHighlighted} {
    background-color: ${colors.brightBlue};
    border-color: ${colors.brightBlue};
    color: #ffffff;
    opacity: 0.75;

    &:focus,
    &:hover {
      opacity: 1;
    }
  }
`;

export default {
  classNames,
  buttonClass,
  largeButtonClass,
};
