// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Nestable from 'react-nestable';
import { cx } from 'emotion';
import BlockPreview from '../BlockPreview/BlockPreview';
import styles from './styles';
import type { BlocksKeys } from '../../../../../../../state/redux/editor/selector';
import { goToModule } from '../../../../../../routing';

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

function renderCondensedNestItem(
  { item }: { item: CondensedNestItem },
  navigateToModule: (moduleKey: string) => void
) {
  const { blockKey, selected } = item;
  return (
    <BlockPreview blockKey={blockKey} selected={selected} navigateToModule={navigateToModule} />
  );
}

type Props = {
  blocksKeys: Array<BlocksKeys>,
  currentModuleKey: string,
  onChange: (items: Array<CondensedNestItem>, item: CondensedNestItem) => void,
  history: any,
};

class NestList extends Component<Props> {
  navigateToModule = (moduleKey: string) => {
    const { currentModuleKey, history } = this.props;
    goToModule(moduleKey, currentModuleKey, history);
  };

  handleRenderItem = item => renderCondensedNestItem(item, this.navigateToModule);

  render() {
    const { blocksKeys, onChange } = this.props;
    return (
      <div className={styles.containerClass}>
        <Nestable
          items={mapBlocksKeysToCondensedNestItems(blocksKeys)}
          renderItem={this.handleRenderItem}
          onChange={onChange}
          maxDepth={50}
        />
      </div>
    );
  }
}

export default withRouter(NestList);
