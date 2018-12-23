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

const solidButtonBackground = css`
  background: linear-gradient(to bottom, ${colors.blackInactiveBlue}, ${colors.darkBlue});
`;

export const solidButton = css`
  ${solidButtonBackground};
  border-top: 3px solid ${colors.brightBlue};
  height: 60px;
  padding: 10px 10px 12px 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  text-transform: uppercase;
  color: ${colors.brightBlue};

  &:hover {
    background: ${colors.brightBlue};
    color: ${colors.white};
  }
`;

export const solidButtonDisabled = css`
  cursor: default;
  color: ${colors.lightFaint};
  border-color: ${colors.lightFaint};

  &:hover {
    ${solidButtonBackground};
    color: ${colors.lightFaint};
  }
`;
