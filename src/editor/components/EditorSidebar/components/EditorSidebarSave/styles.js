// @flow
import { css } from 'emotion';
import colors from '../../../../../styles/config/colors';

const buttonClass = css`
  background: linear-gradient(to bottom, ${colors.blackInactiveBlue}, ${colors.darkBlue});
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

export default {
  buttonClass,
};
