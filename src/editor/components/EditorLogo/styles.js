// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import fontFamilies from '../../../styles/config/fontFamilies';
import fontWeights from '../../../styles/config/fontWeights';

const containerClass = css`
  ${fontFamilies.roboto};
  font-weight: ${fontWeights.bold};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #727f9366;
  //box-shadow: 0 0 1px #ffffff1a;
  cursor: pointer;

  &:hover {
    color: ${colors.light};
  }
`;

export default {
  containerClass,
};
