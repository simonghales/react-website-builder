// @flow
import React from 'react';
import styles from './styles';
import Input, { inputStyleTypes } from '../Input/Input';

type Props = {
  label: string,
  value: any,
  onUpdate: (value: any) => void,
};

const Field = ({ label, value, onUpdate }: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.labelClass}>{label}:</div>
    <div className={styles.valueClass}>
      <Input styleType={inputStyleTypes.dark} value={value} onChange={onUpdate} />
    </div>
  </div>
);

export default Field;
