// @flow
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import EditorStylesMixins from '../../../EditorStylesView/components/EditorStylesMixins/EditorStylesMixins';
import type { ReduxState } from '../../../../../../../state/redux/store';
import EditorComponentMixinAddMixinsDropdown from '../EditorComponentMixinAddMixinsDropdown/EditorComponentMixinAddMixinsDropdown';
import {
  removeMixinFromMixinsRedux,
  updateMixinMixinsOrderRedux,
} from '../../../../../../../state/redux/editor/reducer';

const EditorComponentMixinMixins = (props: {}) => (
  <EditorStylesMixins {...props} AddMixinsDropdown={EditorComponentMixinAddMixinsDropdown} />
);

const mapStateToProps = (state: ReduxState) => ({});

const mapDispatchToProps = {
  dispatchUpdateMixinsOrder: (mixinKey: string, mixinKeys: Array<string>) =>
    updateMixinMixinsOrderRedux(mixinKey, mixinKeys),
  dispatchRemoveMixin: (mixinKey: string, mixinToRemoveKey: string) =>
    removeMixinFromMixinsRedux(mixinKey, mixinToRemoveKey),
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  updateMixinsOrder: (mixinKeys: Array<string>) =>
    dispatchProps.dispatchUpdateMixinsOrder(ownProps.mixinKey, mixinKeys),
  removeMixin: (mixinToRemoveKey: string) =>
    dispatchProps.dispatchRemoveMixin(ownProps.mixinKey, mixinToRemoveKey),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorComponentMixinMixins);
