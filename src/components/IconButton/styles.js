// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';

const buttonClass = css`
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
    background-color: ${colors.light};
    color: ${colors.blackBlue};
  }
`;

export default {
  buttonClass,
};
