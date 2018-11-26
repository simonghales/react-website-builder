// @flow
import React, {Component} from 'react';
import EditorFieldGroup from "./components/EditorFieldGroup/EditorFieldGroup";
import type { EditorFieldGroupModel } from "./model";

type Props = {
  fieldGroups: Array<EditorFieldGroupModel>
};

class EditorFields extends Component<Props> {

  render() {
    const {fieldGroups} = this.props;
    return (
      <div>
        {
          fieldGroups.map((fieldGroup: EditorFieldGroupModel) => (
            <EditorFieldGroup key={fieldGroup.key} label={fieldGroup.label} fields={fieldGroup.fields}/>
          ))
        }
      </div>
    );
  }

}

export default EditorFields;
