// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';

export const buttonTypes = {
  slim: 'slim',
  slimIcon: 'slimIcon',
};

type ButtonTypes = $Keys<typeof buttonTypes>;

type Props = {
  children: any,
  type: ButtonTypes,
};

const Button = ({ children, type }: Props) => (
  <button
    className={cx(styles.buttonClass, {
      [styles.buttonSlimClass]: type === buttonTypes.slim,
      [styles.buttonSlimIconClass]: type === buttonTypes.slimIcon,
    })}
  >
    {children}
  </button>
);

export default Button;
