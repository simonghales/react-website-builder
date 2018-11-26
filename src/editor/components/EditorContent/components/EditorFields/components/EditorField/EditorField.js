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
import type { RadioSelectorOptionModel } from '../../../../../inputs/RadioSelector/RadioSelector';
import TextAlignSelector from '../../../../../inputs/extended/TextAlignSelector/TextAlignSelector';

export const editorInputTypes = {
  string: 'string',
  htmlSelector: 'htmlSelector',
  radioSelector: 'radioSelector',
  textAlign: 'textAlign',
};

type FieldProps = {
  value: string,
  onChange: (value: string) => void,
};

const mappedFieldTypes = {
  [editorInputTypes.string]: (props: FieldProps) => <TextInput {...props} />,
  [editorInputTypes.textAlign]: (props: FieldProps) => <TextAlignSelector {...props} />,
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
  inputType: string,
  onChange: (value: string) => void,
};

const EditorField = ({ label, inputType, value, onChange }: Props) => {
  const Input = getInput(inputType);
  return (
    <div className={styles.containerClass}>
      <label>
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
            onChange,
          })}
        </div>
      </label>
    </div>
  );
};

export default EditorField;
