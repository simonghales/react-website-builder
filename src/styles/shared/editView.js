// @flow
import { css } from 'emotion';
import spacing from '../config/spacing';

export const editViewContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const editViewHeader = css`
  margin-top: ${spacing.medium}px;
  margin-bottom: ${spacing.medium}px;
  padding: 0 ${spacing.medium}px;
`;

export const editViewHeaderDetails = css`
  display: flex;
  align-items: center;
  min-height: 24px;
`;

export const editViewHeaderTitleWrapper = css`
  display: flex;
  align-items: center;
  margin-top: 5px;
  min-height: 30px;
`;

export const editViewHeaderButton = css`
  margin-right: 5px;

  &:last-of-type {
    margin-right: 10px;
  }
`;

export const editViewMain = css`
  flex: 1;
  overflow: hidden;
`;
