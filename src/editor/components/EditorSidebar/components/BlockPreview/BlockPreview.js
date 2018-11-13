// @flow
import React from 'react';
import { cx } from 'emotion';
import type { MappedDataBlocks } from '../../../../../data/blocks/models';
import styles from '../../styles';
import BlocksList from '../BlocksList/BlocksList';

type Props = {
  type: string,
  label: string,
  selected: boolean,
  blockChildren: MappedDataBlocks,
  blockKey: string,
  selectBlock: (blockKey: string) => void,
  selectedBlock: string,
  isParentModule: boolean,
};

const BlockPreview = ({
  type,
  label,
  selected,
  blockChildren,
  blockKey,
  selectBlock,
  selectedBlock,
}: Props) => (
  <div
    className={cx(styles.classNames.block, styles.blockPreviewClass, {
      [styles.selectedBlockClass]: selected,
      [styles.classNames.selectedBlock]: selected,
    })}
  >
    <div
      className={styles.blockPreviewTextClass}
      onClick={e => {
        selectBlock(blockKey);
        e.stopPropagation();
      }}
    >
      <div className={styles.blockPreviewTypeClass}>{type}</div>
      <div className={styles.blockPreviewLabelClass}>{label}</div>
    </div>
    {blockChildren.length > 0 && (
      <div className={styles.blockPreviewChildrenClass}>
        <BlocksList
          blocks={blockChildren}
          selectBlock={selectBlock}
          selectedBlock={selectedBlock}
        />
      </div>
    )}
  </div>
);

export default BlockPreview;
