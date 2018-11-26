// @flow
import React from 'react';
import styles from './styles';

type Props = {
  message: string,
}

const DisabledMessage = ({message}: Props) => (
  <div className={styles.messageClass}>{message}</div>
)

export default DisabledMessage;
