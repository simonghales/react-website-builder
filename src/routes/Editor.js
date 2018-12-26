// @flow
import React from 'react';
import EditorView from '../editor/views/EditorView/EditorView';
import EditorDataHandler from '../editor/components/EditorDataHandler/EditorDataHandler';

const EditorRoute = () => (
  <EditorDataHandler>
    <EditorView />
  </EditorDataHandler>
);

export default EditorRoute;
