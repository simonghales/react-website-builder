// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';
import type { SitePageDataBlockModel, SitePageDataBlocks } from '../../../data/blocks/models';
import {
  blockPropsConfigTypes,
  getDataBlockLabel,
  getDataBlockType,
} from '../../../data/blocks/models';

function getBlockBlockChildren(block: SitePageDataBlockModel): Array<SitePageDataBlockModel> {
  if (Object.keys(block.props).includes('children')) {
    const propConfig = block.propsConfig.children;
    if (propConfig) {
      if (propConfig.type && propConfig.type === blockPropsConfigTypes.blocks) {
        return block.props.children;
      }
    }
  }
  return [];
}

type BlockPreviewProps = {
  type: string,
  label: string,
  selected: boolean,
  blockChildren: Array<SitePageDataBlockModel>,
};

const BlockPreview = ({ type, label, selected, blockChildren }: BlockPreviewProps) => (
  <div
    className={cx(styles.classNames.block, styles.blockPreviewClass, {
      [styles.selectedBlockClass]: selected,
      [styles.classNames.selectedBlock]: selected,
    })}
  >
    <div className={styles.blockPreviewTextClass}>
      <div className={styles.blockPreviewTypeClass}>{type}</div>
      <div className={styles.blockPreviewLabelClass}>{label}</div>
    </div>
    {blockChildren.length > 0 && (
      <div className={styles.blockPreviewChildrenClass}>
        <BlocksList blocks={blockChildren} />
      </div>
    )}
  </div>
);

const BlocksList = ({ blocks }: { blocks: SitePageDataBlocks }) =>
  blocks.map((block, index) => (
    <BlockPreview
      type={getDataBlockType(block)}
      label={getDataBlockLabel(block)}
      blockChildren={getBlockBlockChildren(block)}
      key={block.key}
      selected={index === 2}
    />
  ));

type Props = {
  blocks: SitePageDataBlocks,
};

const EditorSidebar = ({ blocks }: Props) => (
  <div className={styles.containerClass}>
    <BlocksList blocks={blocks} />
  </div>
);

export default EditorSidebar;
