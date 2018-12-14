// @flow
import React, { Component } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { cx } from 'emotion';
import styles from './styles';
import IconButton from '../../../../../components/IconButton/IconButton';
import PagePreview from './components/PagePreview/PagePreview';
import type { ReduxState } from '../../../../../state/redux/store';
import {
  getPagesSelector,
  getSelectedPageKeySelector,
} from '../../../../../state/redux/editor/selector';
import type { PageDataModel, PagesDataModel } from '../../../../../data/pages/models';
import type { EditorRoutingMatch } from '../../../../routing';
import { goToPage } from '../../../../routing';
import { getNameSlug } from '../../../../../utils/slugs';
import { setCreatingPageRedux, setPageEditorMode } from '../../../../../state/redux/ui/reducer';
import { pageEditorModes } from '../../../../views/EditorPageView/EditorPageView';
import type { PageEditorModes } from '../../../../views/EditorPageView/EditorPageView';
import { getPageEditorModeFromUIState } from '../../../../../state/redux/ui/state';
import EditorSidebarSlideout from '../EditorSidebarSlideout/EditorSidebarSlideout';
import CreatePageSlideout from './components/CreatePageSlideout/CreatePageSlideout';

type Props = {
  creatingPage: boolean,
  selectedPageKey: string,
  pages: PagesDataModel,
  history: {},
  match: EditorRoutingMatch,
  pageEditorMode: PageEditorModes,
  setPageMode: (mode: PageEditorModes) => void,
  setCreatingPage: (isCreating: boolean) => void,
};

class EditorSidebarPage extends Component<Props> {
  navigateToPage = (page: PageDataModel) => {
    const { match, history } = this.props;
    const pageNameSlug = getNameSlug(page.name);
    goToPage(pageNameSlug, match, history);
  };

  handleToggleMod = () => {
    const { setPageMode, pageEditorMode } = this.props;
    if (pageEditorMode === pageEditorModes.preview) {
      setPageMode(pageEditorModes.edit);
    } else {
      setPageMode(pageEditorModes.preview);
    }
  };

  toggleCreatingPage = () => {
    const { setCreatingPage, creatingPage } = this.props;
    setCreatingPage(!creatingPage);
  };

  handleCloseCreatingPage = () => {
    const { setCreatingPage } = this.props;
    setCreatingPage(false);
  };

  render() {
    const { pages, selectedPageKey, pageEditorMode, creatingPage } = this.props;
    return (
      <div className={styles.containerClass}>
        <div
          className={cx(styles.contentClass, {
            [styles.contentRaisedClass]: creatingPage,
          })}
        >
          <div className={styles.addPageSectionClass}>
            <div className={styles.addPageSectionTextClass} />
            <IconButton
              icon={creatingPage ? <MdClose size={18} /> : <MdAdd size={18} />}
              onClick={this.toggleCreatingPage}
              tooltip={creatingPage ? 'Close' : 'Create a new page'}
              addPreventOffclick
            />
          </div>
          <div>
            {Object.keys(pages).map(pageKey => (
              <PagePreview
                page={pages[pageKey]}
                key={pageKey}
                select={() => {
                  this.navigateToPage(pages[pageKey]);
                }}
                toggleMode={this.handleToggleMod}
                selected={pageKey === selectedPageKey}
                showEditIcon={pageEditorMode === pageEditorModes.preview}
              />
            ))}
          </div>
        </div>
        <EditorSidebarSlideout visible={creatingPage} close={this.handleCloseCreatingPage}>
          <CreatePageSlideout />
        </EditorSidebarSlideout>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  creatingPage: state.ui.creatingPage,
  pages: getPagesSelector(state),
  selectedPageKey: getSelectedPageKeySelector(state),
  pageEditorMode: getPageEditorModeFromUIState(state.ui),
});

const mapDispatchToProps = {
  setCreatingPage: (isCreating: boolean) => setCreatingPageRedux(isCreating),
  setPageMode: (mode: PageEditorModes) => setPageEditorMode(mode),
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditorSidebarPage)
);
