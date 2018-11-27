// @flow
import React, { Component } from 'react';
import styles from './styles';
import ColorMenu from './components/ColorMenu/ColorMenu';

export const getRgbValue = ({
  r,
  g,
  b,
  a,
}: {
  r: number,
  g: number,
  b: number,
  a: number,
}): string => `rgba(${r},${g},${b},${a})`;

type State = {
  color: string,
};

class ColorSelector extends Component<{}, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      color: '#F0F0F0',
    };
  }

  handleColorChange = update => {
    console.log('color change...'); // todo
    // const color = update.rgb.a < 1 ? getRgbValue(update.rgb) : update.hex;
    // this.setState({
    //   color,
    // });
  };

  handleInputChange = value => {
    this.setState({
      color: value,
    });
  };

  render() {
    const { color, colorType } = this.state;
    return (
      <div className={styles.wrapperClass}>
        <div className={styles.containerClass} role="button" />
        <div className={styles.menuClass}>
          <ColorMenu
            color={color}
            colorType={colorType}
            onChange={this.handleColorChange}
            onInputChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

export default ColorSelector;
