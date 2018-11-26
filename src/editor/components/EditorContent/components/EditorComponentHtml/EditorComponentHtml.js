// @flow
import React, {Component} from 'react';
import EditorFields from "../EditorFields/EditorFields";
import { editorInputTypes } from "../EditorFields/components/EditorField/EditorField";

const fieldGroups = [{
  key: 'main',
  label: '',
  fields: [
    {
      key: 'element',
      label: 'Element',
      labelHighlighted: true,
      inputType: editorInputTypes.string,
      value: '',
      onChange: () => {},
    },
    {
      key: 'element2',
      label: 'Element',
      labelHighlighted: true,
      inputType: editorInputTypes.htmlSelector,
      value: 'div',
      onChange: () => {},
    },
  ],
}];

class EditorComponentHtml extends Component<{}> {

  render() {
    return (
      <EditorFields fieldGroups={fieldGroups}/>
    );
  }

}

export default EditorComponentHtml;
