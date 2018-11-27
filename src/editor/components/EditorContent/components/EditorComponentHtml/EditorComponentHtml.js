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
        noLabelWrapper: false,
      },
      {
        key: 'element2',
        label: 'Element',
        labelHighlighted: true,
        inputType: editorInputTypes.htmlSelector,
        value: 'div',
        onChange: () => {},
        noLabelWrapper: false,
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
        inputType: editorInputTypes.color,
        value: '',
        onChange: () => {},
        noLabelWrapper: true,
      },
      {
        key: 'element2',
        label: 'Element',
        labelHighlighted: true,
        inputType: editorInputTypes.htmlSelector,
        value: 'div',
        onChange: () => {},
        noLabelWrapper: false,
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
