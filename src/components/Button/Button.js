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
  buttonType?: ButtonTypes,
  onClick: () => void,
};

const Button = ({ children, buttonType, onClick, disabled, ...otherProps }: Props) => (
  <button
    className={cx(styles.buttonClass, {
      [styles.buttonSlimClass]: buttonType === buttonTypes.slim,
      [styles.buttonSlimIconClass]: buttonType === buttonTypes.slimIcon,
      [styles.buttonSolidClass]: buttonType === buttonTypes.solid,
      [styles.classNames.buttonDisabled]: disabled,
    })}
    onClick={onClick}
    {...otherProps}
  >
    {children}
  </button>
);

Button.defaultProps = {
  disabled: false,
  buttonType: buttonTypes.slim,
};

export default Button;
