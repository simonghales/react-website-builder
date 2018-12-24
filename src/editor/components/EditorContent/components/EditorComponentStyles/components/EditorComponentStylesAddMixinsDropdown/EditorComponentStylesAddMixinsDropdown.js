// @flow
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import AddMixinDropdown from '../../../EditorStylesView/components/EditorStylesMixins/components/AddMixinDropdown/AddMixinDropdown';
import type { ReduxState } from '../../../../../../../state/redux/store';
import type { MixinsModel } from '../../../../../../../data/mixins/models';
import { getMixinsFromState, getMixinsKeys } from '../../../../../../../state/redux/editor/state';
import { getAddMixinGroups } from '../../../../../../../data/mixins/models';
import {
  getCurrentModuleKey,
  getSelectedBlockKey,
} from '../../../../../../../state/redux/editor/selector';
import { addMixinToBlock } from '../../../../../../../state/redux/editor/reducer';

const EditorComponentStylesAddMixinsDropdown = (props: {}) => <AddMixinDropdown {...props} />;

const mapStateToProps = (state: ReduxState, { addedMixins }: { addedMixins: MixinsModel }) => {
  const mixins = getMixinsFromState(state.editor);
  const addMixinGroups = getAddMixinGroups(mixins, getMixinsKeys(addedMixins));
  const blockKey = getSelectedBlockKey(state);
  return {
    addMixinGroups,
    blockKey,
    moduleKey: getCurrentModuleKey(state),
  };
};

const mapDispatchToProps = {
  dispatchAddMixin: (blockKey: string, mixinKey: string, moduleKey: string) =>
    addMixinToBlock(blockKey, mixinKey, moduleKey),
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  addMixin: (blockKey: string, mixinKey: string) =>
    dispatchProps.dispatchAddMixin(blockKey, mixinKey, stateProps.moduleKey),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorComponentStylesAddMixinsDropdown);
