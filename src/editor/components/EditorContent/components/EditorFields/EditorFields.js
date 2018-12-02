// @flow
import React, { Component } from 'react';
import EditorFieldGroup from './components/EditorFieldGroup/EditorFieldGroup';
import type { EditorFieldGroupModel } from './model';
import EditorFieldGroupFields from './components/EditorFieldGroupFields/EditorFieldGroupFields';

type Props = {
  fieldGroups: Array<EditorFieldGroupModel>,
};

class EditorFields extends Component<Props> {
  render() {
    const { fieldGroups } = this.props;
    return (
      <div>
        {fieldGroups.map((fieldGroup: EditorFieldGroupModel) => (
          <EditorFieldGroup key={fieldGroup.key} label={fieldGroup.label} grid={fieldGroup.grid}>
            <EditorFieldGroupFields fields={fieldGroup.fields} />
          </EditorFieldGroup>
        ))}
      </div>
    );
  }
}

export default EditorFields;
