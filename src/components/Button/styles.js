// @flow
import { transparentize } from 'polished';
import { css } from 'emotion';
import fontWeights from '../../styles/config/fontWeights';

const buttonReset = css`
  font: inherit;
  border: 0;
  padding: 0;
  background: none;
  border-radius: 0;
  cursor: pointer;
`;

const buttonClass = css`
  ${buttonReset};
`;

const buttonSlimClass = css`
  color: ${transparentize(0.5, '#B7C4E8')};
  font-weight: ${fontWeights.bold};
  font-size: 15px;
  text-transform: uppercase;
  padding: 2px 45px 3px 45px;
  background: ${transparentize(0.975, '#B7C4E8')};
  border: 2px solid ${transparentize(0.5, '#B7C4E8')};
  border-radius: 3px;
`;

export default {
  buttonClass,
  buttonSlimClass,
};
