// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditorPagePreviewView from './views/EditorPagePreviewView/EditorPagePreviewView';
import type { ReduxState } from '../../../state/redux/store';

type Props = {};

class EditorPageView extends Component<Props, {}> {
  render() {
    return <EditorPagePreviewView />;
  }
}

const mapStateToProps = (state: ReduxState) => {};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorPageView);
