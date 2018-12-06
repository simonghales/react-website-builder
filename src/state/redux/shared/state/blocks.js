// @flow

import type { ReduxState } from '../../store';
import {
  getSelectedModuleKeyFromUIState,
  getSelectedModuleSelectedBlockKeyFromUIState,
} from '../../ui/state';
import { getModuleFromState } from '../../editor/state';
import { getModuleRootBlockKey } from '../../../../data/modules/state';

export function getSelectedBlockKeyFromReduxState(state: ReduxState): string {
  const uiSelectedBlockKey = getSelectedModuleSelectedBlockKeyFromUIState(state.ui);
  if (uiSelectedBlockKey) {
    return uiSelectedBlockKey;
  }
  const uiSelectedModuleKey = getSelectedModuleKeyFromUIState(state.ui);
  const uiSelectedModule = getModuleFromState(state.editor, uiSelectedModuleKey);
  const uiSelectedModuleRootBlockKey = getModuleRootBlockKey(uiSelectedModule);
  return uiSelectedModuleRootBlockKey;
}
