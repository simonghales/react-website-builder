// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditorPagePreviewView from './views/EditorPagePreviewView/EditorPagePreviewView';
import type { ReduxState } from '../../../state/redux/store';
import type { EditorRoutingMatch } from '../../routing';
import { getEditorRoutingMatchParam } from '../../routing';
import { getPageEditorModeFromUIState } from '../../../state/redux/ui/state';
import EditorPageEditView from './views/EditorPageEditView/EditorPageEditView';

export const pageEditorModes = {
  preview: 'preview',
  edit: 'edit',
  modules: 'modules',
};

export type PageEditorModes = $Keys<typeof pageEditorModes>;

export function getPageEditorModeWithMatch(
  mode: PageEditorModes,
  match: EditorRoutingMatch
): PageEditorModes {
  const moduleKey = getEditorRoutingMatchParam('moduleKey', match);
  if (moduleKey) {
    return pageEditorModes.modules;
  }
  return mode;
}

type Props = {
  pageEditorMode: PageEditorModes,
};

class EditorPageView extends Component<Props, {}> {
  render() {
    const { pageEditorMode } = this.props;
    if (pageEditorMode === pageEditorModes.edit) {
      return <EditorPageEditView />;
    }
    return <EditorPagePreviewView />;
  }
}

const mapStateToProps = (state: ReduxState) => ({
  pageEditorMode: getPageEditorModeFromUIState(state.ui),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorPageView);
