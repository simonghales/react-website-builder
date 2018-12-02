// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';

type Props = {
  icon: any,
  className?: string,
  tooltip?: string,
  onClick: () => void,
};

const IconButton = ({ icon, className, onClick, tooltip }: Props) => (
  <div className={cx(styles.buttonClass, className)} data-tip={tooltip} onClick={onClick}>
    {icon}
  </div>
);

IconButton.defaultProps = {
  className: '',
  tooltip: '',
};

export default IconButton;
