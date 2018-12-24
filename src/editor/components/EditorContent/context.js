// @flow
import React from 'react';

export type EditorContentContextState = {
  setEditingMixin: (mixinKey: string) => void,
};

const defaultState: EditorContentContextState = {
  setEditingMixin: () => {},
};

export const EditorContentContext = React.createContext(defaultState);
