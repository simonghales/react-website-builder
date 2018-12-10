// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageSelector from './components/PageSelector/PageSelector';
import styles from './styles';
import type { ReduxState } from '../../../state/redux/store';
import { getSelectedPageSelector } from '../../../state/redux/editor/selector';
import type { PageDataModel } from '../../../data/pages/models';
import { getPageEditorModeFromUIState } from '../../../state/redux/ui/state';
import type { PageEditorModes } from '../../views/EditorPageView/EditorPageView';

type Props = {
  page: PageDataModel | null,
  pageEditorMode: PageEditorModes,
};

const EditorHeader = ({ page, pageEditorMode }: Props) => (
  <div className={styles.containerClass}>
    {page && <PageSelector page={page} pageEditorMode={pageEditorMode} />}
  </div>
);

const mapStateToProps = (state: ReduxState) => ({
  page: getSelectedPageSelector(state),
  pageEditorMode: getPageEditorModeFromUIState(state.ui),
});

export default withRouter(connect(mapStateToProps)(EditorHeader));
