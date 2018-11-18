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
import { addNewBlock, addNewModule } from '../../../../../state/redux/editor/reducer';
import { setAddingBlock } from '../../../../../state/redux/ui/reducer';

const Block = ({
  block,
  addBlock,
  addModule,
}: {
  block: AddBlockModel,
  addBlock: () => void,
  addModule: () => void,
}) => (
  <div
    className={cx(styles.blockClass, styles.classNames.addBlockBlock)}
    onClick={() => {
      if (block.isModule) {
        addModule();
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
  addModule,
}: {
  group: AddBlockGroupModel,
  addBlock: (blockKey: string) => void,
  addModule: (newModuleKey: string) => void,
}) => (
  <section className={styles.groupClass}>
    <div className={styles.groupHeadingClass}>{group.label}</div>
    <div className={styles.groupBlocksClass}>
      {Object.keys(group.blocks).map(blockKey => {
        const block = group.blocks[blockKey];
        return (
          <Block
            block={block}
            key={blockKey}
            addBlock={() => addBlock(blockKey)}
            addModule={() => addModule(blockKey)}
          />
        );
      })}
    </div>
  </section>
);

type Props = {
  addableBlockGroups: AddableBlockGroups,
  selectedModuleKey: string,
  addBlock: (blockKey: string, groupKey: string, moduleKey: string) => void,
  addModule: (newModuleKey: string, moduleKey: string) => void,
  completeAddingBlock: () => void,
};

const AddBlockSlideout = ({
  addBlock,
  addModule,
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
            addModule={(newModuleKey: string) => {
              addModule(newModuleKey, selectedModuleKey);
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
  addModule: (newModuleKey: string, moduleKey: string) => addNewModule(newModuleKey, moduleKey),
  completeAddingBlock: () => setAddingBlock(false),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBlockSlideout);
