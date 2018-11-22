// @flow

import { DUMMY_PAGE_DATA } from '../../../data/redux';
import { getModuleFromState, getModuleTemplatesFromState, getSelectedModuleKey } from './state';
import {
  addMixinToBlockStylesMixins,
  addNewBlockToBlocks,
  removeBlockFromBlocks,
  removeBlockStylesMixinViaKey,
  replaceBlocksWithBlock,
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
  getModuleBlocks,
  getModuleRootBlockKey,
  getSelectedBlockFromModule,
} from '../../../data/modules/state';
import { getBlockDefaultDataBlock, getBlockFromModule } from '../../../blocks/state';
import { getModuleTemplateFromModuleTemplates } from '../../../data/moduleTemplates/state';
import { getBlockBlocks, getBlockParentKey } from '../../../data/blocks/state';
import { generateNewModule } from '../../../data/modules/generator';
import { generateNewModuleTemplate } from '../../../data/moduleTemplates/generator';
import { generateNewModuleTemplateBlock } from '../../../data/blocks/generator';

export type EditorReduxState = {
  modules: DataModules,
  moduleTemplates: ModuleTemplates,
  selectedModule: string,
  selectedModulesHistory: Array<string>,
  mixinStyles: MixinsModel,
  hoveredBlockKey: string,
};

export const initialEditorReduxState: EditorReduxState = DUMMY_PAGE_DATA;

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
  state: EditorReduxState,
  { blockKey }: SetHoveredBlockKeyPayload
): EditorReduxState {
  return {
    ...state,
    hoveredBlockKey: blockKey,
  };
}

const ADD_MIXIN_TO_BLOCK = 'ADD_MIXIN_TO_BLOCK';

type AddMixinToBlockPayload = {
  blockKey: string,
  mixinKey: string,
};

type AddMixinToBlockAction = {
  type: string,
  payload: AddMixinToBlockPayload,
};

export function addMixinToBlock(blockKey: string, mixinKey: string): AddMixinToBlockAction {
  return {
    type: ADD_MIXIN_TO_BLOCK,
    payload: {
      blockKey,
      mixinKey,
    },
  };
}

function handleAddMixinToBlock(
  state: EditorReduxState,
  { blockKey, mixinKey }: AddMixinToBlockPayload
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
            mixinStyles: addMixinToBlockStylesMixins(block, mixinKey),
          },
        },
      },
    },
  };
}

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

const RETURN_TO_PREVIOUS_SELECTED_MODULE = 'RETURN_TO_PREVIOUS_SELECTED_MODULE';

type ReturnToPreviousSelectedModuleAction = {
  type: string,
  payload: {},
};

export function returnToPreviousSelectedModule() {
  return {
    type: RETURN_TO_PREVIOUS_SELECTED_MODULE,
    payload: {},
  };
}

function handleReturnToPreviousSelectedModule(state: EditorReduxState): EditorReduxState {
  const updatedModulesHistory = state.selectedModulesHistory.slice();
  const moduleKey = updatedModulesHistory.pop();
  if (!moduleKey) {
    throw new Error(`No previous module found.`);
  }
  return {
    ...state,
    selectedModule: moduleKey,
    selectedModulesHistory: updatedModulesHistory,
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
  const currentSelectedModuleKey = getSelectedModuleKey(state);
  return {
    ...state,
    selectedModule: moduleKey,
    selectedModulesHistory: state.selectedModulesHistory.concat([currentSelectedModuleKey]),
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

const REMOVE_BLOCK_FROM_MODULE = 'REMOVE_BLOCK_FROM_MODULE';

type RemoveBlockFromModulePayload = {
  blockKey: string,
};

type RemoveBlockFromModuleAction = {
  type: string,
  payload: RemoveBlockFromModulePayload,
};

export function removeBlockFromModule(blockKey: string): RemoveBlockFromModuleAction {
  return {
    type: REMOVE_BLOCK_FROM_MODULE,
    payload: {
      blockKey,
    },
  };
}

function handleRemoveBlockFromModule(
  state: EditorReduxState,
  { blockKey }: RemoveBlockFromModulePayload
): EditorReduxState {
  const selectedModuleKey = getSelectedModuleKey(state);
  const selectedModule = getModuleFromState(state, selectedModuleKey);
  const rootBlockKey = getModuleRootBlockKey(selectedModule);
  if (blockKey === rootBlockKey) {
    console.warn(`Block to be removed is the root block, which cannot be removed.`);
    return {
      ...state,
    };
  }
  const blockToRemoveParentKey = getBlockParentKey(blockKey, selectedModule.blocks);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModuleKey]: {
        ...selectedModule,
        blocks: removeBlockFromBlocks(selectedModule.blocks, blockKey, true),
        selectedBlock: blockToRemoveParentKey,
      },
    },
  };
}

const ADD_NEW_MODULE = 'ADD_NEW_MODULE';

