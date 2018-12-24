// @flow
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import EditorStylesView from '../EditorStylesView/EditorStylesView';
import type { ReduxState } from '../../../../../state/redux/store';
import {
  getCurrentModuleKey,
  getMixins,
  getSelectedBlockStyle,
} from '../../../../../state/redux/editor/selector';
import { getSelectedModuleSelectedBlockMixins } from '../../../../../state/redux/editor/state';
import { getEditorMappedBlockStyles } from '../../../../../data/styles/state';
import { setBlockStyleValue } from '../../../../../state/redux/editor/reducer';
import {
  getMixinFromMixins,
  getMixinFullMixins,
  getMixinStyles,
} from '../../../../../data/mixins/state';
import EditorComponentStylesMixins from '../EditorComponentStyles/components/EditorComponentStylesMixins/EditorComponentStylesMixins';
import EditorComponentMixinMixins from './components/EditorComponentMixinMixins/EditorComponentMixinMixins';

const EditorComponentMixin = (props: {}) => {
  const { mixinMixins } = props;
  return (
    <EditorStylesView
      {...props}
      mixinsSection={<EditorComponentMixinMixins mixins={mixinMixins} />}
    />
  );
};

const mapStateToProps = (state: ReduxState, { mixinKey }: { mixinKey: string }) => {
  const mixins = getMixins(state);
  const mixin = getMixinFromMixins(mixinKey, mixins);
  const mixinStyles = getMixinStyles(mixin);
  const mixinMixins = getMixinFullMixins(mixin, mixins);
  const editorMappedStyles = getEditorMappedBlockStyles(mixinStyles.styles, mixinMixins, mixins);
  return {
    editorMappedStyles,
    moduleKey: getCurrentModuleKey(state),
    mixinMixins,
  };
};

const mapDispatchToProps = {};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  updateStyle: () => {}, // todo
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorComponentMixin);
