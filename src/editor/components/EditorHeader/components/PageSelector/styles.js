// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import spacing from 'styles/config/spacing';
import fontWeights from '../../../../../styles/config/fontWeights';

const containerClass = css`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 ${spacing.smallPlus}px;
  width: 100%;
  max-width: 320px;
  border-left: 1px solid #10131a;
  border-right: 1px solid #10131a;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const iconClass = css`
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.05);
  margin-right: ${spacing.tiny}px;
`;

const nameClass = css`
  color: ${colors.lightSlight};
  font-size: 14px;
  font-weight: ${fontWeights.medium};
`;

const pathClass = css`
  color: ${colors.lightMid};
  font-size: 12px;
`;

export default {
  containerClass,
  iconClass,
  nameClass,
  pathClass,
};
