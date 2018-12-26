// @flow

import { DUMMY_PAGE_DATA } from '../../../data/redux';
import { getMixinsFromState, getModuleFromState, getModulesFromState } from './state';
import {
  addMixinToBlockStylesMixins,
  addMixinToMixin,
  addNewBlockToBlocks,
  addNewDataBlockProp,
  removeBlockFromBlocks,
  removeBlockStylesMixinViaKey,
  removeMixinFromMixinMixins,
  replaceBlocksWithBlock,
  replaceDataBlockStylesWithMixin,
  updateAllBlocksOrder,
  updateBlockProp,
  updateBlockPropIsLinked,
  updateBlockStyle,
  updateBlockStylesMixinsOrderByKeys,
  updateDataBlockPropConfig,
  updateMixinMixinsOrder,
  updateMixinStyleValue,
  wrapBlockWithBlock,
} from './modifiers';
import type { BlocksOrder } from './modifiers';
import type { DataModule, DataModules } from '../../../data/modules/models';
import type { MixinModel, MixinsModel } from '../../../data/mixins/models';
import { getBlockFromModuleBlocks, getModuleRootBlockKey } from '../../../data/modules/state';
import { getBlockDefaultDataBlock } from '../../../blocks/state';
import type { DataBlockModel } from '../../../data/blocks/models';
import type { PageDataModel, PagesDataModel } from '../../../data/pages/models';
import type { BlockModelPropsConfig } from '../../../blocks/models';
import { getDataBlockPropsConfig } from '../../../editor/components/EditorContent/components/EditorFields/state';
import { getMixinFromMixins } from '../../../data/mixins/state';

export type EditorReduxState = {
  pages: PagesDataModel,
  modules: DataModules,
  mixinStyles: MixinsModel,
};

export const initialEditorReduxState: EditorReduxState = DUMMY_PAGE_DATA;

const SET_EDITOR_REDUX_STATE = 'SET_EDITOR_REDUX_STATE';

type SetEditorReduxStatePayload = {
  state: EditorReduxState,
};

type SetEditorReduxStateAction = {
  type: string,
  payload: SetEditorReduxStatePayload,
};

export function setEditorReduxStateRedux(state: EditorReduxState): SetEditorReduxStateAction {
  console.log('state', state);
  return {
    type: SET_EDITOR_REDUX_STATE,
    payload: {
      state,
    },
  };
}

function handleSetEditorReduxState(
  state: EditorReduxState,
  { state: newState }: SetEditorReduxStatePayload
): EditorReduxState {
  return {
    ...state,
    ...newState,
  };
}

const ADD_NEW_PAGE = 'ADD_NEW_PAGE';

type AddNewPagePayload = {
  page: PageDataModel,
  module: DataModule,
};

type AddNewPageAction = {
  type: string,
  payload: AddNewPagePayload,
};

export function addNewPageReducer(page: PageDataModel, module: DataModule): AddNewPageAction {
  return {
    type: ADD_NEW_PAGE,
    payload: {
      page,
      module,
    },
  };
}

function handleAddNewPageReducer(
  state: EditorReduxState,
  { page, module }: AddNewPagePayload
): EditorReduxState {
  return {
    ...state,
    pages: {
      ...state.pages,
      [page.key]: page,
    },
    modules: {
      ...state.modules,
      [module.key]: module,
    },
  };
}

const WRAP_BLOCK_WITH_NEW_BLOCK = 'WRAP_BLOCK_WITH_NEW_BLOCK';

type WrapBlockWithNewBlockPayload = {
  blockKey: string,
  newBlock: DataBlockModel,
  moduleKey: string,
};

type WrapBlockWithNewBlockAction = {
  type: string,
  payload: WrapBlockWithNewBlockPayload,
};

export function wrapBlockWithNewBlockRedux(
  blockKey: string,
  newBlock: DataBlockModel,
  moduleKey: string
): WrapBlockWithNewBlockAction {
  return {
    type: WRAP_BLOCK_WITH_NEW_BLOCK,
    payload: {
      blockKey,
      newBlock,
      moduleKey,
    },
  };
}

