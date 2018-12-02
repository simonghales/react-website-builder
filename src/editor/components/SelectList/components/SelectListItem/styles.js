// @flow
import { css } from 'emotion';
import {
  addlistBlockClass,
  addListClassNames,
  addListIconClass,
  addListLabelClass,
} from '../../../../../styles/shared/addList';

const classNames = {
  item: addListClassNames.addListBlock,
};

const itemClass = css`
  ${addlistBlockClass};
`;

const disabledItemClass = css`
  opacity: 0.5;
  pointer-events: none;
`;

const iconClass = css`
  ${addListIconClass};
`;

const labelClass = css`
  ${addListLabelClass};
`;

export default {
  classNames,
  itemClass,
  disabledItemClass,
  iconClass,
  labelClass,
};