type AddNewModulePayload = {
  newModuleKey: string,
  moduleKey: string,
};

type AddNewModuleAction = {
  type: string,
  payload: AddNewModulePayload,
};

export function addNewModule(newModuleKey: string, moduleKey: string): AddNewModuleAction {
  return {
    type: ADD_NEW_MODULE,
    payload: {
      newModuleKey,
      moduleKey,
    },
  };
}

function handleAddNewModule(
  state: EditorReduxState,
  { newModuleKey, moduleKey }: AddNewModulePayload
): EditorReduxState {
  const module = getModuleFromState(state, moduleKey);
  const moduleTemplates = getModuleTemplatesFromState(state);
  const newModule = getModuleFromState(state, newModuleKey);
  const { moduleTemplateKey } = newModule;
  if (!moduleTemplateKey) {
    throw new Error(`This module ${newModuleKey} does not have an associated template.`);
  }
  const moduleTemplate = getModuleTemplateFromModuleTemplates(moduleTemplateKey, moduleTemplates);
  const dataBlock = getBlockFromModule(moduleTemplate, newModule);
  const rootBlockKey = getModuleRootBlockKey(module);
  const selectedBlock = getSelectedBlockFromModule(module);
  console.log('adding new module', module);
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

const CREATE_NEW_MODULE_FROM_SELECTED_BLOCK = 'CREATE_NEW_MODULE_FROM_SELECTED_BLOCK';

type CreateNewModuleFromSelectedBlockAction = {
  type: string,
  payload: {},
};

export function createNewModuleFromSelectedBlock(): CreateNewModuleFromSelectedBlockAction {
  return {
    type: CREATE_NEW_MODULE_FROM_SELECTED_BLOCK,
    payload: {},
  };
}

function handleCreateNewModuleFromSelectedBlock(state: EditorReduxState): EditorReduxState {
  const selectedModuleKey = getSelectedModuleKey(state);
  const selectedModule = getModuleFromState(state, selectedModuleKey);
  const selectedBlock = getSelectedBlockFromModule(selectedModule);
  const blocks = getModuleBlocks(selectedModule);
  const newModuleBlocks = getBlockBlocks(selectedBlock.key, blocks);
  const newModule = generateNewModule(newModuleBlocks, selectedBlock.key, selectedBlock.label);
  const newModuleTemplate = generateNewModuleTemplate(newModule.key);
  const newBlock = generateNewModuleTemplateBlock(newModuleTemplate.key, selectedBlock.label);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModuleKey]: {
        ...selectedModule,
        blocks: replaceBlocksWithBlock(selectedModule.blocks, selectedBlock.key, newBlock),
        selectedBlock: newBlock.key,
      },
      [newModule.key]: newModule,
    },
    moduleTemplates: {
      ...state.moduleTemplates,
      [newModuleTemplate.key]: newModuleTemplate,
    },
    selectedModule: newModule.key,
    selectedModulesHistory: state.selectedModulesHistory.concat([selectedModuleKey]),
  };
}

type Actions =
  | SetSelectedModuleAction
  | SetSelectedBlockAction
  | SetBlockPropValueAction
  | SetBlockStyleValueAction
  | SetSelectedModuleAction
  | ReturnToPreviousSelectedModuleAction
  | AddNewModuleAction
  | AddNewBlockAction
  | CreateNewModuleFromSelectedBlockAction;

const ACTION_HANDLERS = {
  [SET_HOVERED_BLOCK_KEY]: handleSetHoveredBlockKey,
  [ADD_MIXIN_TO_BLOCK]: handleAddMixinToBlock,
  [UPDATE_BLOCK_STYLES_MIXINS_ORDER]: handleUpdateBlockStylesMixinsOrder,
  [REMOVE_BLOCK_STYLES_MIXIN]: handleRemoveBlockStylesMixin,
  [RETURN_TO_PREVIOUS_SELECTED_MODULE]: handleReturnToPreviousSelectedModule,
  [SET_SELECTED_MODULE]: handleSetSelectedModule,
  [SET_SELECTED_BLOCK]: handleSetSelectedBlock,
  [SET_BLOCK_STYLE_VALUE]: handleSetBlockStyleValue,
  [SET_BLOCK_PROP_VALUE]: handleSetBlockPropValue,
  [SET_BLOCKS_ORDER]: handleSetBlocksOrder,
  [REMOVE_BLOCK_FROM_MODULE]: handleRemoveBlockFromModule,
  [ADD_NEW_MODULE]: handleAddNewModule,
  [ADD_NEW_BLOCK]: handleAddNewBlock,
  [CREATE_NEW_MODULE_FROM_SELECTED_BLOCK]: handleCreateNewModuleFromSelectedBlock,
};

export default function editorReducer(
  state: EditorReduxState = initialEditorReduxState,
  action: Actions
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
