// @flow
import { css } from 'emotion';

const containerClass = css`
  .nestable .nestable-list {
    padding-left: 10px;
  }

  .nestable-item,
  .nestable-item-copy {
    margin: 0;
  }

  .nestable-item .nestable-list,
  .nestable-item-copy .nestable-list {
    margin: 0;
  }
`;

export default {
  containerClass,
};