function handleWrapBlockWithNewBlockRedux(
  state: EditorReduxState,
  { blockKey, newBlock, moduleKey }: WrapBlockWithNewBlockPayload
): EditorReduxState {
  const selectedModule = getModuleFromState(state, moduleKey);
  const selectedBlock = getBlockFromModuleBlocks(blockKey, selectedModule);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModule.key]: {
        ...selectedModule,
        blocks: wrapBlockWithBlock(selectedModule.blocks, selectedBlock.key, newBlock),
      },
    },
  };
}

const UPDATE_BLOCK_PROP_CONFIG = 'UPDATE_BLOCK_PROP_CONFIG';

type UpdateBlockPropConfigPayload = {
  propKey: string,
  propConfig: BlockModelPropsConfig,
  moduleKey: string,
  blockKey: string,
};

type UpdateBlockPropConfigAction = {
  type: string,
  payload: UpdateBlockPropConfigPayload,
};

export function updateBlockPropConfig(
  propKey: string,
  propConfig: BlockModelPropsConfig,
  moduleKey: string,
  blockKey: string
): UpdateBlockPropConfigAction {
  return {
    type: UPDATE_BLOCK_PROP_CONFIG,
    payload: {
      propKey,
      propConfig,
      moduleKey,
      blockKey,
    },
  };
}

function handleUpdateBlockPropConfig(
  state: EditorReduxState,
  { propKey, propConfig, moduleKey, blockKey }: UpdateBlockPropConfigPayload
): EditorReduxState {
  const module = getModuleFromState(state, moduleKey);
  const dataBlock = getBlockFromModuleBlocks(blockKey, module);
  const propsConfig = getDataBlockPropsConfig(dataBlock);
  return {
    ...state,
    modules: {
      ...state.modules,
      [module.key]: {
        ...module,
        blocks: {
          ...module.blocks,
          [blockKey]: {
            ...dataBlock,
            propsConfig: updateDataBlockPropConfig(propsConfig, propKey, propConfig),
          },
        },
      },
    },
  };
}

const ADD_NEW_PROP_TO_BLOCK = 'ADD_NEW_PROP_TO_BLOCK';

type AddNewPropToBlockPayload = {
  propKey: string,
  propLabel: string,
  propType: string,
  moduleKey: string,
  blockKey: string,
};

type AddNewPropToBlockAction = {
  type: string,
  payload: AddNewPropToBlockPayload,
};

export function addNewPropToBlock(
  propKey: string,
  propLabel: string,
  propType: string,
  moduleKey: string,
  blockKey: string
): AddNewPropToBlockAction {
  return {
    type: ADD_NEW_PROP_TO_BLOCK,
    payload: {
      propKey,
      propLabel,
      propType,
      moduleKey,
      blockKey,
    },
  };
}

function handleAddNewPropToBlock(
  state: EditorReduxState,
  { propKey, propLabel, propType, moduleKey, blockKey }: AddNewPropToBlockAction
): EditorReduxState {
  const module = getModuleFromState(state, moduleKey);
  const dataBlock = getBlockFromModuleBlocks(blockKey, module);
  return {
    ...state,
    modules: {
      ...state.modules,
      [module.key]: {
        ...module,
        blocks: {
          ...module.blocks,
          [blockKey]: addNewDataBlockProp(dataBlock, propKey, propLabel, propType),
        },
      },
    },
  };
}

const SET_PROP_LINKED_REFERENCE = 'SET_PROP_LINKED_REFERENCE';

type SetPropLinkedReferencePayload = {
  blockKey: string,
  moduleKey: string,
  propKey: string,
  isLinked: boolean,
};

type SetPropLinkedReferenceAction = {
  type: string,
  payload: SetPropLinkedReferencePayload,
};

export function setPropLinkedReference(
  propKey: string,
  isLinked: boolean,
  blockKey: string,
  moduleKey: string
): SetPropLinkedReferenceAction {
  return {
    type: SET_PROP_LINKED_REFERENCE,
    payload: {
      propKey,
      isLinked,
      blockKey,
      moduleKey,
    },
  };
}

