// @flow
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { cx } from 'emotion';
import styles from './styles';
import EditorBlockView from '../EditorBlockView/EditorBlockView';
import type { ReduxState } from '../../../state/redux/store';
import {
  getAddingBlockFromUIState,
  getCreatingPageFromUIState,
} from '../../../state/redux/ui/state';
import Tooltip from '../../../components/Tooltip/Tooltip';
import EditorSidebar from '../../components/EditorSidebar/EditorSidebar';
import EditorLogo from '../../components/EditorLogo/EditorLogo';
import EditorHeader from '../../components/EditorHeader/EditorHeader';
import EditorPageView from '../EditorPageView/EditorPageView';
import { editorRoutes, getEditorRoutingMatchParam } from '../../routing';
import { matchPageKeyViaNameSlug } from '../../../data/pages/state';
import type { PageDataModel } from '../../../data/pages/models';
import { getPagesSelector } from '../../../state/redux/editor/selector';
import {
  setAddingBlock,
  setCreatingPageRedux,
  setSelectedPageKey,
} from '../../../state/redux/ui/reducer';
import type { EditorRoutingMatch } from '../../routing';

type Props = {
  showBlocker: boolean,
  completeAddingBlock: () => void,
  completeCreatingPage: () => void,
  match: EditorRoutingMatch,
  selectPage: (pageKey: string) => void,
  pages: PageDataModel,
};

class EditorView extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.checkUrlForPageSlugKey();
  }

  checkUrlForPageSlugKey() {
    const { selectPage, pages, match } = this.props;
    const pageNameSlug = getEditorRoutingMatchParam('pageNameSlug', match);
    const matchedPageKey = matchPageKeyViaNameSlug(pageNameSlug, pages);
    if (matchedPageKey) {
      selectPage(matchedPageKey);
    }
  }

  componentWillReceiveProps(nextProps: Props): void {
    this.checkUpdatedUrlParams(nextProps);
  }

  checkUpdatedUrlParams(nextProps: Props) {
    const { selectPage } = this.props;
    const { pages } = nextProps;
    const pageNameSlug = getEditorRoutingMatchParam('pageNameSlug', nextProps.match);
    const previousPageNameSlug = getEditorRoutingMatchParam('pageNameSlug', this.props.match);
    if (pageNameSlug !== previousPageNameSlug) {
      const matchedPageKey = matchPageKeyViaNameSlug(pageNameSlug, pages);
      if (matchedPageKey) {
        selectPage(matchedPageKey);
      }
    }
  }

  closeSlideouts = () => {
    const { completeAddingBlock, completeCreatingPage } = this.props;
    completeAddingBlock();
    completeCreatingPage();
  };

  render() {
    const { showBlocker } = this.props;
    return (
      <React.Fragment>
        <Tooltip />
        <div className={styles.containerClass}>
          <header className={styles.headerClass}>
            <div className={styles.headerLogoClass}>
              <EditorLogo />
            </div>
            <div className={styles.headerRemainingClass}>
              <EditorHeader />
            </div>
          </header>
          <main className={styles.mainClass}>
            <div className={styles.editorClass}>
              <EditorSidebar />
            </div>
            <div className={styles.previewClass}>
              <div
                className={cx(styles.previewContentClass, {
                  [styles.previewContentDisabledClass]: showBlocker,
                })}
              >
                <Route exact path={editorRoutes.page} component={EditorPageView} />
                <Route exact path={editorRoutes.pageWithModule} component={EditorBlockView} />
              </div>
              {showBlocker && (
                <div className={styles.previewBlockerClass} onClick={this.closeSlideouts} />
              )}
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const addingBlock = getAddingBlockFromUIState(state.ui);
  const creatingPage = getCreatingPageFromUIState(state.ui);
  const pages = getPagesSelector(state);
  return {
    showBlocker: addingBlock || creatingPage,
    pages,
  };
};

const mapDispatchToProps = {
  selectPage: (pageKey: string) => setSelectedPageKey(pageKey),
  completeAddingBlock: () => setAddingBlock(false),
  completeCreatingPage: () => setCreatingPageRedux(false),
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditorView)
);
