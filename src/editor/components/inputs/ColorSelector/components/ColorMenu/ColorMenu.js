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
  onInputChange: (value: string) => void,
};

class ColorMenu extends Component<Props> {
  handleInputChange = value => {
    const { onInputChange } = this.props;
    onInputChange(value);
  };

  render() {
    return (
      <div className={styles.containerClass}>
        <div className={styles.contentClass}>
          <div className={styles.saturationContainerClass}>
            <Saturation {...this.props} />
          </div>
          <div className={styles.bottomClass}>
            <div className={styles.colorOptionsClass}>
              <div className={styles.colorPreviewClass} />
              <div className={styles.slidersWrapperClass}>
                <div className={styles.sliderClass}>
                  <Hue {...this.props} direction="horizontal" />
                </div>
                <div className={styles.sliderClass}>
                  <Alpha {...this.props} />
                </div>
              </div>
            </div>
            <div className={styles.valueWrapperClass}>
              <EditableInput
                style={{}}
                value={this.props.color}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomPicker(ColorMenu);
