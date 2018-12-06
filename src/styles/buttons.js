// @flow
import { css } from 'emotion';
import colors from './config/colors';

export const buttonReset = css`
  font: inherit;
  border: 0;
  padding: 0;
  background: none;
  border-radius: 0;
  cursor: pointer;
`;

export const squareButton = css`
    ${buttonReset};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.blackBlue};
  border-radius: 3px;
  color: ${colors.light};
  cursor: pointer;

  &:hover {
    background-color: ${colors.blackBlueLight};
    //color: ${colors.blackBlue};
  }
`;
