// @flow

import { css } from 'emotion';
import colors from '../config/colors';
import fontWeights from '../config/fontWeights';

export const addListClassNames = {
  addListBlock: 'addListBlock',
};

export const addlistBlockClass = css`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${colors.brightBlue};
  }
`;

export const addListIconClass = css`
  width: 24px;
  height: 24px;
  background-color: ${colors.lightFaintest};
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  color: ${colors.lightMid};

  .${addListClassNames.addListBlock}:hover & {
    color: ${colors.white};
    background-color: #136ada;
  }
`;

export const addListLabelClass = css`
  flex: 1;
  color: ${colors.lightSlight};
  font-size: 14px;
  font-weight: ${fontWeights.medium};

  .${addListClassNames.addListBlock}:hover & {
    color: ${colors.white};
  }
`;
