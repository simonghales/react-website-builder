// @flow

import type { ReduxState } from '../store';
// import store from '../store';
import { getSelectedModuleKeyFromUIState } from '../ui/state';
import { setModuleSelectedBlockKey } from '../ui/reducer';
import { getSelectedBlockKeyFromReduxState } from './state/blocks';
import { setPropLinkedReference } from '../editor/reducer';

// export function getStoreState(): ReduxState {
//   return store.getState();
// }

export function dispatchSelectBlock(blockKey: string, dispatch: any) {
  // const state = getStoreState();
  // const moduleKey = getSelectedModuleKeyFromUIState(state.ui);
  // dispatch(setModuleSelectedBlockKey(moduleKey, blockKey));
}

export function dispatchSetPropLinkedReference(propKey: string, isLinked: boolean, dispatch: any) {
  // const state = getStoreState();
  // const moduleKey = getSelectedModuleKeyFromUIState(state.ui);
  // const selectedBlockKey = getSelectedBlockKeyFromReduxState(state);
  // dispatch(setPropLinkedReference(propKey, isLinked, selectedBlockKey, moduleKey));
}