function handleSetPropLinkedReference(
  state: EditorReduxState,
  { propKey, isLinked, blockKey, moduleKey }: SetPropLinkedReferencePayload
): EditorReduxState {
  const module = getModuleFromState(state, moduleKey);
  const block = getBlockFromModuleBlocks(blockKey, module);
  return {
    ...state,
    modules: {
      ...state.modules,
      [module.key]: {
        ...module,
        blocks: {
          ...module.blocks,
          [blockKey]: updateBlockPropIsLinked(block, propKey, '', isLinked),
        },
      },
    },
  };
}

const SET_INITIAL_MODULE_HISTORY = 'SET_INITIAL_MODULE_HISTORY';

type SetInitialModuleHistoryPayload = {
  moduleKey: string,
  previousModuleKey: string,
};

type SetInitialModuleHistoryAction = {
  type: string,
  payload: SetInitialModuleHistoryPayload,
};

export function setInitialModuleHistory(
  moduleKey: string,
  previousModuleKey: string
): SetInitialModuleHistoryAction {
  return {
    type: SET_INITIAL_MODULE_HISTORY,
    payload: {
      moduleKey,
      previousModuleKey,
    },
  };
}

function handleSetInitialModuleHistory(
  state: EditorReduxState,
  { moduleKey, previousModuleKey }: SetInitialModuleHistoryPayload
): EditorReduxState {
  const selectedModulesHistory = previousModuleKey ? [previousModuleKey] : [];
  const modules = getModulesFromState(state);
  const selectedModule = modules[moduleKey] ? moduleKey : Object.keys(modules)[0];
  return {
    ...state,
    selectedModule,
    selectedModulesHistory,
  };
}

const REPLACE_BLOCK_STYLES_WITH_MIXIN = 'REPLACE_BLOCK_STYLES_WITH_MIXIN';

type ReplaceBlockStylesWithMixinPayload = {
  moduleKey: string,
  blockKey: string,
  mixinKey: string,
};

type ReplaceBlockStylesWithMixinAction = {
  type: string,
  payload: ReplaceBlockStylesWithMixinPayload,
};

export function replaceBlockStylesWithMixinRedux(
  moduleKey: string,
  blockKey: string,
  mixinKey: string
): ReplaceBlockStylesWithMixinAction {
  return {
    type: REPLACE_BLOCK_STYLES_WITH_MIXIN,
    payload: {
      moduleKey,
      blockKey,
      mixinKey,
    },
  };
}

function handleReplaceBlockStylesWithMixin(
  state: EditorReduxState,
  { moduleKey, blockKey, mixinKey }: ReplaceBlockStylesWithMixinPayload
): EditorReduxState {
  const selectedModule = getModuleFromState(state, moduleKey);
  const block = getBlockFromModuleBlocks(blockKey, selectedModule);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModule.key]: {
        ...selectedModule,
        blocks: {
          ...selectedModule.blocks,
          [blockKey]: replaceDataBlockStylesWithMixin(block, mixinKey),
        },
      },
    },
  };
}

const ADD_NEW_MIXIN = 'ADD_NEW_MIXIN';

type AddNewMixinPayload = {
  mixin: MixinModel,
};

type AddNewMixinAction = {
  type: string,
  payload: AddNewMixinPayload,
};

export function addNewMixinRedux(mixin: MixinModel): AddNewMixinAction {
  return {
    type: ADD_NEW_MIXIN,
    payload: {
      mixin,
    },
  };
}

function handleAddNewMixin(
  state: EditorReduxState,
  { mixin }: AddNewMixinPayload
): EditorReduxState {
  return {
    ...state,
    mixinStyles: {
      ...state.mixinStyles,
      [mixin.key]: mixin,
    },
  };
}

const ADD_MIXIN_TO_MIXIN = 'ADD_MIXIN_TO_MIXIN';

type AddMixinToMixinPayload = {
  mixinKey: string,
  mixinToAddKey: string,
};

type AddMixinToMixinAction = {
  type: string,
  payload: AddMixinToMixinPayload,
};

export function addMixinToMixinRedux(
  mixinKey: string,
  mixinToAddKey: string
): AddMixinToMixinAction {
  return {
    type: ADD_MIXIN_TO_MIXIN,
    payload: {
      mixinKey,
      mixinToAddKey,
    },
  };
}

