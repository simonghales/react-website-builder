// @flow
import React from 'react';
import { connect } from 'react-redux';
import { MdArrowForward } from 'react-icons/md';
import { cx } from 'emotion';
import styles from '../BlocksManager/styles';
import type { ReduxState } from '../../../../../state/redux/store';
import { getDataBlockPreviewProps } from '../../../../../state/redux/editor/state';
import { setHoveredBlockKey } from '../../../../../state/redux/ui/reducer';
import { setSelectedBlock, setSelectedModule } from '../../../../../state/redux/editor/reducer';

type Props = {
  type: string,
  label: string,
  selected: boolean,
  blockKey: string,
  moduleKey: string,
  selectBlock: (blockKey: string) => void,
  selectModule: (moduleKey: string) => void,
  setHoveredBlock: (blockKey: string) => void,
  navigateToModule: (moduleKey: string) => void,
  isRootBlock?: boolean,
  isModule?: boolean,
  children?: any,
};

const BlockPreview = ({
  type,
  label,
  selected,
  blockKey,
  moduleKey,
  selectBlock,
  selectModule,
  navigateToModule,
  setHoveredBlock,
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
    onMouseEnter={() => {
      setHoveredBlock(blockKey);
    }}
    onMouseLeave={() => {
      setHoveredBlock('');
    }}
  >
    <div
      className={cx(styles.blockPreviewInfoClass, {
        [styles.classNames.notSelectedBlock]: !selected,
      })}
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
          className={cx(styles.blockPreviewEnterClass, {
            [styles.blockPreviewEnterSelectedClass]: selected,
          })}
          onClick={e => {
            navigateToModule(moduleKey);
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

const mapStateToProps = (state: ReduxState, { blockKey }: { blockKey: string }) => {
  const blockPreviewProps = getDataBlockPreviewProps(state.editor, blockKey);
  return {
    type: blockPreviewProps.type,
    label: blockPreviewProps.label,
    isRootBlock: blockPreviewProps.isRootBlock,
    isModule: blockPreviewProps.isModule,
    moduleKey: blockPreviewProps.moduleKey,
  };
};

const mapDispatchToProps = {
  setHoveredBlock: (blockKey: string) => setHoveredBlockKey(blockKey),
  selectBlock: (blockKey: string) => setSelectedBlock(blockKey),
  selectModule: (moduleKey: string) => setSelectedModule(moduleKey),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockPreview);
