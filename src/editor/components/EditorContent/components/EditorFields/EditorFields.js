// @flow
import React, { Component } from 'react';
import EditorFieldGroup from './components/EditorFieldGroup/EditorFieldGroup';
import type { EditorFieldGroupModel } from './model';
import EditorFieldGroupFields from './components/EditorFieldGroupFields/EditorFieldGroupFields';

type Props = {
  blockKey: string,
  fieldGroups: Array<EditorFieldGroupModel>,
};

class EditorFields extends Component<Props> {
  render() {
    const { fieldGroups, blockKey } = this.props;
    return (
      <div>
        {fieldGroups.map((fieldGroup: EditorFieldGroupModel) => (
          <EditorFieldGroup key={fieldGroup.key} label={fieldGroup.label} grid={fieldGroup.grid}>
            <EditorFieldGroupFields fields={fieldGroup.fields} blockKey={blockKey} />
          </EditorFieldGroup>
        ))}
      </div>
    );
  }
}

export default EditorFields;
