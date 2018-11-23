// @flow
import React from 'react';
import { connect } from 'react-redux';
import BlockProp from '../../../../../components/BlockProp/BlockProp';
import styles from './styles';
import type { DataBlockModel } from '../../../../../data/blocks/models';
import { getBlockPropLabel } from '../../../../../data/blocks/models';
import { setBlockPropValue } from '../../../../../state/redux/editor/reducer';
import { getBlock, getBlockGroup } from '../../../../../blocks/blocks';
import type { BlockModel, BlockModelPropsConfig } from '../../../../../blocks/models';
import Button, { buttonTypes } from '../../../../../components/Button/Button';

type PropFieldProps = {
  blockKey: string,
  propKey: string,
  label: string,
  value: string,
  updateProp: (blockKey: string, propKey: string, value: any) => void,
};

const PropField = ({ label, value, blockKey, propKey, updateProp }: PropFieldProps) => (
  <div className={styles.fieldClass}>
    <BlockProp
      label={label}
      value={value}
      onUpdate={(newValue: any) => updateProp(blockKey, propKey, newValue)}
    />
  </div>
);

function getMergedPropConfig(
  blockData: DataBlockModel,
  block: BlockModel,
  propKey: string
): BlockModelPropsConfig {
  const blockPropConfig = block.propsConfig[propKey] ? block.propsConfig[propKey] : {};
  const blockDataPropConfig = blockData.propsConfig[propKey] ? blockData.propsConfig[propKey] : {};
  return {
    ...blockPropConfig,
    ...blockDataPropConfig,
  };
}

function filterVisiblePropsFields(blockData: DataBlockModel, block: BlockModel): Array<string> {
  return Object.keys(blockData.props).filter(propKey => {
    const propConfig = getMergedPropConfig(blockData, block, propKey);
    return !propConfig.hidden;
  });
}

type Props = {
  selectedBlock: DataBlockModel,
  updateProp: (blockKey: string, propKey: string, value: any) => void,
};

const EditorComponentProps = ({ selectedBlock, updateProp }: Props) => {
  const blockGroup = getBlockGroup(selectedBlock.groupKey);
  if (!blockGroup) {
    throw new Error(`Couldn't find blockGroup for "${selectedBlock.groupKey}"`);
  }
  const block = getBlock(blockGroup, selectedBlock.blockKey);
  if (!block) {
    throw new Error(`Couldn't find block for "${selectedBlock.blockKey}"`);
  }
  return (
    <div className={styles.containerClass}>
      <div className={styles.addPropClass}>
        <Button type={buttonTypes.slim}>Add Prop</Button>
      </div>
      <div>
        {filterVisiblePropsFields(selectedBlock, block).map(propKey => {
          const value = selectedBlock.props[propKey];
          const propConfig = getMergedPropConfig(selectedBlock, block, propKey);
          const label = getBlockPropLabel(propKey, propConfig);
          const blockKey = selectedBlock.key;
          return (
            <PropField
              key={`${blockKey}:${propKey}`}
              blockKey={blockKey}
              propKey={propKey}
              value={value}
              label={label}
              updateProp={updateProp}
            />
          );
        })}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  updateProp: (blockKey: string, propKey: string, value: any) =>
    setBlockPropValue(blockKey, propKey, value),
};

export default connect(
  null,
  mapDispatchToProps
)(EditorComponentProps);
