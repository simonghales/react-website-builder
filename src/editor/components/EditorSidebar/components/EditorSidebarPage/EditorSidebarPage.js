// @flow
import React, { Component } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import { setPageEditorMode } from '../../../../../state/redux/ui/reducer';
import { pageEditorModes } from '../../../../views/EditorPageView/EditorPageView';
import type { PageEditorModes } from '../../../../views/EditorPageView/EditorPageView';
import { getPageEditorModeFromUIState } from '../../../../../state/redux/ui/state';

type Props = {
  selectedPageKey: string,
  pages: PagesDataModel,
  history: {},
  match: EditorRoutingMatch,
  pageEditorMode: PageEditorModes,
  setPageMode: (mode: PageEditorModes) => void,
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

  render() {
    const { pages, selectedPageKey, pageEditorMode } = this.props;
    return (
      <div>
        <div className={styles.addPageSectionClass}>
          <div className={styles.addPageSectionTextClass} />
          <IconButton icon={<MdAdd size={18} />} onClick={() => {}} tooltip="Create a new page" />
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
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  pages: getPagesSelector(state),
  selectedPageKey: getSelectedPageKeySelector(state),
  pageEditorMode: getPageEditorModeFromUIState(state.ui),
});

const mapDispatchToProps = {
  setPageMode: (mode: PageEditorModes) => setPageEditorMode(mode),
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditorSidebarPage)
);
