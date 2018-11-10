// @flow
import React from 'react';
import styles from './styles';
import EditorComponentTabs from './components/EditorComponentTabs/EditorComponentTabs';
import EditorComponentProps from './components/EditorComponentProps/EditorComponentProps';
import Button, { buttonTypes } from '../../../components/Button/Button';
import type { SitePageDataBlockModel } from '../../../data/blocks/models';

type Props = {
  selectedBlock: SitePageDataBlockModel,
};

const EditorContent = ({ selectedBlock }: Props) => (
  <div className={styles.containerClass}>
    <EditorComponentTabs />
    <div className={styles.mainClass}>
      <div className={styles.addPropClass}>
        <Button type={buttonTypes.slim}>Add Prop</Button>
      </div>
      <EditorComponentProps selectedBlock={selectedBlock} />
    </div>
  </div>
);

export default EditorContent;
