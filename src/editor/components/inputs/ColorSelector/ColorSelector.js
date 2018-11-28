// @flow
import React, { Component } from 'react';
import { debounce } from 'lodash';
import { cx } from 'emotion';
import styles from './styles';
import ColorMenu from './components/ColorMenu/ColorMenu';
import type { FieldProps } from '../../EditorContent/components/EditorFields/components/EditorField/EditorField';

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

type Props = FieldProps;

type State = {
  color: string,
  selectingColor: boolean,
};

class ColorSelector extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      color: props.value ? props.value : props.inheritedValue,
      selectingColor: false,
    };
  }

  handleColorChange = update => {
    const color = update.rgb.a < 1 ? getRgbValue(update.rgb) : update.hex;
    this.setState({
      color,
    });
    const { onChange } = this.props;
    onChange(color);
  };

  debouncedHandleColorChange = debounce(this.handleColorChange, 200);

  handleInputChange = value => {
    this.setState({
      color: value,
    });
  };

  handleStartSelectingColor = () => {
    this.setState({
      selectingColor: true,
    });
  };

  handleCloseColorMenu = () => {
    this.setState({
      selectingColor: false,
    });
  };

  render() {
    const { color, selectingColor } = this.state;
    return (
      <div className={styles.wrapperClass}>
        <div
          className={cx(styles.containerClass, {
            [styles.containerFocusedClass]: selectingColor,
          })}
          style={{
            backgroundColor: color,
          }}
          onClick={this.handleStartSelectingColor}
        />
        <div className={styles.menuClass}>
          {selectingColor && (
            <ColorMenu
              color={color}
              onChange={this.handleColorChange}
              close={this.handleCloseColorMenu}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ColorSelector;
