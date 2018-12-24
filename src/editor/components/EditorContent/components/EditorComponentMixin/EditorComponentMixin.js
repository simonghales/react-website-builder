// @flow
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import EditorStylesView from '../EditorStylesView/EditorStylesView';
import type { ReduxState } from '../../../../../state/redux/store';
import { getCurrentModuleKey, getMixins } from '../../../../../state/redux/editor/selector';
import { getEditorMappedBlockStyles } from '../../../../../data/styles/state';
import {
  getMixinFromMixins,
  getMixinFullMixins,
  getMixinStyles,
} from '../../../../../data/mixins/state';
import EditorComponentMixinMixins from './components/EditorComponentMixinMixins/EditorComponentMixinMixins';
import { setMixinStyleValueRedux } from '../../../../../state/redux/editor/reducer';

const EditorComponentMixin = (props: {}) => {
  const { mixinMixins, mixinKey } = props;
  return (
    <EditorStylesView
      {...props}
      mixinsSection={<EditorComponentMixinMixins mixins={mixinMixins} mixinKey={mixinKey} />}
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

const mapDispatchToProps = {
  dispatchUpdateStyle: (
    cssKey: string,
    modifier: string,
    section: string,
    value: string,
    mixinKey: string
  ) => setMixinStyleValueRedux(cssKey, modifier, section, value, mixinKey),
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  updateStyle: (cssKey: string, modifier: string, section: string, value: string) => {
    dispatchProps.dispatchUpdateStyle(cssKey, modifier, section, value, ownProps.mixinKey);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorComponentMixin);
