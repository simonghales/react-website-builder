// @flow

export type UiReduxState = {
  addingBlock: boolean,
};

export const initialUiReduxState: UiReduxState = {
  addingBlock: false,
};

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
  [SET_ADDING_BLOCK]: handleSetAddingBlock,
};

export default function uiReducer(state: UiReduxState = initialUiReduxState, action: Actions) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
