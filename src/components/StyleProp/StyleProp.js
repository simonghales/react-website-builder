// @flow
import React from 'react';
import type { StylePropModel } from '../../data/styles/models';
import styles from './styles';
import styleProps from '../../data/styles/styleProps';
import FontFamilyInput from './components/FontFamilyInput/FontFamilyInput';

const styleInputComponents = {
  [styleProps.fontFamily.type]: props => <FontFamilyInput {...props} />,
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
  const inputComponent = getStyleInputComponent(styleProps.fontFamily.type);
  return (
    <div className={styles.containerClass} style={{ gridColumnEnd: `span ${columns}` }}>
      <label className={styles.labelClass}>
        <div className={styles.labelTextClass}>{styleProp.label}</div>
        <div>{inputComponent({})}</div>
      </label>
    </div>
  );
};

export default StyleProp;
