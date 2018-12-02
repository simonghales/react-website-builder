// @flow
import React from 'react';
import { cx } from 'emotion';
import type {
  BlockStyles,
  EditorMappedStylesContainer,
  StylePropModel,
} from '../../data/styles/models';
import styles from './styles';
import { styleInputTypes } from '../../data/styles/styleProps';
import FontFamilyInput from './components/FontFamilyInput';
import FontWeightInput from './components/FontWeightInput';
import FontStyleInput from './components/FontStyleInput';
import ColorInput from './components/ColorInput';
import TextInput from './components/TextInput';
import TextAlignInput from './components/TextAlignInput/TextAlignInput';
import { getStyleValue } from '../../data/styles/state';

const styleInputComponents = {
  [styleInputTypes.fontFamily]: props => <FontFamilyInput {...props} />,
  [styleInputTypes.fontWeight]: props => <FontWeightInput {...props} />,
  [styleInputTypes.color]: props => <ColorInput {...props} />,
  [styleInputTypes.fontStyle]: props => <FontStyleInput {...props} />,
  [styleInputTypes.textAlign]: props => <TextAlignInput {...props} />,
  [styleInputTypes.plain]: props => <TextInput {...props} />,
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
  blockStyles: BlockStyles,
  editorMappedStyles: EditorMappedStylesContainer,
  updateStyle: (cssKey: string, value: string) => void,
};

const StyleProp = ({ columns, styleProp, blockStyles, editorMappedStyles, updateStyle }: Props) => {
  const inputComponent = getStyleInputComponent(styleProp.type);
  const styleValue = getStyleValue(styleProp.cssKey, editorMappedStyles);
  const { setInBlock = false } = styleValue;
  return (
    <div className={styles.containerClass} style={{ gridColumnEnd: `span ${columns}` }}>
      <label className={styles.labelClass}>
        <div
          className={cx(styles.labelTextClass, {
            [styles.inactiveLabelTextClass]: !setInBlock,
          })}
        >
          {styleProp.label}
        </div>
        <div className={styles.inputContainerClass}>
          {inputComponent({
            styleValue: styleValue.value,
            inheritedValue: styleValue.inheritedValue,
            updateStyle: (value: string) => updateStyle(styleProp.cssKey, value),
          })}
        </div>
      </label>
    </div>
  );
};

export default StyleProp;
