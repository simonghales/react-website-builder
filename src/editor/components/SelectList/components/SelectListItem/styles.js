// @flow
import { css } from 'emotion';
import colors from '../../../../../styles/config/colors';
import fontWeights from '../../../../../styles/config/fontWeights';

const classNames = {
  item: 'item',
};

const itemClass = css`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${colors.light};
  }
`;

const disabledItemClass = css`
  opacity: 0.5;
  pointer-events: none;
`;

const iconClass = css`
  width: 24px;
  height: 24px;
  background-color: ${colors.lightFaintest};
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  color: ${colors.lightMid};

  .${classNames.item}:hover & {
    color: ${colors.light};
    background-color: ${colors.blackInactiveBlue};
  }
`;

const labelClass = css`
  flex: 1;
  color: ${colors.lightSlight};
  font-size: 14px;
  font-weight: ${fontWeights.medium};

  .${classNames.item}:hover & {
    color: ${colors.blackBlue};
  }
`;

export default {
  classNames,
  itemClass,
  disabledItemClass,
  iconClass,
  labelClass,
};
