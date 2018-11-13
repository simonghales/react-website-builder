// @flow

import type { SitePageDataBlocks } from '../../../data/blocks/models';
import { DUMMY_PAGE_DATA } from '../../../data/blocks/dummy';
import { getBlockViaKey } from './state';
import {
  updateAllBlocksOrder,
  updateBlockProp,
  updateBlocksOrder,
  updateBlockStyle,
} from './modifiers';
import type { BlocksOrder } from './modifiers';

export type EditorReduxState = {
  blocks: SitePageDataBlocks,
  rootBlock: string,
  selectedBlock: string,
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
  const block = getBlockViaKey(state, blockKey);
  return {
    ...state,
    blocks: {
      ...state.blocks,
      [blockKey]: {
        ...block,
        rawStyles: updateBlockStyle(block, modifier, section, cssKey, value),
      },
    },
  };
}

const SET_BLOCKS_ORDER = 'SET_BLOCKS_ORDER';

type SetBlocksOrderPayload = {
  blocksOrder: BlocksOrder,
};

type SetBlocksOrderAction = {
  type: string,
  payload: SetBlocksOrderPayload,
};

export function setBlocksOrder(blocksOrder: BlocksOrder): SetBlocksOrderAction {
  return {
    type: SET_BLOCKS_ORDER,
    payload: {
      blocksOrder,
    },
  };
}

function handleSetBlocksOrder(
  state: EditorReduxState,
  { blocksOrder }: SetBlocksOrderPayload
): EditorReduxState {
  return {
    ...state,
    blocks: updateAllBlocksOrder(blocksOrder, state.blocks),
  };
}

const UPDATE_BLOCK_ORDER = 'UPDATE_BLOCK_ORDER';

type UpdateBlockOrderPayload = {
  targetKey: string,
  destinationKey: string,
  destinationIndex: number,
  sourceKey: string,
};

type UpdateBlockOrderAction = {
  type: string,
  payload: UpdateBlockOrderPayload,
};

export function updateBlockOrder(
  targetKey: string,
  destinationKey: string,
  destinationIndex: number,
  sourceKey: string
): UpdateBlockOrderAction {
  return {
    type: UPDATE_BLOCK_ORDER,
    payload: {
      targetKey,
      destinationKey,
      destinationIndex,
      sourceKey,
    },
  };
}

function handleUpdateBlockOrder(
  state: EditorReduxState,
  { targetKey, destinationKey, destinationIndex, sourceKey }: UpdateBlockOrderPayload
): EditorReduxState {
  return {
    ...state,
    blocks: updateBlocksOrder(targetKey, destinationKey, destinationIndex, sourceKey, state.blocks),
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
  const block = getBlockViaKey(state, blockKey);
  return {
    ...state,
    blocks: {
      ...state.blocks,
      [blockKey]: updateBlockProp(block, propKey, value),
    },
  };
}

type Actions =
  | SetSelectedBlockAction
  | SetBlockPropValueAction
  | SetBlockStyleValueAction
  | UpdateBlockOrderAction;

const ACTION_HANDLERS = {
  [SET_SELECTED_BLOCK]: handleSetSelectedBlock,
  [SET_BLOCK_STYLE_VALUE]: handleSetBlockStyleValue,
  [SET_BLOCK_PROP_VALUE]: handleSetBlockPropValue,
  [UPDATE_BLOCK_ORDER]: handleUpdateBlockOrder,
  [SET_BLOCKS_ORDER]: handleSetBlocksOrder,
};

export default function editorReducer(
  state: EditorReduxState = initialEditorReduxState,
  action: Actions
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
