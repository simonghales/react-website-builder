// @flow
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import AddMixinDropdown from '../../../EditorStylesView/components/EditorStylesMixins/components/AddMixinDropdown/AddMixinDropdown';
import type { ReduxState } from '../../../../../../../state/redux/store';
import { getMixinsFromState, getMixinsKeys } from '../../../../../../../state/redux/editor/state';
import { getAddMixinGroups } from '../../../../../../../data/mixins/models';
import type { MixinsModel } from '../../../../../../../data/mixins/models';
import { getEditingMixinKeyFromUIState } from '../../../../../../../state/redux/ui/state';
import { addMixinToMixinRedux } from '../../../../../../../state/redux/editor/reducer';

const EditorComponentMixinAddMixinsDropdown = (props: {}) => <AddMixinDropdown {...props} />;

const mapStateToProps = (state: ReduxState, { addedMixins }: { addedMixins: MixinsModel }) => {
  const selectedMixinKey = getEditingMixinKeyFromUIState(state.ui);
  const mixins = getMixinsFromState(state.editor);
  const addMixinGroups = getAddMixinGroups(mixins, getMixinsKeys(addedMixins), selectedMixinKey);
  return {
    selectedMixinKey,
    addMixinGroups,
  };
};

const mapDispatchToProps = {
  dispatchAddMixin: (mixinKey: string, mixinToAddKey: string) =>
    addMixinToMixinRedux(mixinKey, mixinToAddKey),
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  addMixin: (mixinToAddKey: string) =>
    dispatchProps.dispatchAddMixin(stateProps.selectedMixinKey, mixinToAddKey),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorComponentMixinAddMixinsDropdown);
