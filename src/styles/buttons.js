// @flow
import { css } from 'emotion';
import colors from './config/colors';

export const squareButton = css`
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
    background-color: ${colors.light};
    color: ${colors.blackBlue};
  }
`;
