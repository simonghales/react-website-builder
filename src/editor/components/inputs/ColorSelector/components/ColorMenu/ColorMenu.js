// @flow
import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { ChromePicker } from 'react-color';
import styles from './styles';

type Props = {
  color: string,
  onChange: (value: any) => void,
  close: () => void,
};

class ColorMenu extends Component<Props> {
  handleClickOutside() {
    // used by react-click-outside
    const { close } = this.props;
    close();
  }

  render() {
    const { color, onChange } = this.props;
    return (
      <ChromePicker
        color={color}
        onChangeComplete={onChange}
        className={styles.chromePickerClass}
      />
    );
  }
}

export default enhanceWithClickOutside(ColorMenu);
