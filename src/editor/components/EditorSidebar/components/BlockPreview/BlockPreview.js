// @flow
import React from 'react';
import { MdArrowForward } from 'react-icons/md';
import { cx } from 'emotion';
import styles from '../../styles';

type Props = {
  type: string,
  label: string,
  selected: boolean,
  blockKey: string,
  selectBlock: (blockKey: string) => void,
  selectModule: () => void,
  isRootBlock?: boolean,
  isModule?: boolean,
  children?: any,
};

const BlockPreview = ({
  type,
  label,
  selected,
  blockKey,
  selectBlock,
  selectModule,
  isRootBlock,
  isModule,
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
      className={styles.blockPreviewInfoClass}
      onClick={e => {
        selectBlock(blockKey);
        e.stopPropagation();
      }}
    >
      <div className={styles.blockPreviewTextClass}>
        <div className={styles.blockPreviewTypeClass}>{type}</div>
        <div className={styles.blockPreviewLabelClass}>{label}</div>
      </div>
      {isModule && (
        <div
          className={styles.blockPreviewEnterClass}
          onClick={e => {
            selectModule();
            e.stopPropagation();
          }}
        >
          <MdArrowForward size="20px" />
        </div>
      )}
    </div>
    {children && <div className={styles.blockPreviewChildrenClass}>{children}</div>}
  </div>
);

BlockPreview.defaultProps = {
  children: undefined,
  isRootBlock: false,
  isModule: false,
};

export default BlockPreview;
