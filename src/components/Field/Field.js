// @flow
import React from 'react';
import styles from './styles';
import Input, { inputStyleTypes } from '../Input/Input';

type Props = {
  label: string,
};

const Field = ({ label }: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.labelClass}>{label}:</div>
    <div className={styles.valueClass}>
      <Input styleType={inputStyleTypes.dark} />
    </div>
  </div>
);

export default Field;
