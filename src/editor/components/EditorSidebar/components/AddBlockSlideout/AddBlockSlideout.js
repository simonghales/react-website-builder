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
import { getSelectedModuleKey } from '../../../../../state/redux/editor/state';
import { addNewBlock, addNewModule } from '../../../../../state/redux/editor/reducer';
import { setAddingBlock } from '../../../../../state/redux/ui/reducer';
import { getDisabledBlocks } from './state';
import type { DisabledBlocks } from './state';
import { getAddableModules } from '../../../../../state/redux/editor/selector';

const Block = ({
  block,
  addBlock,
  addModule,
  disabled,
}: {
  block: AddBlockModel,
  disabled: boolean,
  addBlock: () => void,
  addModule: () => void,
}) => (
  <div
    className={cx(styles.blockClass, styles.classNames.addBlockBlock, {
      [styles.disabledBlockClass]: disabled,
    })}
    onClick={() => {
      if (disabled) return;
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
  disabledBlocks,
  addBlock,
  addModule,
}: {
  group: AddBlockGroupModel,
  disabledBlocks: DisabledBlocks,
  addBlock: (blockKey: string) => void,
  addModule: (newModuleKey: string) => void,
}) => (
  <section className={styles.groupClass}>
    <div className={styles.groupHeadingClass}>{group.label}</div>
    <div className={styles.groupBlocksClass}>
      {Object.keys(group.blocks).map(blockKey => {
        const block = group.blocks[blockKey];
        const disabled = disabledBlocks[blockKey];
        return (
          <Block
            block={block}
            key={blockKey}
            addBlock={() => addBlock(blockKey)}
            addModule={() => addModule(blockKey)}
            disabled={!!disabled}
            isCurrentModule={disabled && disabled.currentModule}
            isRecursiveModule={disabled && disabled.recursiveModule}
          />
        );
      })}
    </div>
  </section>
);

type Props = {
  addableBlockGroups: AddableBlockGroups,
  disabledBlocks: DisabledBlocks,
  selectedModuleKey: string,
  addBlock: (blockKey: string, groupKey: string, moduleKey: string) => void,
  addModule: (newModuleKey: string, moduleKey: string) => void,
  completeAddingBlock: () => void,
};

const AddBlockSlideout = ({
  addBlock,
  addModule,
  addableBlockGroups,
  disabledBlocks,
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
            disabledBlocks={disabledBlocks}
          />
        );
      })}
    </div>
  </div>
);

const mapStateToProps = (state: ReduxState) => {
  const addableModules = getAddableModules(state);
  const addableBlockGroups = getAddableBlockGroups(addableModules);
  const selectedModuleKey = getSelectedModuleKey(state.editor);
  const disabledBlocks = getDisabledBlocks(addableBlockGroups, selectedModuleKey);
  return {
    addableBlockGroups,
    disabledBlocks,
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
