// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import { mediumLargeHeading } from '../typography';

export const slideoutContainer = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  //background-color: ${colors.darkBlue};
  // border-top: 1px solid ${colors.blackBlue};
  //border-left: 1px solid ${colors.blackBlue};
`;

export const slideoutHeaderClass = css`
  ${mediumLargeHeading};
  padding: 10px;
`;

export const slideoutBodyClass = css`
  flex: 1;
`;
