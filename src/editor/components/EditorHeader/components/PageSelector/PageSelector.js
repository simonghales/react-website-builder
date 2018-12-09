// @flow
import React from 'react';
import { MdRemoveRedEye, MdCreate, MdViewList } from 'react-icons/md';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './styles';
import type { PageDataModel } from '../../../../../data/pages/models';
import type { ReduxState } from '../../../../../state/redux/store';
import { getPageEditorModeFromUIState } from '../../../../../state/redux/ui/state';
import {
  getPageEditorModeWithMatch,
  pageEditorModes,
} from '../../../../views/EditorPageView/EditorPageView';
import type { PageEditorModes } from '../../../../views/EditorPageView/EditorPageView';
import type { EditorRoutingMatch } from '../../../../routing';

const modeIcons = {
  [pageEditorModes.edit]: <MdCreate size={18} />,
  [pageEditorModes.preview]: <MdRemoveRedEye size={18} />,
  [pageEditorModes.modules]: <MdViewList size={18} />,
};

const getModeIcon = (mode: PageEditorModes) => {
  const icon = modeIcons[mode];
  if (icon) return icon;
  throw new Error(`Couldn't match mode "${mode}" to modeIcons.`);
};

type Props = {
  pageEditorMode: PageEditorModes,
  page: PageDataModel | null,
  match: EditorRoutingMatch,
};

const PageSelector = ({ page, pageEditorMode, match }: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.iconClass}>
      {getModeIcon(getPageEditorModeWithMatch(pageEditorMode, match))}
    </div>
    <div>
      <div className={styles.pathClass}>/{page.slug}</div>
      <div className={styles.nameClass}>{page.name}</div>
    </div>
  </div>
);

const mapStateToProps = (state: ReduxState) => ({
  pageEditorMode: getPageEditorModeFromUIState(state.ui),
});

export default withRouter(connect(mapStateToProps)(PageSelector));
