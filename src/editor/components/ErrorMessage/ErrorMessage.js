// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';

type Props = {
  children: any,
  className?: string,
};

const ErrorMessage = ({ children, className }: Props) => (
  <p className={cx(styles.textClass, className)}>{children}</p>
);

ErrorMessage.defaultProps = {
  className: '',
};

export default ErrorMessage;
