// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import { tinyFont } from '../../../styles/typography';

const textClass = css`
  ${tinyFont};
  color: ${colors.warningRed};
`;

export default {
  textClass,
};
