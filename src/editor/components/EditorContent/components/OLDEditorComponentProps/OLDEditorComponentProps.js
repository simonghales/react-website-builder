// @flow
import React from 'react';
import { MdAdd } from 'react-icons/md';
import { connect } from 'react-redux';
import BlockProp from '../../../../../components/BlockProp/BlockProp';
import styles from './styles';
import type { DataBlockModel } from '../../../../../data/blocks/models';
import { getBlockPropLabel, getBlockPropType } from '../../../../../data/blocks/models';
import { setBlockPropValue } from '../../../../../state/redux/editor/reducer';
import { getBlock, getBlockGroup } from '../../../../../blocks/blocks';
import type { BlockModel, BlockModelPropsConfig } from '../../../../../blocks/models';
import Button, { buttonTypes } from '../../../../../components/Button/Button';

type PropFieldProps = {
  blockKey: string,
  propKey: string,
  label: string,
  value: string,
  propType: string,
  updateProp: (blockKey: string, propKey: string, value: any) => void,
};

const PropField = ({ label, value, blockKey, propKey, updateProp, propType }: PropFieldProps) => (
  <div className={styles.fieldClass}>
    <BlockProp
      label={label}
      value={value}
      propType={propType}
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
  const allBlockPropKeys = {};
  Object.keys(blockData.props).forEach(propKey => {
    allBlockPropKeys[propKey] = true;
  });
  Object.keys(block.propsConfig).forEach(propKey => {
    allBlockPropKeys[propKey] = true;
  });
  return Object.keys(allBlockPropKeys).filter(propKey => {
    const propConfig = getMergedPropConfig(blockData, block, propKey);
    console.log('propConfig', propConfig);
    return !propConfig.hidden;
  });
}

type Props = {
  selectedBlock: DataBlockModel,
  updateProp: (blockKey: string, propKey: string, value: any) => void,
};

const OLDEditorComponentProps = ({ selectedBlock, updateProp }: Props) => {
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
        <Button type={buttonTypes.slimIcon}>
          <MdAdd/>
          <span>
            Add Prop
          </span>
        </Button>
      </div>
      <div>
        {filterVisiblePropsFields(selectedBlock, block).map(propKey => {
          const value = selectedBlock.props[propKey];
          const propConfig = getMergedPropConfig(selectedBlock, block, propKey);
          const label = getBlockPropLabel(propKey, propConfig);
          const propType = getBlockPropType(propConfig);
          const blockKey = selectedBlock.key;
          return (
            <PropField
              key={`${blockKey}:${propKey}`}
              blockKey={blockKey}
              propKey={propKey}
              value={value}
              label={label}
              propType={propType}
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
)(OLDEditorComponentProps);
