// @flow

import { css } from 'emotion';
import { smallPlusText } from '../../styles/typography';

const containerClass = css`
  display: flex;
`;

const labelClass = css`
  ${smallPlusText};
  width: 170px;
  margin-right: 20px;
  line-height: 38px;
`;

const valueClass = css`
  flex: 1;
`;

export default {
  containerClass,
  labelClass,
  valueClass,
};
