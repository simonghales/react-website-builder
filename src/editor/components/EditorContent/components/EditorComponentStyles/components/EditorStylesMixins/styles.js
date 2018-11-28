// @flow
import { css } from 'emotion';
import colors from '../../../../../../../styles/config/colors';
import { squareButton } from '../../../../../../../styles/buttons';

const classNames = {
  mixin: 'mixin',
};

const addButtonClass = css`
  ${squareButton};
  width: 24px;
  height: 24px;
`;

const mixinClass = css`
  display: flex;
  align-items: center;

  &:not(:first-of-type) {
    margin-top: 5px;
  }
`;

const mixinIconClass = css`
  width: 30px;
  height: 30px;
  background-color: ${colors.faintInput};
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  color: ${colors.lightFaint};
`;

const mixinTextClass = css`
  flex: 1;
  font-size: 13px;
  color: ${colors.lightClose};
`;

const mixinLabelClass = css`
  color: ${colors.lightFaint};
  font-size: 11px;
`;

const mixinRemoveClass = css`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  cursor: pointer;
  border-radius: 3px;
  color: ${colors.lightFaint};
  opacity: 0;

  .${classNames.mixin}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: ${colors.light};
    color: ${colors.blackBlue};
  }
`;

export default {
  classNames,
  addButtonClass,
  mixinClass,
  mixinIconClass,
  mixinTextClass,
  mixinLabelClass,
  mixinRemoveClass,
};
