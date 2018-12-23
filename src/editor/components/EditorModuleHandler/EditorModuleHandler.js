// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { doesCurrentModuleExistSelector } from '../../../state/redux/editor/selector';
import type { ReduxState } from '../../../state/redux/store';
import type { EditorRoutingMatch } from '../../routing';
import { getEditorRoutingMatchParam, goToPage } from '../../routing';

type Props = {
  children: any,
  isValidModule: boolean,
  redirectOnError?: boolean,
  match: EditorRoutingMatch,
  history: any,
};

class EditorModuleHandler extends Component<Props> {
  static defaultProps = {
    redirectOnError: false,
  };

  handleGoToPage = () => {
    const { match, history } = this.props;
    const pageNameSlug = getEditorRoutingMatchParam('pageNameSlug', match);
    goToPage(pageNameSlug, {}, history);
  };

  render() {
    const { children, isValidModule, redirectOnError } = this.props;
    if (!isValidModule) {
      if (redirectOnError) {
        return (
          <div>
            <div>This module cannot be found.</div>
            <div onClick={this.handleGoToPage}>Return to page</div>
          </div>
        );
      }
      return null;
    }
    return children;
  }
}

const mapStateToProps = (state: ReduxState) => ({
  isValidModule: doesCurrentModuleExistSelector(state),
});

export default withRouter(connect(mapStateToProps)(EditorModuleHandler));
