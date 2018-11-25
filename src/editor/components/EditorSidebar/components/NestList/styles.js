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

  .nestable-drag-layer .nestable-item-copy {
    background-color: ${colors.blackInactiveBlue};

    .block {
      background-color: ${colors.blackInactiveBlue};
    }
  }

  .nestable-drag-layer
    .nestable-item-copy.${classNames.nestItemSelected},
    .nestable-item.is-hovered,
  .${classNames.nestItemSelected} > .nestable-list {
    background-color: ${colors.blackBlue};

    .block {
      background-color: ${colors.blackBlue};
    }
  }

  .${classNames.nestItemSelected} > .nestable-list {
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

  .nestable-item.is-dragging:before {
    background-color: ${colors.blackBlue};
    border: 2px solid ${colors.light};
  }
`;

export default {
  containerClass,
  classNames,
};
