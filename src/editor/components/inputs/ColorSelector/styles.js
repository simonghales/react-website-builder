// @flow
import { css } from 'emotion';
import { inputStylesConfig } from '../TextInput/styles';
import zindexes from '../../../../styles/config/zindexes';

const wrapperClass = css`
  position: relative;
`;

const containerFocusedClass = css`
  border-color: ${inputStylesConfig.borderFocusedColor};
`;

const containerClass = css`
  height: ${inputStylesConfig.minHeight}px;
  border: 2px solid ${inputStylesConfig.backgroundColor};
  border-radius: 3px;
  cursor: pointer;

  &:focus {
    ${containerFocusedClass};
  }
`;

const menuClass = css`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  min-width: 220px;
  z-index: ${zindexes.colorMenu};
  margin-top: 4px;
`;

export default {
  wrapperClass,
  containerClass,
  containerFocusedClass,
  menuClass,
};