function handleAddMixinToMixin(
  state: EditorReduxState,
  { mixinKey, mixinToAddKey }: AddMixinToMixinPayload
): EditorReduxState {
  const mixins = getMixinsFromState(state);
  const mixin = getMixinFromMixins(mixinKey, mixins);
  return {
    ...state,
    mixinStyles: {
      ...state.mixinStyles,
      [mixinKey]: addMixinToMixin(mixin, mixinToAddKey),
    },
  };
}

const ADD_MIXIN_TO_BLOCK = 'ADD_MIXIN_TO_BLOCK';

type AddMixinToBlockPayload = {
  blockKey: string,
  mixinKey: string,
  moduleKey: string,
};

type AddMixinToBlockAction = {
  type: string,
  payload: AddMixinToBlockPayload,
};

export function addMixinToBlock(
  blockKey: string,
  mixinKey: string,
  moduleKey: string
): AddMixinToBlockAction {
  return {
    type: ADD_MIXIN_TO_BLOCK,
    payload: {
      blockKey,
      mixinKey,
      moduleKey,
    },
  };
}

function handleAddMixinToBlock(
  state: EditorReduxState,
  { blockKey, mixinKey, moduleKey }: AddMixinToBlockPayload
): EditorReduxState {
  const selectedModule = getModuleFromState(state, moduleKey);
  const block = getBlockFromModuleBlocks(blockKey, selectedModule);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModule.key]: {
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

const UPDATE_MIXIN_MIXINS_ORDER = 'UPDATE_MIXIN_MIXINS_ORDER';

type UpdateMixinMixinsOrderPayload = {
  mixinKey: string,
  mixinKeys: Array<string>,
};

type UpdateMixinMixinsOrderAction = {
  type: string,
  payload: UpdateMixinMixinsOrderPayload,
};

export function updateMixinMixinsOrderRedux(
  mixinKey: string,
  mixinKeys: Array<string>
): UpdateMixinMixinsOrderAction {
  return {
    type: UPDATE_MIXIN_MIXINS_ORDER,
    payload: {
      mixinKey,
      mixinKeys,
    },
  };
}

function handleUpdateMixinMixinsOrder(
  state: EditorReduxState,
  { mixinKey, mixinKeys }: UpdateMixinMixinsOrderPayload
): EditorReduxState {
  const mixins = getMixinsFromState(state);
  const mixin = getMixinFromMixins(mixinKey, mixins);
  return {
    ...state,
    mixinStyles: {
      ...state.mixinStyles,
      [mixinKey]: updateMixinMixinsOrder(mixin, mixinKeys),
    },
  };
}

const UPDATE_BLOCK_STYLES_MIXINS_ORDER = 'UPDATE_BLOCK_STYLES_MIXINS_ORDER';

type UpdateBlockStylesMixinsOrderPayload = {
  blockKey: string,
  mixinKeys: Array<string>,
  moduleKey: string,
};

type UpdateBlockStylesMixinsOrderAction = {
  type: string,
  payload: UpdateBlockStylesMixinsOrderPayload,
};

export function updateBlockStylesMixinsOrder(
  blockKey: string,
  mixinKeys: Array<string>,
  moduleKey: string
): UpdateBlockStylesMixinsOrderAction {
  return {
    type: UPDATE_BLOCK_STYLES_MIXINS_ORDER,
    payload: {
      blockKey,
      mixinKeys,
      moduleKey,
    },
  };
}

function handleUpdateBlockStylesMixinsOrder(
  state: EditorReduxState,
  { blockKey, mixinKeys, moduleKey }: UpdateBlockStylesMixinsOrderPayload
): EditorReduxState {
  const selectedModule = getModuleFromState(state, moduleKey);
  const block = getBlockFromModuleBlocks(blockKey, selectedModule);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModule.key]: {
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

const REMOVE_MIXIN_FROM_MIXINS = 'REMOVE_MIXIN_FROM_MIXINS';

type RemoveMixinFromMixinsPayload = {
  mixinKey: string,
  mixinToRemoveKey: string,
};

type RemoveMixinFromMixinsAction = {
  type: string,
  payload: RemoveMixinFromMixinsPayload,
};

export function removeMixinFromMixinsRedux(
  mixinKey: string,
  mixinToRemoveKey: string
): RemoveMixinFromMixinsAction {
  return {
    type: REMOVE_MIXIN_FROM_MIXINS,
    payload: {
      mixinKey,
      mixinToRemoveKey,
    },
  };
}

function handleRemoveMixinFromMixins(
  state: EditorReduxState,
  { mixinKey, mixinToRemoveKey }: RemoveMixinFromMixinsPayload
): EditorReduxState {
  const mixins = getMixinsFromState(state);
  const mixin = getMixinFromMixins(mixinKey, mixins);
  return {
    ...state,
    mixinStyles: {
      ...state.mixinStyles,
      [mixinKey]: removeMixinFromMixinMixins(mixin, mixinToRemoveKey),
    },
  };
}

const REMOVE_BLOCK_STYLES_MIXIN = 'REMOVE_BLOCK_STYLES_MIXIN';

type RemoveBlockStylesMixinPayload = {
  blockKey: string,
  mixinKey: string,
  moduleKey: string,
};

type RemoveBlockStylesMixinAction = {
  type: string,
  payload: RemoveBlockStylesMixinPayload,
};

export function removeBlockStylesMixin(
  blockKey: string,
  mixinKey: string,
  moduleKey: string
): RemoveBlockStylesMixinAction {
  return {
    type: REMOVE_BLOCK_STYLES_MIXIN,
    payload: {
      blockKey,
      mixinKey,
      moduleKey,
    },
  };
}

function handleRemoveBlockStylesMixin(
  state: EditorReduxState,
  { blockKey, mixinKey, moduleKey }: RemoveBlockStylesMixinPayload
): EditorReduxState {
  const selectedModule = getModuleFromState(state, moduleKey);
  const block = getBlockFromModuleBlocks(blockKey, selectedModule);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModule.key]: {
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

const SET_MIXIN_STYLE_VALUE = 'SET_MIXIN_STYLE_VALUE';

type SetMixinStyleValuePayload = {
  cssKey: string,
  modifier: string,
  section: string,
  value: string,
  mixinKey: string,
};

type SetMixinStyleValueAction = {
  type: string,
  payload: SetMixinStyleValuePayload,
};

export function setMixinStyleValueRedux(
  cssKey: string,
  modifier: string,
  section: string,
  value: string,
  mixinKey: string
): SetMixinStyleValueAction {
  return {
    type: SET_MIXIN_STYLE_VALUE,
    payload: {
      cssKey,
      modifier,
      section,
      value,
      mixinKey,
    },
  };
}

function handleSetMixinStyleValue(
  state: EditorReduxState,
  { cssKey, modifier, section, value, mixinKey }: SetMixinStyleValuePayload
): EditorReduxState {
  const mixins = getMixinsFromState(state);
  const mixin = getMixinFromMixins(mixinKey, mixins);
  return {
    ...state,
    mixinStyles: {
      ...state.mixinStyles,
      [mixinKey]: updateMixinStyleValue(mixin, cssKey, modifier, section, value),
    },
  };
}

const SET_BLOCK_STYLE_VALUE = 'SET_BLOCK_STYLE_VALUE';

type SetBlockStyleValuePayload = {
  blockKey: string,
  cssKey: string,
  moduleKey: string,
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
  value: string,
  moduleKey: string
): SetBlockStyleValueAction {
  return {
    type: SET_BLOCK_STYLE_VALUE,
    payload: {
      blockKey,
      cssKey,
      modifier,
      section,
      value,
      moduleKey,
    },
  };
}

function handleSetBlockStyleValue(
  state: EditorReduxState,
  { blockKey, cssKey, modifier, section, value, moduleKey }: SetBlockStyleValuePayload
): EditorReduxState {
  const selectedModule = getModuleFromState(state, moduleKey);
  const block = getBlockFromModuleBlocks(blockKey, selectedModule);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModule.key]: {
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
  moduleKey: string,
};

type SetBlocksOrderAction = {
  type: string,
  payload: SetBlocksOrderPayload,
};

export function setBlocksOrder(
  blocksOrder: BlocksOrder,
  rootBlocksOrder: Array<string>,
  moduleKey: string
): SetBlocksOrderAction {
  return {
    type: SET_BLOCKS_ORDER,
    payload: {
      blocksOrder,
      rootBlocksOrder,
      moduleKey,
    },
  };
}

function handleSetBlocksOrder(
  state: EditorReduxState,
  { blocksOrder, rootBlocksOrder, moduleKey }: SetBlocksOrderPayload
): EditorReduxState {
  const selectedModule = getModuleFromState(state, moduleKey);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModule.key]: {
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
  moduleKey: string,
  value: any,
};

type SetBlockPropValueAction = {
  type: string,
  payload: SetBlockPropValuePayload,
};

export function setBlockPropValue(
  blockKey: string,
  propKey: string,
  value: string,
  moduleKey: string
): SetBlockPropValueAction {
  return {
    type: SET_BLOCK_PROP_VALUE,
    payload: {
      blockKey,
      propKey,
      moduleKey,
      value,
    },
  };
}

function handleSetBlockPropValue(
  state: EditorReduxState,
  { blockKey, propKey, value, moduleKey }: SetBlockPropValuePayload
): EditorReduxState {
  const selectedModule = getModuleFromState(state, moduleKey);
  const block = getBlockFromModuleBlocks(blockKey, selectedModule);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModule.key]: {
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
  moduleKey: string,
};

type RemoveBlockFromModuleAction = {
  type: string,
  payload: RemoveBlockFromModulePayload,
};

export function removeBlockFromModule(
  blockKey: string,
  moduleKey: string
): RemoveBlockFromModuleAction {
  return {
    type: REMOVE_BLOCK_FROM_MODULE,
    payload: {
      blockKey,
      moduleKey,
    },
  };
}

function handleRemoveBlockFromModule(
  state: EditorReduxState,
  { blockKey, moduleKey }: RemoveBlockFromModulePayload
): EditorReduxState {
  const selectedModule = getModuleFromState(state, moduleKey);
  const rootBlockKey = getModuleRootBlockKey(selectedModule);
  if (blockKey === rootBlockKey) {
    console.warn(`Block to be removed is the root block, which cannot be removed.`);
    return {
      ...state,
    };
  }
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModule.key]: {
        ...selectedModule,
        blocks: removeBlockFromBlocks(selectedModule.blocks, blockKey, true),
      },
    },
  };
}

