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
  isRootBlock?: boolean,
  children?: any,
};

const BlockPreview = ({
  type,
  label,
  selected,
  blockChildren,
  blockKey,
  selectBlock,
  selectedBlock,
  isRootBlock,
  children,
}: Props) => (
  <div
    className={cx(styles.classNames.block, styles.blockPreviewClass, {
      [styles.selectedBlockClass]: selected,
      [styles.classNames.selectedBlock]: selected,
      [styles.rootBlockPreviewClass]: isRootBlock,
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
    {children && <div className={styles.blockPreviewChildrenClass}>{children}</div>}
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

BlockPreview.defaultProps = {
  children: undefined,
  isRootBlock: false,
};

export default BlockPreview;
