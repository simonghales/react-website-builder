// @flow

import { DUMMY_PAGE_DATA } from '../../../data/redux';
import { getBlockViaKey, getSelectedModuleKey } from './state';
import { updateAllBlocksOrder, updateBlockProp, updateBlockStyle } from './modifiers';
import type { BlocksOrder } from './modifiers';
import type { ModuleTemplates } from '../../../data/moduleTemplates/models';
import type { DataModules } from '../../../data/modules/models';
import type { MixinsModel } from '../../../data/mixins/models';

export type EditorReduxState = {
  modules: DataModules,
  moduleTemplates: ModuleTemplates,
  selectedModule: string,
  selectedBlock: string,
  mixinStyles: MixinsModel,
};

export const initialEditorReduxState: EditorReduxState = DUMMY_PAGE_DATA;

const SET_SELECTED_BLOCK = 'SET_SELECTED_BLOCK';

type SetSelectedBlockPayload = {
  blockKey: string,
};

type SetSelectedBlockAction = {
  type: string,
  payload: SetSelectedBlockPayload,
};

export function setSelectedBlock(blockKey: string): SetSelectedBlockAction {
  return {
    type: SET_SELECTED_BLOCK,
    payload: {
      blockKey,
    },
  };
}

function handleSetSelectedBlock(
  state: EditorReduxState,
  { blockKey }: SetSelectedBlockPayload
): EditorReduxState {
  return {
    ...state,
    selectedBlock: blockKey,
  };
}

const SET_BLOCK_STYLE_VALUE = 'SET_BLOCK_STYLE_VALUE';

type SetBlockStyleValuePayload = {
  blockKey: string,
  cssKey: string,
  modifier: string,
  section: string,
  value: string,
};

type SetBlockStyleValueAction = {
  type: string,
  payload: SetBlockStyleValuePayload,
};

export function setBlockStyleValue(
  blockKey: string,
  cssKey: string,
  modifier: string,
  section: string,
  value: string
): SetBlockStyleValueAction {
  return {
    type: SET_BLOCK_STYLE_VALUE,
    payload: {
      blockKey,
      cssKey,
      modifier,
      section,
      value,
    },
  };
}

function handleSetBlockStyleValue(
  state: EditorReduxState,
  { blockKey, cssKey, modifier, section, value }: SetBlockStyleValuePayload
): EditorReduxState {
  const selectedModule = getSelectedModuleKey(state);
  const block = getBlockViaKey(state, blockKey);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModule]: {
        ...state.modules[selectedModule],
        blocks: {
          ...state.modules[selectedModule].blocks,
          [blockKey]: {
            ...block,
            rawStyles: updateBlockStyle(block, modifier, section, cssKey, value),
          },
        },
      },
    },
  };
}

const SET_BLOCKS_ORDER = 'SET_BLOCKS_ORDER';

type SetBlocksOrderPayload = {
  blocksOrder: BlocksOrder,
  rootBlocksOrder: Array<string>,
};

type SetBlocksOrderAction = {
  type: string,
  payload: SetBlocksOrderPayload,
};

export function setBlocksOrder(
  blocksOrder: BlocksOrder,
  rootBlocksOrder: Array<string>
): SetBlocksOrderAction {
  return {
    type: SET_BLOCKS_ORDER,
    payload: {
      blocksOrder,
      rootBlocksOrder,
    },
  };
}

function handleSetBlocksOrder(
  state: EditorReduxState,
  { blocksOrder, rootBlocksOrder }: SetBlocksOrderPayload
): EditorReduxState {
  const selectedModule = getSelectedModuleKey(state);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModule]: {
        ...state.modules[selectedModule],
        blocks: updateAllBlocksOrder(
          blocksOrder,
          state.modules[selectedModule].blocks,
          rootBlocksOrder
        ),
      },
    },
  };
}

const SET_BLOCK_PROP_VALUE = 'SET_BLOCK_PROP_VALUE';

type SetBlockPropValuePayload = {
  blockKey: string,
  propKey: string,
  value: any,
};

type SetBlockPropValueAction = {
  type: string,
  payload: SetBlockPropValuePayload,
};

export function setBlockPropValue(
  blockKey: string,
  propKey: string,
  value: string
): SetBlockPropValueAction {
  return {
    type: SET_BLOCK_PROP_VALUE,
    payload: {
      blockKey,
      propKey,
      value,
    },
  };
}

function handleSetBlockPropValue(
  state: EditorReduxState,
  { blockKey, propKey, value }: SetBlockPropValuePayload
): EditorReduxState {
  const selectedModule = getSelectedModuleKey(state);
  const block = getBlockViaKey(state, blockKey);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModule]: {
        ...state.modules[selectedModule],
        blocks: {
          ...state.modules[selectedModule].blocks,
          [blockKey]: updateBlockProp(block, propKey, value),
        },
      },
    },
  };
}

type Actions = SetSelectedBlockAction | SetBlockPropValueAction | SetBlockStyleValueAction;

const ACTION_HANDLERS = {
  [SET_SELECTED_BLOCK]: handleSetSelectedBlock,
  [SET_BLOCK_STYLE_VALUE]: handleSetBlockStyleValue,
  [SET_BLOCK_PROP_VALUE]: handleSetBlockPropValue,
  [SET_BLOCKS_ORDER]: handleSetBlocksOrder,
};

export default function editorReducer(
  state: EditorReduxState = initialEditorReduxState,
  action: Actions
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
