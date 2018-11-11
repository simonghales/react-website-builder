// @flow

import { css } from 'emotion';
import { tinyLabel } from '../../styles/typography';

const containerClass = css`
  margin-top: 10px;
`;

const labelClass = css`
  display: block;
`;

const labelTextClass = css`
  ${tinyLabel};
`;

const inputContainerClass = css``;

export default {
  containerClass,
  labelClass,
  labelTextClass,
  inputContainerClass,
};
