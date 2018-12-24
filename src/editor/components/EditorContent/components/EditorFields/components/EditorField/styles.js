// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';
import { fieldInactive, fieldLabel } from '../../../../../../../styles/typography';

const classNames = {
  editorField: 'editorField',
};

const containerClass = css``;

const labelClass = css`
  ${fieldLabel};
  display: flex;
  align-items: center;
`;

const labelInactiveClass = css`
  ${fieldInactive};
`;

const inputContainerClass = css``;

const linkedHeaderClass = css`
  display: flex;
  align-items: center;
  margin-left: 4px;
  color: ${colors.lightFaint};
  cursor: pointer;
  opacity: 0;

  .${classNames.editorField}:hover & {
    opacity: 1;
  }

  &:hover {
    color: ${colors.lightMid};
  }
`;

const linkedHeaderActiveClass = css`
  color: ${colors.lightMid};
  opacity: 1;

  &:hover {
    color: ${colors.light};
  }
`;

const linkedHeaderIconClass = css`
  margin-right: 4px;
  svg {
    display: block;
  }
`;

const linkedHeaderIconActiveClass = css`
  color: ${colors.light};
`;

const headerClass = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const deleteOptionClass = css`
  ${fieldLabel};
  color: ${colors.lightMid};
  cursor: pointer;

  &:hover {
    color: ${colors.light};
  }
`;

export default {
  classNames,
  containerClass,
  labelClass,
  labelInactiveClass,
  inputContainerClass,
  linkedHeaderClass,
  linkedHeaderActiveClass,
  linkedHeaderIconClass,
  linkedHeaderIconActiveClass,
  headerClass,
  deleteOptionClass,
};
