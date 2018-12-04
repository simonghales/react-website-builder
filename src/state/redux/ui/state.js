// @flow

import type { ModulesSelectedBlockKeys, UiReduxState } from './reducer';

export function getAddingBlock(state: UiReduxState): boolean {
  return state.addingBlock;
}

export function getSelectedModuleKeyFromUIState(state: UiReduxState): string {
  const { selectedModuleKey } = state;
  if (selectedModuleKey) {
    return selectedModuleKey;
  }
  return 'DUMMY_PAGE_MODULE'; // todo - come up with alternative
}

export function getModulesSelectedBlockKeysFromUIState(state: UiReduxState): string {
  return state.modulesSelectedBlockKeys;
}

export function getModuleSelectedBlockKeyFromModulesSelectedBlockKeys(
  moduleKey: string,
  modulesSelectedBlockKeys: ModulesSelectedBlockKeys
) {
  return modulesSelectedBlockKeys[moduleKey] ? modulesSelectedBlockKeys[moduleKey] : '';
}

export function getSelectedModuleSelectedBlockKeyFromUIState(state: UiReduxState): string {
  const selectedModuleKey = getSelectedModuleKeyFromUIState(state);
  const modulesSelectedBlockKeys = getModulesSelectedBlockKeysFromUIState(state);
  return getModuleSelectedBlockKeyFromModulesSelectedBlockKeys(
    selectedModuleKey,
    modulesSelectedBlockKeys
  );
}
