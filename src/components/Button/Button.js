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
  onClick: () => void,
};

const Button = ({ children, type, onClick }: Props) => (
  <button
    className={cx(styles.buttonClass, {
      [styles.buttonSlimClass]: type === buttonTypes.slim,
      [styles.buttonSlimIconClass]: type === buttonTypes.slimIcon,
    })}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.defaultProps = {
  type: buttonTypes.slim,
};

export default Button;
