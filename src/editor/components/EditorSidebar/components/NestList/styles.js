// @flow
import { css } from 'emotion';
import colors from '../../../../../styles/config/colors';

const classNames = {
  nestItemSelected: 'nestItemSelected',
};

const containerClass = css`
  .nestable .nestable-list {
    padding-left: 10px;
    position: relative;
  }

  .nestable-item,
  .nestable-item-copy {
    margin: 0;
  }

  .nestable-item .nestable-list,
  .nestable-item-copy .nestable-list {
    margin: 0;
  }

  .${classNames.nestItemSelected} > .nestable-list {
    background-color: ${colors.blackBlue};

    &::after {
      content: '';
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 3px;
      background-color: ${colors.light};
    }
  }
`;

export default {
  containerClass,
  classNames,
};