const ADD_NEW_MODULE = 'ADD_NEW_MODULE';

type AddNewModulePayload = {
  moduleKey: string,
  dataBlock: DataBlockModel,
  selectedBlockKey: string,
};

type AddNewModuleAction = {
  type: string,
  payload: AddNewModulePayload,
};

export function addNewModule(
  moduleKey: string,
  dataBlock: DataBlockModel,
  selectedBlockKey: string
): AddNewModuleAction {
  return {
    type: ADD_NEW_MODULE,
    payload: {
      moduleKey,
      dataBlock,
      selectedBlockKey,
    },
  };
}

function handleAddNewModule(
  state: EditorReduxState,
  { moduleKey, dataBlock, selectedBlockKey }: AddNewModulePayload
): EditorReduxState {
  const module = getModuleFromState(state, moduleKey);
  const rootBlockKey = getModuleRootBlockKey(module);
  const selectedBlock = getBlockFromModuleBlocks(selectedBlockKey, module);
  return {
    ...state,
    modules: {
      ...state.modules,
      [moduleKey]: {
        ...module,
        blocks: addNewBlockToBlocks(module.blocks, rootBlockKey, dataBlock, selectedBlock),
      },
    },
  };
}

const ADD_NEW_BLOCK = 'ADD_NEW_BLOCK';

