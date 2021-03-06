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
  padding-left: 3px;
`;

const inactiveLabelTextClass = css`
  opacity: 0.35;
`;

const inputContainerClass = css`
  margin-top: 5px;
`;

export default {
  containerClass,
  labelClass,
  labelTextClass,
  inactiveLabelTextClass,
  inputContainerClass,
};
