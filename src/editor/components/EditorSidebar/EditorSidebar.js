// @flow
import React from 'react';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import styles from './styles';
import type { DataBlockModelMapped, MappedDataBlocks } from '../../../data/blocks/models';
import { getDataBlockLabel, getDataBlockType } from '../../../data/blocks/models';
import type { ReduxState } from '../../../state/redux/store';
import { getEditorMappedBlocks, getSelectedBlockKey } from '../../../state/redux/editor/state';
import { setSelectedBlock } from '../../../state/redux/editor/reducer';

function getBlockBlockChildren(block: DataBlockModelMapped): Array<DataBlockModelMapped> {
  return block.blockChildren ? block.blockChildren : [];
}

type BlockPreviewProps = {
  type: string,
  label: string,
  selected: boolean,
  blockChildren: MappedDataBlocks,
  blockKey: string,
  selectBlock: (blockKey: string) => void,
  selectedBlock: string,
};

const BlockPreview = ({
  type,
  label,
  selected,
  blockChildren,
  blockKey,
  selectBlock,
  selectedBlock,
}: BlockPreviewProps) => (
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

type BlocksListProps = {
  blocks: MappedDataBlocks,
  selectBlock: (blockKey: string) => void,
  selectedBlock: string,
};

const BlocksList = ({ blocks, selectBlock, selectedBlock }: BlocksListProps) =>
  blocks.map(block => (
    <BlockPreview
      type={getDataBlockType(block)}
      label={getDataBlockLabel(block)}
      blockChildren={getBlockBlockChildren(block)}
      key={block.key}
      blockKey={block.key}
      selected={selectedBlock === block.key}
      selectBlock={selectBlock}
      selectedBlock={selectedBlock}
    />
  ));

type Props = {
  blocks: MappedDataBlocks,
  selectBlock: (blockKey: string) => void,
  selectedBlock: string,
};

const EditorSidebar = ({ blocks, selectBlock, selectedBlock }: Props) => (
  <div className={styles.containerClass}>
    <BlocksList blocks={blocks} selectBlock={selectBlock} selectedBlock={selectedBlock} />
  </div>
);

const mapStateToProps = (state: ReduxState) => ({
  blocks: getEditorMappedBlocks(state.editor),
  selectedBlock: getSelectedBlockKey(state.editor),
});

const mapDispatchToProps = {
  selectBlock: (blockKey: string) => setSelectedBlock(blockKey),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorSidebar);
