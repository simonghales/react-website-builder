// @flow
import React from 'react';
import { MdTitle } from 'react-icons/md';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import styles from './styles';
import type { ReduxState } from '../../../../../state/redux/store';
import { getAddableBlockGroups } from '../../../../../blocks/state';
import type {
  AddableBlockGroups,
  AddBlockGroupModel,
  AddBlockModel,
} from '../../../../../blocks/models';
import {
  getAddableModuleTemplates,
  getSelectedModuleKey,
} from '../../../../../state/redux/editor/state';
import { addNewBlock } from '../../../../../state/redux/editor/reducer';
import { setAddingBlock } from '../../../../../state/redux/ui/reducer';

const Block = ({ block, addBlock }: { block: AddBlockModel, addBlock: () => void }) => (
  <div
    className={cx(styles.blockClass, styles.classNames.addBlockBlock)}
    onClick={() => {
      if (block.isModule) {
        // todo
      } else {
        addBlock();
      }
    }}
  >
    <div className={styles.blockIconClass}>
      <MdTitle />
    </div>
    <div className={styles.blockLabelClass}>{block.label}</div>
  </div>
);

const Group = ({
  group,
  addBlock,
}: {
  group: AddBlockGroupModel,
  addBlock: (blockKey: string) => void,
}) => (
  <section className={styles.groupClass}>
    <div className={styles.groupHeadingClass}>{group.label}</div>
    <div className={styles.groupBlocksClass}>
      {Object.keys(group.blocks).map(blockKey => {
        const block = group.blocks[blockKey];
        return <Block block={block} key={blockKey} addBlock={() => addBlock(blockKey)} />;
      })}
    </div>
  </section>
);

type Props = {
  addableBlockGroups: AddableBlockGroups,
  selectedModuleKey: string,
  addBlock: (blockKey: string, groupKey: string, moduleKey: string) => void,
  completeAddingBlock: () => void,
};

const AddBlockSlideout = ({
  addBlock,
  addableBlockGroups,
  completeAddingBlock,
  selectedModuleKey,
}: Props) => (
  <div className={styles.containerClass}>
    <header className={styles.headerClass}>Add a block</header>
    <div className={styles.bodyClass}>
      {Object.keys(addableBlockGroups).map(groupKey => {
        const group = addableBlockGroups[groupKey];
        return (
          <Group
            group={group}
            key={groupKey}
            addBlock={(blockKey: string) => {
              addBlock(blockKey, groupKey, selectedModuleKey);
              completeAddingBlock();
            }}
          />
        );
      })}
    </div>
  </div>
);

const mapStateToProps = (state: ReduxState) => {
  const moduleTemplateModules = getAddableModuleTemplates(state.editor);
  return {
    addableBlockGroups: getAddableBlockGroups(moduleTemplateModules),
    selectedModuleKey: getSelectedModuleKey(state.editor),
  };
};

const mapDispatchToProps = {
  addBlock: (blockKey: string, groupKey: string, moduleKey: string) =>
    addNewBlock(blockKey, groupKey, moduleKey),
  completeAddingBlock: () => setAddingBlock(false),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBlockSlideout);
