// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';

export const inputStyleTypes = {
  dark: 'dark',
};

type InputStyleTypes = $Keys<typeof inputStyleTypes>;

type Props = {
  styleType: InputStyleTypes,
};

const Input = ({ styleType }: Props) => (
  <input
    className={cx(styles.inputClass, {
      [styles.darkInputClass]: styleType === inputStyleTypes.dark,
    })}
    type="text"
  />
);

export default Input;
