// @flow

import { DUMMY_PAGE_DATA } from '../../../data/redux';
import { getModuleFromState, getSelectedModuleKey } from './state';
import {
  addNewBlockToBlocks,
  removeBlockStylesMixinViaKey,
  updateAllBlocksOrder,
  updateBlockProp,
  updateBlockStyle,
  updateBlockStylesMixinsOrderByKeys,
} from './modifiers';
import type { BlocksOrder } from './modifiers';
import type { ModuleTemplates } from '../../../data/moduleTemplates/models';
import type { DataModules } from '../../../data/modules/models';
import type { MixinsModel } from '../../../data/mixins/models';
import {
  getBlockFromModuleBlocks,
  getModuleRootBlockKey,
  getSelectedBlockFromModule,
  getSelectedBlockKeyFromModule,
} from '../../../data/modules/state';
import { getBlockDefaultDataBlock } from '../../../blocks/state';

export type EditorReduxState = {
  modules: DataModules,
  moduleTemplates: ModuleTemplates,
  selectedModule: string,
  mixinStyles: MixinsModel,
};

export const initialEditorReduxState: EditorReduxState = DUMMY_PAGE_DATA;

const UPDATE_BLOCK_STYLES_MIXINS_ORDER = 'UPDATE_BLOCK_STYLES_MIXINS_ORDER';

type UpdateBlockStylesMixinsOrderPayload = {
  blockKey: string,
  mixinKeys: Array<string>,
};

type UpdateBlockStylesMixinsOrderAction = {
  type: string,
  payload: UpdateBlockStylesMixinsOrderPayload,
};

export function updateBlockStylesMixinsOrder(
  blockKey: string,
  mixinKeys: Array<string>
): UpdateBlockStylesMixinsOrderAction {
  return {
    type: UPDATE_BLOCK_STYLES_MIXINS_ORDER,
    payload: {
      blockKey,
      mixinKeys,
    },
  };
}

function handleUpdateBlockStylesMixinsOrder(
  state: EditorReduxState,
  { blockKey, mixinKeys }: UpdateBlockStylesMixinsOrderPayload
): EditorReduxState {
  const selectedModuleKey = getSelectedModuleKey(state);
  const selectedModule = getModuleFromState(state, selectedModuleKey);
  const block = getBlockFromModuleBlocks(blockKey, selectedModule);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModuleKey]: {
        ...selectedModule,
        blocks: {
          ...selectedModule.blocks,
          [blockKey]: {
            ...block,
            mixinStyles: updateBlockStylesMixinsOrderByKeys(block, mixinKeys),
          },
        },
      },
    },
  };
}

const REMOVE_BLOCK_STYLES_MIXIN = 'REMOVE_BLOCK_STYLES_MIXIN';

type RemoveBlockStylesMixinPayload = {
  blockKey: string,
  mixinKey: string,
};

type RemoveBlockStylesMixinAction = {
  type: string,
  payload: RemoveBlockStylesMixinPayload,
};

export function removeBlockStylesMixin(
  blockKey: string,
  mixinKey: string
): RemoveBlockStylesMixinAction {
  return {
    type: REMOVE_BLOCK_STYLES_MIXIN,
    payload: {
      blockKey,
      mixinKey,
    },
  };
}

function handleRemoveBlockStylesMixin(
  state: EditorReduxState,
  { blockKey, mixinKey }: RemoveBlockStylesMixinPayload
): EditorReduxState {
  const selectedModuleKey = getSelectedModuleKey(state);
  const selectedModule = getModuleFromState(state, selectedModuleKey);
  const block = getBlockFromModuleBlocks(blockKey, selectedModule);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModuleKey]: {
        ...selectedModule,
        blocks: {
          ...selectedModule.blocks,
          [blockKey]: {
            ...block,
            mixinStyles: removeBlockStylesMixinViaKey(block, mixinKey),
          },
        },
      },
    },
  };
}

const SET_SELECTED_MODULE = 'SET_SELECTED_MODULE';

type SetSelectedModulePayload = {
  moduleKey: string,
};

type SetSelectedModuleAction = {
  type: string,
  payload: SetSelectedModulePayload,
};

export function setSelectedModule(moduleKey: string): SetSelectedModuleAction {
  return {
    type: SET_SELECTED_MODULE,
    payload: {
      moduleKey,
    },
  };
}

