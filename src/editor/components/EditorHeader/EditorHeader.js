// @flow
import React from 'react';
import { connect } from 'react-redux';
import PageSelector from './components/PageSelector/PageSelector';
import styles from './styles';
import type { ReduxState } from '../../../state/redux/store';
import { getSelectedPageSelector } from '../../../state/redux/editor/selector';
import type { PageDataModel } from '../../../data/pages/models';

type Props = {
  page: PageDataModel | null,
};

const EditorHeader = ({ page }: Props) => (
  <div className={styles.containerClass}>{page && <PageSelector page={page} />}</div>
);

const mapStateToProps = (state: ReduxState) => ({
  page: getSelectedPageSelector(state),
});

export default connect(mapStateToProps)(EditorHeader);
