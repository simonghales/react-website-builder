// @flow
import React from 'react';
import type { EditorFieldModel } from "../../model";
import EditorField from "../EditorField/EditorField";
import styles from './styles';

type Props = {
  label: string,
  fields: Array<EditorFieldModel>,
}

const EditorFieldGroup = ({label, fields}: Props) => (
  <div>
    {
      label && (
        <header>{label}</header>
      )
    }
    <div>
      {
        fields.map((field: EditorFieldModel) => (
          <div className={styles.fieldContainerClass} key={field.key}>
            <EditorField key={field.key} label={field.label} value={field.value} onChange={field.onChange} inputType={field.inputType}/>
          </div>
        ))
      }
    </div>
  </div>
)

export default EditorFieldGroup;
