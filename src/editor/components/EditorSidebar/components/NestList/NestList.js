// @flow

import React from 'react';
import Nestable from 'react-nestable';
import { cx } from 'emotion';
import type { MappedDataBlockModel, MappedDataBlocks } from '../../../../../data/blocks/models';
import { getDataBlockLabel } from '../../../../../data/blocks/models';
import BlockPreview from '../BlockPreview/BlockPreview';
import styles from './styles';
import { isBlockModuleBlock } from '../../../../../data/blocks/state';

export type NestItem = {
  id: string,
  block: MappedDataBlockModel,
  children: Array<NestItem>,
  selectedBlock: string,
  selectBlock: (blockKey: string) => void,
  selectModule: (moduleKey: string) => void,
  setHoveredBlock: (blockKey: string) => void,
  childrenEnabled: boolean,
  classes: string,
};

function mapBlocksToNestItems(
  blocks: Array<MappedDataBlockModel>,
  selectedBlock: string,
  selectBlock: (blockKey: string) => void,
  selectModule: (moduleKey: string) => void,
  setHoveredBlock: (blockKey: string) => void
): Array<NestItem> {
  return blocks.map((block: MappedDataBlockModel) => {
    const item: NestItem = {
      id: block.key,
      block,
      children: [],
      selectedBlock,
      selectBlock,
      selectModule,
      setHoveredBlock,
      childrenEnabled: block.childrenAllowed,
      classes: cx({
        [styles.classNames.nestItemSelected]: selectedBlock === block.key,
      }),
    };
    if (block.blockChildren) {
      item.children = mapBlocksToNestItems(
        block.blockChildren,
        selectedBlock,
        selectBlock,
        selectModule,
        setHoveredBlock
      );
    }
    return item;
  });
}

function renderNestItem({ item }: { item: NestItem }) {
  const { block, selectedBlock, selectBlock, selectModule, setHoveredBlock } = item;
  return (
    <BlockPreview
      type={block.blockLabel}
      label={getDataBlockLabel(block)}
      blockChildren={[]}
      key={block.key}
      blockKey={block.key}
      selected={selectedBlock === block.key}
      selectBlock={selectBlock}
      selectedBlock={selectedBlock}
      selectModule={() => {
        const { moduleKey } = block;
        if (moduleKey) {
          selectModule(moduleKey);
        }
      }}
      isParentModule={block.isParentModule}
      isModule={isBlockModuleBlock(block)}
      setHoveredBlock={setHoveredBlock}
    />
  );
}

type Props = {
  blocks: MappedDataBlocks,
  onChange: (items: Array<NestItem>, item: NestItem) => void,
  selectedBlock: string,
  selectBlock: (blockKey: string) => void,
  selectModule: (moduleKey: string) => void,
  setHoveredBlock: (blockKey: string) => void,
};

const NestList = ({
  blocks,
  onChange,
  selectedBlock,
  selectBlock,
  selectModule,
  setHoveredBlock,
}: Props) => (
  <div className={styles.containerClass}>
    <Nestable
      items={mapBlocksToNestItems(
        blocks,
        selectedBlock,
        selectBlock,
        selectModule,
        setHoveredBlock
      )}
      renderItem={renderNestItem}
      onChange={onChange}
      maxDepth={50}
    />
  </div>
);

export default NestList;
