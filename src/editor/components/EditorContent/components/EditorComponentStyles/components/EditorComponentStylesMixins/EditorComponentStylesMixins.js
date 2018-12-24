// @flow
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import EditorStylesMixins from '../../../EditorStylesView/components/EditorStylesMixins/EditorStylesMixins';
import type { ReduxState } from '../../../../../../../state/redux/store';
import { getSelectedModuleSelectedBlockMappedMixins } from '../../../../../../../state/redux/editor/state';
import {
  getCurrentModuleKey,
  getSelectedBlock,
} from '../../../../../../../state/redux/editor/selector';
import {
  removeBlockStylesMixin,
  updateBlockStylesMixinsOrder,
} from '../../../../../../../state/redux/editor/reducer';
import EditorComponentStylesAddMixinsDropdown from '../EditorComponentStylesAddMixinsDropdown/EditorComponentStylesAddMixinsDropdown';
import { dispatchConvertDataBlockStylesToMixin } from '../../../../../../../state/redux/shared/dispatch';
import type { DataBlockModel } from '../../../../../../../data/blocks/models';

const EditorComponentStylesMixins = (props: {}) => (
  <EditorStylesMixins
    {...props}
    createMixinEnabled
    AddMixinsDropdown={EditorComponentStylesAddMixinsDropdown}
  />
);

const mapStateToProps = (state: ReduxState) => {
  const dataBlock = getSelectedBlock(state);
  return {
    mixins: getSelectedModuleSelectedBlockMappedMixins(state),
    moduleKey: getCurrentModuleKey(state),
    dataBlock,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchCreateMixin: (dataBlock: DataBlockModel, moduleKey: string) =>
    dispatchConvertDataBlockStylesToMixin(dataBlock, moduleKey, dispatch),
  dispatchUpdateMixinsOrder: (blockKey: string, mixinKeys: Array<string>, moduleKey: string) =>
    dispatch(updateBlockStylesMixinsOrder(blockKey, mixinKeys, moduleKey)),
  dispatchRemoveMixin: (blockKey: string, mixinKey: string, moduleKey: string) =>
    dispatch(removeBlockStylesMixin(blockKey, mixinKey, moduleKey)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  createMixin: () => dispatchProps.dispatchCreateMixin(stateProps.dataBlock, stateProps.moduleKey),
  updateMixinsOrder: (mixinKeys: Array<string>) =>
    dispatchProps.dispatchUpdateMixinsOrder(ownProps.blockKey, mixinKeys, stateProps.moduleKey),
  removeMixin: (mixinKey: string) =>
    dispatchProps.dispatchRemoveMixin(ownProps.blockKey, mixinKey, stateProps.moduleKey),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorComponentStylesMixins);
