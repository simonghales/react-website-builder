// @flow
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import AddMixinDropdown from '../../../EditorStylesView/components/EditorStylesMixins/components/AddMixinDropdown/AddMixinDropdown';
import type { ReduxState } from '../../../../../../../state/redux/store';
import { getMixinsFromState, getMixinsKeys } from '../../../../../../../state/redux/editor/state';
import { getAddMixinGroups } from '../../../../../../../data/mixins/models';
import type { MixinsModel } from '../../../../../../../data/mixins/models';
import { getEditingMixinKeyFromUIState } from "../../../../../../../state/redux/ui/state";

const EditorComponentMixinAddMixinsDropdown = (props: {}) => <AddMixinDropdown {...props} />;

const mapStateToProps = (state: ReduxState, { addedMixins }: { addedMixins: MixinsModel }) => {
  const selectedMixinKey = getEditingMixinKeyFromUIState(state.ui);
  const mixins = getMixinsFromState(state.editor);
  const addMixinGroups = getAddMixinGroups(mixins, getMixinsKeys(addedMixins), selectedMixinKey);
  return {
    addMixinGroups,
  };
};

const mapDispatchToProps = {};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  addMixin: (blockKey: string, mixinKey: string) => {},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorComponentMixinAddMixinsDropdown);
