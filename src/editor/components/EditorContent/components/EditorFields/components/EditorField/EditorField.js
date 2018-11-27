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

export const editorInputTypes = {
  string: 'string',
  htmlSelector: 'htmlSelector',
  radioSelector: 'radioSelector',
  textAlign: 'textAlign',
  color: 'color',
};

type FieldProps = {
  value: string,
  onChange: (value: string) => void,
};

const mappedFieldTypes = {
  [editorInputTypes.string]: (props: FieldProps) => <TextInput {...props} />,
  [editorInputTypes.color]: (props: FieldProps) => <ColorSelector {...props} />,
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
  noLabelWrapper: boolean,
};

const EditorFieldInner = ({ label, inputType, value, onChange }: Props) => {
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
          onChange,
        })}
      </div>
    </React.Fragment>
  );
};

const EditorField = (props: Props) => {
  const { noLabelWrapper } = props;
  if (noLabelWrapper) {
    return (
      <div className={styles.containerClass}>
        <EditorFieldInner {...props} />
      </div>
    );
  }
  return (
    <div className={styles.containerClass}>
      <label>
        <EditorFieldInner {...props} />
      </label>
    </div>
  );
};

export default EditorField;
