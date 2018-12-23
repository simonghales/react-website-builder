// @flow
import { css } from 'emotion';
import colors from '../../styles/config/colors';
import fontWeights from '../../styles/config/fontWeights';
import { buttonReset, solidButton, solidButtonDisabled } from '../../styles/buttons';

const classNames = {
  buttonDisabled: 'buttonDisabled',
};

const buttonClass = css`
  ${buttonReset};
`;

const buttonSlimClass = css`
  color: ${colors.lightMid};
  font-size: 14px;
  font-weight: ${fontWeights.medium};
  padding: 5px 8px;
  background-color: ${colors.darkInput};
  border-radius: 3px;

  &:hover {
    color: ${colors.light};
  }
`;

const buttonSlimIconClass = css`
  ${buttonSlimClass};
  display: flex;
  align-items: center;
  padding-right: 10px;

  svg {
    margin-right: 3px;
  }
`;

const buttonSolidClass = css`
  ${solidButton};
  display: block;
  text-align: center;
  width: 100%;

  &.${classNames.buttonDisabled} {
    ${solidButtonDisabled};
  }
`;

export default {
  classNames,
  buttonClass,
  buttonSlimClass,
  buttonSlimIconClass,
  buttonSolidClass,
};
