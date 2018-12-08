// @flow
import React from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import { connect } from 'react-redux';
import styles from './styles';
import IconButton from '../../../../../components/IconButton/IconButton';
import PagePreview from './components/PagePreview/PagePreview';
import type { ReduxState } from '../../../../../state/redux/store';
import { getPagesSelector } from '../../../../../state/redux/editor/selector';
import type { PagesDataModel } from '../../../../../data/pages/models';

type Props = {
  pages: PagesDataModel,
};

const EditorSidebarPage = ({ pages }: Props) => (
  <div>
    <div className={styles.addPageSectionClass}>
      <div className={styles.addPageSectionTextClass} />
      <IconButton icon={<MdAdd size={18} />} onClick={() => {}} tooltip="Create a new page" />
    </div>
    <div>
      {Object.keys(pages).map((pageKey, index) => (
        <PagePreview page={pages[pageKey]} key={pageKey} selected={index === 0} />
      ))}
    </div>
  </div>
);

const mapStateToProps = (state: ReduxState) => ({
  pages: getPagesSelector(state),
});

export default connect(mapStateToProps)(EditorSidebarPage);
