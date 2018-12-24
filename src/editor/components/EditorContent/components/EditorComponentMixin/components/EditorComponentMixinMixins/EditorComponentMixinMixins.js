// @flow
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import EditorStylesMixins from '../../../EditorStylesView/components/EditorStylesMixins/EditorStylesMixins';
import type { ReduxState } from '../../../../../../../state/redux/store';
import { getSelectedModuleSelectedBlockMappedMixins } from '../../../../../../../state/redux/editor/state';
import { getCurrentModuleKey } from '../../../../../../../state/redux/editor/selector';
import {
  removeBlockStylesMixin,
  updateBlockStylesMixinsOrder,
} from '../../../../../../../state/redux/editor/reducer';
import EditorComponentMixinAddMixinsDropdown from '../EditorComponentMixinAddMixinsDropdown/EditorComponentMixinAddMixinsDropdown';

const EditorComponentMixinMixins = (props: {}) => (
  <EditorStylesMixins {...props} AddMixinsDropdown={EditorComponentMixinAddMixinsDropdown} />
);

const mapStateToProps = (state: ReduxState) => ({});

const mapDispatchToProps = {};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  updateMixinsOrder: (blockKey: string, mixinKeys: Array<string>) => {}, // todo
  removeMixin: (blockKey: string, mixinKey: string) => {}, // todo
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorComponentMixinMixins);
