// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import spacing from 'styles/config/spacing';
import { inputReset } from '../../../../../../styles/inputs';

const containerClass = css`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 5px;
    box-shadow: 0 10px 10px #04060b66;
  }
`;

const contentClass = css`
  width: 100%;
  height: 100%;
  background-color: ${colors.blackInactiveBlue};
  border: 2px solid ${colors.brightBlue};
  border-radius: 3px;
  position: relative;
`;

const saturationContainerClass = css`
  width: 100%;
  height: 150px;
  background-color: black;
  position: relative;
`;

const bottomClass = css`
  padding: ${spacing.tiny}px;
`;

const colorOptionsClass = css`
  display: flex;
  align-items: center;
`;

const colorPreviewClass = css`
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 3px;
  margin-right: 6px;
`;

const slidersWrapperClass = css`
  flex: 1;
`;

const sliderClass = css`
  height: 16px;
  position: relative;
  background-color: #909090;
  margin: 6px 0;
`;

const valueWrapperClass = css`
  margin-top: 4px;
`;

const valueInputClass = css`
  ${inputReset};
  background-color: white;
  font-size: 14px;
  padding: 4px;
  color: black;
  text-align: center;
  border-radius: 3px;
`;

export default {
  containerClass,
  contentClass,
  saturationContainerClass,
  bottomClass,
  colorOptionsClass,
  colorPreviewClass,
  slidersWrapperClass,
  sliderClass,
  valueWrapperClass,
  valueInputClass,
};
