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
import EditorComponentStylesMixins from './components/EditorComponentStylesMixins/EditorComponentStylesMixins';

const EditorComponentStyles = (props: {}) => {
  const { blockKey } = props;
  return (
    <EditorStylesView
      {...props}
      mixinsSection={<EditorComponentStylesMixins blockKey={blockKey} />}
    />
  );
};

const mapStateToProps = (state: ReduxState) => {
  const mixins = getMixins(state);
  const blockStyles = getSelectedBlockStyle(state);
  const blockMixins = getSelectedModuleSelectedBlockMixins(state);
  const editorMappedStyles = getEditorMappedBlockStyles(blockStyles.styles, blockMixins, mixins);
  return {
    editorMappedStyles,
    moduleKey: getCurrentModuleKey(state),
  };
};

const mapDispatchToProps = {
  dispatchUpdateStyle: (
    blockKey: string,
    cssKey: string,
    modifier: string,
    section: string,
    value: string,
    moduleKey: string
  ) => setBlockStyleValue(blockKey, cssKey, modifier, section, value, moduleKey),
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  updateStyle: (cssKey: string, modifier: string, section: string, value: string) =>
    dispatchProps.dispatchUpdateStyle(
      ownProps.blockKey,
      cssKey,
      modifier,
      section,
      value,
      stateProps.moduleKey
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorComponentStyles);