type AddNewBlockPayload = {
  blockKey: string,
  groupKey: string,
  moduleKey: string,
  selectedBlockKey: string,
};

type AddNewBlockAction = {
  type: string,
  payload: AddNewBlockPayload,
};

export function addNewBlock(
  blockKey: string,
  groupKey: string,
  moduleKey: string,
  selectedBlockKey: string
): AddNewBlockAction {
  return {
    type: ADD_NEW_BLOCK,
    payload: {
      blockKey,
      groupKey,
      moduleKey,
      selectedBlockKey,
    },
  };
}

function handleAddNewBlock(
  state: EditorReduxState,
  { blockKey, groupKey, moduleKey, selectedBlockKey }
): EditorReduxState {
  const module = getModuleFromState(state, moduleKey);
  const dataBlock = getBlockDefaultDataBlock(groupKey, blockKey);
  const rootBlockKey = getModuleRootBlockKey(module);
  const selectedBlock = getBlockFromModuleBlocks(selectedBlockKey, module);
  return {
    ...state,
    modules: {
      ...state.modules,
      [moduleKey]: {
        ...module,
        blocks: addNewBlockToBlocks(module.blocks, rootBlockKey, dataBlock, selectedBlock),
      },
    },
  };
}

const CREATE_NEW_MODULE_FROM_SELECTED_BLOCK = 'CREATE_NEW_MODULE_FROM_SELECTED_BLOCK';

