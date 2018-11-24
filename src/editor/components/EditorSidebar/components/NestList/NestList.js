// @flow

import React from 'react';
import Nestable from 'react-nestable';
import { cx } from 'emotion';
import BlockPreview from '../BlockPreview/BlockPreview';
import styles from './styles';
import type { BlocksKeys } from '../../../../../state/redux/editor/selector';

export type CondensedNestItem = {
  id: string,
  blockKey: string,
  children: Array<CondensedNestItem>,
  childrenEnabled: boolean,
  classes: string,
  selected: boolean,
};

function mapBlocksKeysToCondensedNestItems(
  blocksKeys: Array<BlocksKeys>
): Array<CondensedNestItem> {
  return blocksKeys.map(block => ({
    id: block.key,
    blockKey: block.key,
    children: mapBlocksKeysToCondensedNestItems(block.children),
    childrenEnabled: block.childrenEnabled,
    classes: cx({
      [styles.classNames.nestItemSelected]: block.selected,
    }),
    selected: block.selected,
  }));
}

function renderCondensedNestItem({ item }: { item: CondensedNestItem }) {
  const { blockKey, selected } = item;
  return <BlockPreview blockKey={blockKey} selected={selected} />;
}

type Props = {
  blocksKeys: Array<BlocksKeys>,
  onChange: (items: Array<CondensedNestItem>, item: CondensedNestItem) => void,
};

const NestList = ({ blocksKeys, onChange }: Props) => (
  <div className={styles.containerClass}>
    <Nestable
      items={mapBlocksKeysToCondensedNestItems(blocksKeys)}
      renderItem={renderCondensedNestItem}
      onChange={onChange}
      maxDepth={50}
    />
  </div>
);

export default NestList;
