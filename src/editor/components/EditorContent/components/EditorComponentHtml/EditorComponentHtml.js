// @flow
import React, { Component } from 'react';
import EditorFields from '../EditorFields/EditorFields';
import { editorInputTypes } from '../EditorFields/components/EditorField/EditorField';
import EditorLayout from '../EditorLayout/EditorLayout';
import EditorLayoutColumn from '../EditorLayout/components/EditorLayoutColumn';

const fieldGroups = [
  {
    key: 'main',
    label: 'Main',
    fields: [
      {
        key: 'element',
        label: 'Element',
        labelHighlighted: true,
        inputType: editorInputTypes.textAlign,
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
  },
  {
    key: 'main2',
    label: 'Main',
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
  },
];

class EditorComponentHtml extends Component<{}> {
  render() {
    return (
      <EditorLayout>
        <EditorLayoutColumn columns={7}>
          <EditorFields fieldGroups={fieldGroups} />
        </EditorLayoutColumn>
        <EditorLayoutColumn columns={2} />
        <EditorLayoutColumn columns={5}>
          <EditorFields fieldGroups={fieldGroups} />
        </EditorLayoutColumn>
      </EditorLayout>
    );
  }
}

export default EditorComponentHtml;
