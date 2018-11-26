// @flow
import {css} from 'emotion';
import colors from 'styles/config/colors';

const containerClass = css`
`;

const labelClass = css`
    color: ${colors.light};
    font-size: 12px;
    padding-left: 3px;
    margin-bottom: 5px;
`;

const labelInactiveClass = css`
    color: ${colors.lightFaint};
`;

const inputContainerClass = css``;

export default {
  containerClass,
  labelClass,
  labelInactiveClass,
  inputContainerClass,
}
