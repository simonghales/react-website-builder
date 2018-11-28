// @flow
import React from 'react';
import type { EditorFieldModel } from '../../model';
import styles from './styles';
import EditorField from '../EditorField/EditorField';

type Props = {
  fields: Array<EditorFieldModel>,
};

const EditorFieldGroupFields = ({ fields }: Props) => (
  <React.Fragment>
    {fields.map((field: EditorFieldModel) => (
      <div
        className={styles.fieldContainerClass}
        key={field.key}
        style={{ gridColumnEnd: `span ${field.columns}` }}
      >
        <EditorField
          key={field.key}
          label={field.label}
          value={field.value}
          inheritedValue={field.inheritedValue}
          onChange={field.onChange}
          inputType={field.inputType}
          noLabelWrapper={field.noLabelWrapper}
        />
      </div>
    ))}
  </React.Fragment>
);

export default EditorFieldGroupFields;
