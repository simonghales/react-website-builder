// @flow

import type { UiReduxState } from './reducer';

export function getAddingBlock(state: UiReduxState): boolean {
  return state.addingBlock;
}
