// @flow

import { getSelectedModuleKeyFromUIState } from './state';

export type ModulesSelectedBlockKeys = {
  [string]: string,
};

export type UiReduxState = {
  addingBlock: boolean,
  hoveredBlockKey: string,
  selectedModuleKey: string,
  selectedModulesHistory: Array<string>,
  modulesSelectedBlockKeys: ModulesSelectedBlockKeys,
  selectedPageKey: string,
};

export const initialUiReduxState: UiReduxState = {
  addingBlock: false,
  hoveredBlockKey: '',
  selectedModuleKey: '',
  selectedModulesHistory: [],
  modulesSelectedBlockKeys: {},
  selectedPageKey: '',
};

const SET_SELECTED_PAGE_KEY = 'SET_SELECTED_PAGE_KEY';

type SetSelectedPageKeyPayload = {
  pageKey: string,
};

type SetSelectedPageKeyAction = {
  type: string,
  payload: SetSelectedPageKeyPayload,
};

export function setSelectedPageKey(pageKey: string): SetSelectedPageKeyAction {
  return {
    type: SET_SELECTED_PAGE_KEY,
    payload: {
      pageKey,
    },
  };
}

function handleSetSelectedPageKey(
  state: UiReduxState,
  { pageKey }: SetSelectedPageKeyPayload
): UiReduxState {
  return {
    ...state,
    selectedPageKey: pageKey,
  };
}

const SET_INITIAL_SELECTED_MODULE_HISTORY = 'SET_INITIAL_SELECTED_MODULE_HISTORY';

type SetInitialSelectedModuleHistoryPayload = {
  moduleKey: string,
  previousModuleKey: string,
};

type SetInitialSelectedModuleHistoryAction = {
  type: string,
  payload: SetInitialSelectedModuleHistoryPayload,
};

export function setInitialSelectedModuleHistory(
  moduleKey: string,
  previousModuleKey: string
): SetInitialSelectedModuleHistoryAction {
  return {
    type: SET_INITIAL_SELECTED_MODULE_HISTORY,
    payload: {
      moduleKey,
      previousModuleKey,
    },
  };
}

function handleSetInitialSelectedModuleHistory(
  state: UiReduxState,
  { moduleKey, previousModuleKey }: SetInitialSelectedModuleHistoryPayload
): UiReduxState {
  const selectedModulesHistory = previousModuleKey ? [previousModuleKey] : [];
  return {
    ...state,
    selectedModuleKey: moduleKey,
    selectedModulesHistory,
  };
}

const SET_SELECTED_MODULE_KEY = 'SET_SELECTED_MODULE_KEY';

type SetSelectedModuleKeyPayload = {
  moduleKey: string,
  previousModuleKey: string,
};

type SetSelectedModuleKeyAction = {
  type: string,
  payload: SetSelectedModuleKeyPayload,
};

export function setSelectedModuleKey(
  moduleKey: string,
  previousModuleKey: string
): SetSelectedModuleKeyAction {
  return {
    type: SET_SELECTED_MODULE_KEY,
    payload: {
      moduleKey,
      previousModuleKey,
    },
  };
}
function handleSetSelectedModuleKey(
  state: UiReduxState,
  { moduleKey, previousModuleKey }: SetSelectedModuleKeyPayload
): UiReduxState {
  const currentSelectedModuleKey = getSelectedModuleKeyFromUIState(state);
  const currentPreviousModuleKey =
    state.selectedModulesHistory.length > 0
      ? state.selectedModulesHistory[state.selectedModulesHistory.length - 1]
      : '';
  let updatedSelectedModulesHistory = state.selectedModulesHistory.slice();
  if (moduleKey === currentPreviousModuleKey) {
    updatedSelectedModulesHistory.pop();
  } else if (previousModuleKey) {
    updatedSelectedModulesHistory = updatedSelectedModulesHistory.concat([
      currentSelectedModuleKey,
    ]);
  }
  return {
    ...state,
    selectedModuleKey: moduleKey,
    selectedModulesHistory: updatedSelectedModulesHistory,
  };
}

const SET_MODULE_SELECTED_BLOCK_KEY = 'SET_MODULE_SELECTED_BLOCK_KEY';

type SetModuleSelectedBlockKeyPayload = {
  moduleKey: string,
  blockKey: string,
};

type SetModuleSelectedBlockKeyAction = {
  type: string,
  payload: SetModuleSelectedBlockKeyPayload,
};

export function setModuleSelectedBlockKey(
  moduleKey: string,
  blockKey: string
): SetModuleSelectedBlockKeyAction {
  return {
    type: SET_MODULE_SELECTED_BLOCK_KEY,
    payload: {
      moduleKey,
      blockKey,
    },
  };
}

function handleSetModuleSelectedBlockKey(
  state: UiReduxState,
  { moduleKey, blockKey }: SetModuleSelectedBlockKeyPayload
): UiReduxState {
  return {
    ...state,
    modulesSelectedBlockKeys: {
      ...state.modulesSelectedBlockKeys,
      [moduleKey]: blockKey,
    },
  };
}

const SET_HOVERED_BLOCK_KEY = 'SET_HOVERED_BLOCK_KEY';

type SetHoveredBlockKeyPayload = {
  blockKey: string,
};

type SetHoveredBlockKeyAction = {
  type: string,
  payload: SetHoveredBlockKeyPayload,
};

export function setHoveredBlockKey(blockKey: string): SetHoveredBlockKeyAction {
  return {
    type: SET_HOVERED_BLOCK_KEY,
    payload: {
      blockKey,
    },
  };
}

function handleSetHoveredBlockKey(
  state: UiReduxState,
  { blockKey }: SetHoveredBlockKeyPayload
): UiReduxState {
  return {
    ...state,
    hoveredBlockKey: blockKey,
  };
}

const SET_ADDING_BLOCK = 'SET_ADDING_BLOCK';

type SetAddingBlockPayload = {
  addingBlock: boolean,
};

type SetAddingBlockAction = {
  type: string,
  payload: SetAddingBlockPayload,
};

export function setAddingBlock(addingBlock: boolean): SetAddingBlockAction {
  return {
    type: SET_ADDING_BLOCK,
    payload: {
      addingBlock,
    },
  };
}

function handleSetAddingBlock(
  state: UiReduxState,
  { addingBlock }: SetAddingBlockPayload
): UiReduxState {
  return {
    ...state,
    addingBlock,
  };
}

type Actions = SetAddingBlockAction;

const ACTION_HANDLERS = {
  [SET_SELECTED_PAGE_KEY]: handleSetSelectedPageKey,
  [SET_INITIAL_SELECTED_MODULE_HISTORY]: handleSetInitialSelectedModuleHistory,
  [SET_SELECTED_MODULE_KEY]: handleSetSelectedModuleKey,
  [SET_MODULE_SELECTED_BLOCK_KEY]: handleSetModuleSelectedBlockKey,
  [SET_HOVERED_BLOCK_KEY]: handleSetHoveredBlockKey,
  [SET_ADDING_BLOCK]: handleSetAddingBlock,
};

export default function uiReducer(state: UiReduxState = initialUiReduxState, action: Actions) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
