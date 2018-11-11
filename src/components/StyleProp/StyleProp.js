// @flow
import React from 'react';
import type { StylePropModel } from '../../data/styles/models';
import styles from './styles';
import styleProps from '../../data/styles/styleProps';
import FontFamilyInput from './components/FontFamilyInput';
import FontWeightInput from './components/FontWeightInput';
import FontStyleInput from './components/FontStyleInput';
import FontSizeInput from './components/FontSizeInput';
import ColorInput from './components/ColorInput';
import TextAlignInput from './components/TextAlignInput/TextAlignInput';
import LineHeightInput from './components/LineHeightInput';

const styleInputComponents = {
  [styleProps.fontFamily.type]: props => <FontFamilyInput {...props} />,
  [styleProps.fontWeight.type]: props => <FontWeightInput {...props} />,
  [styleProps.fontSize.type]: props => <FontSizeInput {...props} />,
  [styleProps.color.type]: props => <ColorInput {...props} />,
  [styleProps.fontStyle.type]: props => <FontStyleInput {...props} />,
  [styleProps.lineHeight.type]: props => <LineHeightInput {...props} />,
  [styleProps.textAlign.type]: props => <TextAlignInput {...props} />,
};

function getStyleInputComponent(type: string) {
  const component = styleInputComponents[type];
  if (!component) {
    throw new Error(`No component matched for "${type}"`);
  }
  return component;
}

type Props = {
  columns: number,
  styleProp: StylePropModel,
};

const StyleProp = ({ columns, styleProp }: Props) => {
  const inputComponent = getStyleInputComponent(styleProp.type);
  return (
    <div className={styles.containerClass} style={{ gridColumnEnd: `span ${columns}` }}>
      <label className={styles.labelClass}>
        <div className={styles.labelTextClass}>{styleProp.label}</div>
        <div className={styles.inputContainerClass}>{inputComponent({})}</div>
      </label>
    </div>
  );
};

export default StyleProp;
