// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';
import TextInput from '../../../../../inputs/TextInput/TextInput';
import HTMLSelector, {
  htmlSelectorOptions,
} from '../../../../../inputs/extended/HTMLSelector/HTMLSelector';
import { elementDefaultProps } from '../../../../../../../blocks/groups/html/Element/props';
import RadioSelector from '../../../../../inputs/RadioSelector/RadioSelector';
import TextAlignSelector from '../../../../../inputs/extended/TextAlignSelector/TextAlignSelector';
import ColorSelector from '../../../../../inputs/ColorSelector/ColorSelector';
import FontFamilySelector from '../../../../../inputs/extended/FontFamilySelector/FontFamilySelector';
import FontWeightSelector from '../../../../../inputs/extended/FontWeightSelector/FontWeightSelector';
import FontStyleSelector from '../../../../../inputs/extended/FontStyleSelector/FontStyleSelector';

export const editorInputTypes = {
  string: 'string',
  htmlSelector: 'htmlSelector',
  radioSelector: 'radioSelector',
  textAlign: 'textAlign',
  color: 'color',
  fontFamily: 'fontFamily',
  fontWeight: 'fontWeight',
  fontStyle: 'fontStyle',
};

export type FieldProps = {
  value: string,
  inheritedValue: string,
  onChange: (value: string) => void,
};

const mappedFieldTypes = {
  [editorInputTypes.string]: (props: FieldProps) => <TextInput {...props} />,
  [editorInputTypes.color]: (props: FieldProps) => <ColorSelector {...props} />,
  [editorInputTypes.textAlign]: (props: FieldProps) => <TextAlignSelector {...props} />,
  [editorInputTypes.fontFamily]: (props: FieldProps) => <FontFamilySelector {...props} />,
  [editorInputTypes.fontWeight]: (props: FieldProps) => <FontWeightSelector {...props} />,
  [editorInputTypes.fontStyle]: (props: FieldProps) => <FontStyleSelector {...props} />,
  [editorInputTypes.radioSelector]: (props: FieldProps) => (
    <RadioSelector options={[]} {...props} />
  ),
  [editorInputTypes.htmlSelector]: (props: FieldProps) => (
    <HTMLSelector
      options={htmlSelectorOptions.all}
      defaultHtmlElement={elementDefaultProps.element}
      {...props}
    />
  ),
};

const getInput = (inputType: string) => {
  const input = mappedFieldTypes[inputType];
  if (!input) {
    throw new Error(`Input type "${inputType}" not supported.`);
  }
  return input;
};

type Props = {
  label: string,
  value: string,
  inheritedValue: string,
  inputType: string,
  onChange: (value: string) => void,
  // eslint-disable-next-line react/no-unused-prop-types
  noLabelWrapper: boolean,
};

const EditorFieldInner = ({ label, inputType, value, inheritedValue, onChange }: Props) => {
  const Input = getInput(inputType);
  return (
    <React.Fragment>
      <div
        className={cx(styles.labelClass, {
          [styles.labelInactiveClass]: !value,
        })}
      >
        {label}
      </div>
      <div className={styles.inputContainerClass}>
        {Input({
          value,
          inheritedValue,
          onChange,
        })}
      </div>
    </React.Fragment>
  );
};

const EditorFieldInnerSwitch = (props: Props) => {
  const { noLabelWrapper } = props;
  if (noLabelWrapper) {
    return <EditorFieldInner {...props} />;
  }
  return (
    <label>
      <EditorFieldInner {...props} />
    </label>
  );
};

const EditorField = (props: Props) => (
  <div className={styles.containerClass}>
    <EditorFieldInnerSwitch {...props} />
  </div>
);

export default EditorField;
