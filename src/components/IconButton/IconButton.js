// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';

export const iconButtonStyleTypes = {
  default: 'default',
  large: 'large',
};

type IconButtonStyleTypes = $Keys<typeof iconButtonStyleTypes>;

type Props = {
  icon: any,
  className?: string,
  tooltip?: string,
  onClick: () => void,
  styleType?: IconButtonStyleTypes,
  highlighted?: boolean,
  disabled?: boolean,
  addPreventOffclick?: boolean,
};

const IconButton = ({
  icon,
  className,
  onClick,
  tooltip,
  styleType,
  highlighted,
  disabled,
  addPreventOffclick,
}: Props) => (
  <button
    className={cx(styles.buttonClass, className, {
      [styles.largeButtonClass]: styleType === iconButtonStyleTypes.large,
      [styles.classNames.iconButtonHighlighted]: highlighted,
      [styles.classNames.iconButtonDisabled]: disabled,
    })}
    data-tip={tooltip}
    onClick={onClick}
    data-prevent-offclick={addPreventOffclick}
  >
    {icon}
  </button>
);

IconButton.defaultProps = {
  className: '',
  tooltip: '',
  styleType: iconButtonStyleTypes.default,
  highlighted: false,
  disabled: false,
  addPreventOffclick: false,
};

export default IconButton;
