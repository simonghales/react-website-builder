// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';

export const buttonTypes = {
  solid: 'solid',
  slim: 'slim',
  slimIcon: 'slimIcon',
};

type ButtonTypes = $Keys<typeof buttonTypes>;

type Props = {
  children: any,
  disabled?: boolean,
  type?: ButtonTypes,
  onClick: () => void,
};

const Button = ({ children, type, onClick, disabled }: Props) => (
  <button
    className={cx(styles.buttonClass, {
      [styles.buttonSlimClass]: type === buttonTypes.slim,
      [styles.buttonSlimIconClass]: type === buttonTypes.slimIcon,
      [styles.buttonSolidClass]: type === buttonTypes.solid,
      [styles.classNames.buttonDisabled]: disabled,
    })}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.defaultProps = {
  disabled: false,
  type: buttonTypes.slim,
};

export default Button;