function handleSetSelectedModule(
  state: EditorReduxState,
  { moduleKey }: SetSelectedModulePayload
): EditorReduxState {
  return {
    ...state,
    selectedModule: moduleKey,
  };
}

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
  const selectedModuleKey = getSelectedModuleKey(state);
  const selectedModule = getModuleFromState(state, selectedModuleKey);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModuleKey]: {
        ...selectedModule,
        selectedBlock: blockKey,
      },
    },
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
  const selectedModuleKey = getSelectedModuleKey(state);
  const selectedModule = getModuleFromState(state, selectedModuleKey);
  const block = getBlockFromModuleBlocks(blockKey, selectedModule);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModuleKey]: {
        ...selectedModule,
        blocks: {
          ...selectedModule.blocks,
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
  const selectedModuleKey = getSelectedModuleKey(state);
  const selectedModule = getModuleFromState(state, selectedModuleKey);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModuleKey]: {
        ...selectedModule,
        blocks: updateAllBlocksOrder(blocksOrder, selectedModule.blocks, rootBlocksOrder),
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
  const selectedModuleKey = getSelectedModuleKey(state);
  const selectedModule = getModuleFromState(state, selectedModuleKey);
  const block = getBlockFromModuleBlocks(blockKey, selectedModule);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModuleKey]: {
        ...selectedModule,
        blocks: {
          ...selectedModule.blocks,
          [blockKey]: updateBlockProp(block, propKey, value),
        },
      },
    },
  };
}

const ADD_NEW_MODULE = 'ADD_NEW_MODULE';

type AddNewModulePayload = {
  newModuleKey: string,
  groupKey: string,
  moduleKey: string,
};

type AddNewModuleAction = {
  type: string,
  payload: AddNewModulePayload,
};

export function addNewModule(
  newModuleKey: string,
  groupKey: string,
  moduleKey: string
): AddNewModuleAction {
  return {
    type: ADD_NEW_MODULE,
    payload: {
      newModuleKey,
      groupKey,
      moduleKey,
    },
  };
}

const ADD_NEW_BLOCK = 'ADD_NEW_BLOCK';

type AddNewBlockPayload = {
  blockKey: string,
  groupKey: string,
  moduleKey: string,
};

type AddNewBlockAction = {
  type: string,
  payload: AddNewBlockPayload,
};

export function addNewBlock(
  blockKey: string,
  groupKey: string,
  moduleKey: string
): AddNewBlockAction {
  return {
    type: ADD_NEW_BLOCK,
    payload: {
      blockKey,
      groupKey,
      moduleKey,
    },
  };
}

function handleAddNewBlock(
  state: EditorReduxState,
  { blockKey, groupKey, moduleKey }
): EditorReduxState {
  const module = getModuleFromState(state, moduleKey);
  const dataBlock = getBlockDefaultDataBlock(groupKey, blockKey);
  const rootBlockKey = getModuleRootBlockKey(module);
  const selectedBlock = getSelectedBlockFromModule(module);
  return {
    ...state,
    modules: {
      ...state.modules,
      [moduleKey]: {
        ...module,
        blocks: addNewBlockToBlocks(module.blocks, rootBlockKey, dataBlock, selectedBlock),
        selectedBlock: dataBlock.key,
      },
    },
  };
}

type Actions =
  | SetSelectedModuleAction
  | SetSelectedBlockAction
  | SetBlockPropValueAction
  | SetBlockStyleValueAction
  | AddNewBlockAction;

const ACTION_HANDLERS = {
  [UPDATE_BLOCK_STYLES_MIXINS_ORDER]: handleUpdateBlockStylesMixinsOrder,
  [REMOVE_BLOCK_STYLES_MIXIN]: handleRemoveBlockStylesMixin,
  [SET_SELECTED_MODULE]: handleSetSelectedModule,
  [SET_SELECTED_BLOCK]: handleSetSelectedBlock,
  [SET_BLOCK_STYLE_VALUE]: handleSetBlockStyleValue,
  [SET_BLOCK_PROP_VALUE]: handleSetBlockPropValue,
  [SET_BLOCKS_ORDER]: handleSetBlocksOrder,
  [ADD_NEW_BLOCK]: handleAddNewBlock,
};

export default function editorReducer(
  state: EditorReduxState = initialEditorReduxState,
  action: Actions
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
