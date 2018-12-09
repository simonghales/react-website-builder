// @flow
import React from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import { connect } from 'react-redux';
import styles from './styles';
import type { PageDataModel } from '../../../../../data/pages/models';
import type { ReduxState } from '../../../../../state/redux/store';
import { getPageEditorModeFromUIState } from '../../../../../state/redux/ui/state';
import { pageEditorModes } from '../../../../views/EditorPageView/EditorPageView';
import type { PageEditorModes } from '../../../../views/EditorPageView/EditorPageView';

const modeIcons = {
  [pageEditorModes.edit]: <MdRemoveRedEye size={18} />,
  [pageEditorModes.preview]: <MdRemoveRedEye size={18} />,
  [pageEditorModes.modules]: <MdRemoveRedEye size={18} />,
};

const getModeIcon = (mode: PageEditorModes) => {
  const icon = modeIcons[mode];
  if (icon) return icon;
  throw new Error(`Couldn't match mode "${mode}" to modeIcons.`);
};

type Props = {
  page: PageDataModel | null,
  pageEditorMode: PageEditorModes,
};

const PageSelector = ({ page, pageEditorMode }: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.iconClass}>{getModeIcon(pageEditorMode)}</div>
    <div>
      <div className={styles.pathClass}>/{page.slug}</div>
      <div className={styles.nameClass}>{page.name}</div>
    </div>
  </div>
);

const mapStateToProps = (state: ReduxState) => ({
  pageEditorMode: getPageEditorModeFromUIState(state.ui),
});

export default connect(mapStateToProps)(PageSelector);
