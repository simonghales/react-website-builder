// @flow
import React, { Component } from 'react';
import styles from './styles';

type Props = {
  value: string,
  onChange: (event: any) => void,
};

class TextInput extends Component<Props> {
  render() {
    const { value, onChange } = this.props;
    return <input className={styles.inputClass} type="text" value={value} onChange={onChange} />;
  }
}

export default TextInput;