type CreateNewModuleFromSelectedBlockPayload = {
  moduleKey: string,
  blockKey: string,
  newModule: DataModule,
  newBlock: DataBlockModel,
};

type CreateNewModuleFromSelectedBlockAction = {
  type: string,
  payload: CreateNewModuleFromSelectedBlockPayload,
};

export function createNewModuleFromSelectedBlock(
  moduleKey: string,
  blockKey: string,
  newModule: DataModule,
  newBlock: DataBlockModel
): CreateNewModuleFromSelectedBlockAction {
  return {
    type: CREATE_NEW_MODULE_FROM_SELECTED_BLOCK,
    payload: {
      moduleKey,
      blockKey,
      newModule,
      newBlock,
    },
  };
}

function handleCreateNewModuleFromSelectedBlock(
  state: EditorReduxState,
  { moduleKey, blockKey, newModule, newBlock }: CreateNewModuleFromSelectedBlockPayload
): EditorReduxState {
  const selectedModule = getModuleFromState(state, moduleKey);
  const selectedBlock = getBlockFromModuleBlocks(blockKey, selectedModule);
  return {
    ...state,
    modules: {
      ...state.modules,
      [selectedModule.key]: {
        ...selectedModule,
        blocks: replaceBlocksWithBlock(selectedModule.blocks, selectedBlock.key, newBlock),
      },
      [newModule.key]: newModule,
    },
  };
}

type Actions =
  | SetBlockPropValueAction
  | SetBlockStyleValueAction
  | AddNewModuleAction
  | AddNewBlockAction
  | CreateNewModuleFromSelectedBlockAction;

const ACTION_HANDLERS = {
  [SET_EDITOR_REDUX_STATE]: handleSetEditorReduxState,
  [REPLACE_BLOCK_STYLES_WITH_MIXIN]: handleReplaceBlockStylesWithMixin,
  [ADD_NEW_MIXIN]: handleAddNewMixin,
  [ADD_MIXIN_TO_MIXIN]: handleAddMixinToMixin,
  [REMOVE_MIXIN_FROM_MIXINS]: handleRemoveMixinFromMixins,
  [UPDATE_MIXIN_MIXINS_ORDER]: handleUpdateMixinMixinsOrder,
  [SET_MIXIN_STYLE_VALUE]: handleSetMixinStyleValue,
  [WRAP_BLOCK_WITH_NEW_BLOCK]: handleWrapBlockWithNewBlockRedux,
  [ADD_NEW_PAGE]: handleAddNewPageReducer,
  [UPDATE_BLOCK_PROP_CONFIG]: handleUpdateBlockPropConfig,
  [ADD_NEW_PROP_TO_BLOCK]: handleAddNewPropToBlock,
  [SET_PROP_LINKED_REFERENCE]: handleSetPropLinkedReference,
  [SET_INITIAL_MODULE_HISTORY]: handleSetInitialModuleHistory,
  [ADD_MIXIN_TO_BLOCK]: handleAddMixinToBlock,
  [UPDATE_BLOCK_STYLES_MIXINS_ORDER]: handleUpdateBlockStylesMixinsOrder,
  [REMOVE_BLOCK_STYLES_MIXIN]: handleRemoveBlockStylesMixin,
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
