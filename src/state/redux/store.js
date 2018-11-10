// @flow
import { createStore, combineReducers } from 'redux';
import editorReducer, { initialEditorReduxState } from './editor/reducer';
import type { EditorReduxState } from './editor/reducer';

const rootReducer = combineReducers({
  editor: editorReducer,
});

export type ReduxState = {
  editor: EditorReduxState,
};

const initialReduxState: ReduxState = {
  editor: initialEditorReduxState,
};

const store = createStore(rootReducer, initialReduxState);

export default store;
