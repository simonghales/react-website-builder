// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';
import TextInput from '../../../../../inputs/TextInput/TextInput';
import HTMLSelector from '../../../../../inputs/extended/HTMLSelector/HTMLSelector';
import RadioSelector from '../../../../../inputs/RadioSelector/RadioSelector';
import TextAlignSelector from '../../../../../inputs/extended/TextAlignSelector/TextAlignSelector';
import ColorSelector from '../../../../../inputs/ColorSelector/ColorSelector';
import FontFamilySelector from '../../../../../inputs/extended/FontFamilySelector/FontFamilySelector';
import FontWeightSelector from '../../../../../inputs/extended/FontWeightSelector/FontWeightSelector';
import FontStyleSelector from '../../../../../inputs/extended/FontStyleSelector/FontStyleSelector';
import type { BlockModel } from '../../../../../../../blocks/models';
import LinkedHeader from './components/LinkedHeader/LinkedHeader';
import { isBlockModuleBlock } from '../../../../../../../blocks/state';
import PropReferenceSelector from '../../../../../inputs/extended/PropReferenceSelector/PropReferenceSelector';
import RepeaterDataInput from '../../../../../inputs/RepeaterDataInput/RepeaterDataInput';
import type { DataBlockModel } from '../../../../../../../data/blocks/models';

export const editorInputTypes = {
  string: 'string',
  htmlSelector: 'htmlSelector',
  radioSelector: 'radioSelector',
  textAlign: 'textAlign',
  color: 'color',
  fontFamily: 'fontFamily',
  fontWeight: 'fontWeight',
  fontStyle: 'fontStyle',
  repeaterData: 'repeaterData',
};

export type EditorInputTypes = $Keys<typeof editorInputTypes>;

export type FieldProps = {
  propKey: string,
  value: string,
  inheritedValue: string,
  onChange: (value: any) => void,
};

const mappedFieldTypes = {
  [editorInputTypes.string]: (props: FieldProps) => <TextInput {...props} />,
  [editorInputTypes.repeaterData]: (props: FieldProps) => <RepeaterDataInput {...props} />,
  [editorInputTypes.color]: (props: FieldProps) => <ColorSelector {...props} />,
  [editorInputTypes.textAlign]: (props: FieldProps) => <TextAlignSelector {...props} />,
  [editorInputTypes.fontFamily]: (props: FieldProps) => <FontFamilySelector {...props} />,
  [editorInputTypes.fontWeight]: (props: FieldProps) => <FontWeightSelector {...props} />,
  [editorInputTypes.fontStyle]: (props: FieldProps) => <FontStyleSelector {...props} />,
  [editorInputTypes.radioSelector]: (props: FieldProps) => (
    <RadioSelector options={[]} {...props} />
  ),
  [editorInputTypes.htmlSelector]: (props: FieldProps, block?: BlockModel) => (
    <HTMLSelector block={block} {...props} />
  ),
};

const getInput = (inputType: string, isPropReference: boolean) => {
  if (isPropReference) {
    return (props: FieldProps) => <PropReferenceSelector {...props} inputType={inputType} />;
  }
  const input = mappedFieldTypes[inputType];
  if (!input) {
    throw new Error(`Input type "${inputType}" not supported.`);
  }
  return input;
};

type Props = {
  propKey: string,
  label: string,
  value: string,
  blockKey: string,
  inheritedValue: string,
  inputType: string,
  onChange: (value: string) => void,
  // eslint-disable-next-line react/no-unused-prop-types
  noLabelWrapper: boolean,
  block?: BlockModel,
  isPropReference: boolean,
  linkedPropEnabled: boolean,
};

const EditorFieldInner = ({
  propKey,
  label,
  inputType,
  value,
  blockKey,
  inheritedValue,
  onChange,
  block,
  isPropReference,
  linkedPropEnabled,
  linkedPropKey,
}: Props) => {
  const Input = getInput(inputType, isPropReference);
  const isModuleBlock = block ? isBlockModuleBlock(block) : false;
  return (
    <React.Fragment>
      <div
        className={cx(styles.labelClass, {
          [styles.labelInactiveClass]: !value,
        })}
      >
        <div>{label}</div>
        {!isModuleBlock && linkedPropEnabled && (
          <LinkedHeader
            blockKey={blockKey}
            propKey={propKey}
            isLinked={isPropReference}
            linkedPropKey={linkedPropKey}
          />
        )}
      </div>
      <div className={styles.inputContainerClass}>
        {Input(
          {
            value,
            inheritedValue,
            onChange,
            propKey,
          },
          block
        )}
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
  <div className={cx(styles.containerClass, styles.classNames.editorField)}>
    <EditorFieldInnerSwitch {...props} />
  </div>
);

export default EditorField;
