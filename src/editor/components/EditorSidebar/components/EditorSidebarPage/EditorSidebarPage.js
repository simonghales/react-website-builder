// @flow
import React from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import styles from './styles';
import IconButton from '../../../../../components/IconButton/IconButton';
import PagePreview from './components/PagePreview/PagePreview';

const EditorSidebarPage = () => (
  <div>
    <div className={styles.addPageSectionClass}>
      <div className={styles.addPageSectionTextClass} />
      <IconButton icon={<MdAdd size={18} />} onClick={() => {}} tooltip="Create a new page" />
    </div>
    <div>
      {Array.from({ length: 5 }).map((page, index) => (
        <PagePreview key={index.toString()} selected={index === 0} />
      ))}
    </div>
  </div>
);

export default EditorSidebarPage;
