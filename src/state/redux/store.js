// @flow
import { createStore, combineReducers } from 'redux';
import editorReducer, { initialEditorReduxState } from './editor/reducer';
import uiReducer, { initialUiReduxState } from './ui/reducer';
import type { EditorReduxState } from './editor/reducer';
import type { UiReduxState } from './ui/reducer';

const rootReducer = combineReducers({
  editor: editorReducer,
  ui: uiReducer,
});

export type ReduxState = {
  editor: EditorReduxState,
  ui: UiReduxState,
};

const initialReduxState: ReduxState = {
  editor: initialEditorReduxState,
  ui: initialUiReduxState,
};

const store = createStore(rootReducer, initialReduxState);

export default store;
