// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from '../../styles';

type Props = {
  type: string,
  label: string,
  selected: boolean,
  blockKey: string,
  selectBlock: (blockKey: string) => void,
  isRootBlock?: boolean,
  children?: any,
};

const BlockPreview = ({
  type,
  label,
  selected,
  blockKey,
  selectBlock,
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
  </div>
);

BlockPreview.defaultProps = {
  children: undefined,
  isRootBlock: false,
};

export default BlockPreview;
