// @flow
import React, { Component } from 'react';
import { CustomPicker } from 'react-color';
import { Alpha, Hue, Saturation, EditableInput } from 'react-color/lib/components/common';
import styles from './styles';

// import ReactModal from 'react-modal';
// import colors from 'styles/config/colors';

// ReactModal.setAppElement('#root');
//
// ReactModal.defaultStyles = {
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: colors.blackInactiveBlueMid,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// };

type Props = {
  color: string,
  onInputChange: (value: string) => void,
  onChange: (value: string) => void,
};

type State = {
  rawColor: string,
};

class ColorMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rawColor: props.color,
    };
  }

  componentWillReceiveProps(): void {
    this.setState({
      // eslint-disable-next-line react/destructuring-assignment
      rawColor: this.props.color,
    });
  }

  handleColorChange = value => {
    const { onChange } = this.props;
    console.log('value', value);
    onChange(value);
  };

  handleInputChange = value => {
    const { onInputChange } = this.props;
    onInputChange(value);
  };

  render() {
    const { rawColor } = this.state;
    return (
      <div className={styles.containerClass}>
        <div className={styles.contentClass}>
          <div className={styles.saturationContainerClass}>
            <Saturation {...this.props} onChange={this.handleColorChange} />
          </div>
          <div className={styles.bottomClass}>
            <div className={styles.colorOptionsClass}>
              <div className={styles.colorPreviewClass}>
                <div
                  className={styles.colorPreviewInnerClass}
                  style={{
                    backgroundColor: rawColor,
                  }}
                />
              </div>
              <div className={styles.slidersWrapperClass}>
                <div className={styles.sliderClass}>
                  <Hue {...this.props} onChange={this.handleColorChange} direction="horizontal" />
                </div>
                <div className={styles.sliderClass}>
                  <Alpha {...this.props} onChange={this.handleColorChange} />
                </div>
              </div>
            </div>
            <div className={styles.valueWrapperClass}>
              <EditableInput style={{}} value={rawColor} onChange={this.handleInputChange} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomPicker(ColorMenu);
