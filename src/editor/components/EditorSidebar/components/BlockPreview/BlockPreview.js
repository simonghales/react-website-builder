// @flow
import React from 'react';
import { cx } from 'emotion';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import type { MappedDataBlocks } from '../../../../../data/blocks/models';
import styles from '../../styles';
import BlocksList from '../BlocksList/BlocksList';

const DroppableWrapper = ({ children, blockKey }: { children: any, blockKey: string }) => (
  <Droppable droppableId={blockKey}>
    {(provided, snapshot) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {children}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

type Props = {
  type: string,
  label: string,
  selected: boolean,
  blockChildren: MappedDataBlocks,
  blockKey: string,
  selectBlock: (blockKey: string) => void,
  selectedBlock: string,
  isParentModule: boolean,
};

const BlockPreview = ({
  type,
  label,
  selected,
  blockChildren,
  blockKey,
  selectBlock,
  selectedBlock,
}: Props) => (
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
    <DroppableWrapper blockKey={blockKey}>
      {blockChildren.length > 0 && (
        <div className={styles.blockPreviewChildrenClass}>
          <BlocksList
            blocks={blockChildren}
            selectBlock={selectBlock}
            selectedBlock={selectedBlock}
          />
        </div>
      )}
    </DroppableWrapper>
  </div>
);

const DraggableWrapper = (props: Props) => {
  const { blockKey, isParentModule } = props;
  if (isParentModule) {
    return <BlockPreview {...props} />;
  }
  return (
    <Draggable draggableId={blockKey} index={0}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <BlockPreview {...props} />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableWrapper;
