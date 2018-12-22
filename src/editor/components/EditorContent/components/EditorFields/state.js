// @flow

import type { EditorFieldModel } from './model';
import type {
  BlockModel,
  BlockModelPropsConfig,
  BlockPropsConfigModel,
} from '../../../../../blocks/models';
import { getBlockContentPropsKeys, getBlockHtmlPropsKeys } from '../../../../../blocks/state';
import type {
  DataBlockModel,
  DataBlockPropsConfigModel,
  DataBlockPropsModel,
} from '../../../../../data/blocks/models';
import { editorInputTypes } from './components/EditorField/EditorField';
import { blockPropsConfigTypes } from '../../../../../blocks/props';
import type { BlockPropsConfigTypes } from '../../../../../blocks/props';
import type { EditorInputTypes } from './components/EditorField/EditorField';
import { getBlockFromDataBlock } from '../../../../../blocks/blocks';
import { isValueDefined } from '../../../../../utils/validation';

export function getDataBlockPropsConfig(dataBlock: DataBlockModel): DataBlockPropsConfigModel {
  const { propsConfig = {} } = dataBlock;
  return propsConfig;
}

export function getBlockPropsConfig(block: BlockModel): BlockPropsConfigModel {
  const { propsConfig = {} } = block;
  return propsConfig;
}

export function getBlockProps(block: BlockModel): DataBlockPropsModel {
  const { props = {} } = block;
  return props;
}

export function getDataBlockCombinedPropsConfig(
  dataBlock: DataBlockModel
): DataBlockPropsConfigModel {
  const dataBlockPropsConfig = getDataBlockPropsConfig(dataBlock);
  const block = getBlockFromDataBlock(dataBlock);
  const blockPropsConfig = getBlockPropsConfig(block);
  const combinedPropsConfig = {
    ...blockPropsConfig,
  };
  Object.keys(dataBlockPropsConfig).forEach(propKey => {
    if (combinedPropsConfig[propKey]) {
      combinedPropsConfig[propKey] = {
        ...combinedPropsConfig[propKey],
        ...dataBlockPropsConfig[propKey],
      };
    } else {
      combinedPropsConfig[propKey] = {
        ...dataBlockPropsConfig[propKey],
      };
    }
  });
  return combinedPropsConfig;
}

export function getPropConfigFromDataBlockCombinedPropsConfig(
  combinedPropsConfig: DataBlockPropsConfigModel,
  propKey: string
): BlockModelPropsConfig {
  const propConfig = combinedPropsConfig[propKey];
  if (propConfig) {
    return propConfig;
  }
  console.warn(`Couldn't match propKey "${propKey}" to combinedPropsConfig.`);
  return {};
}

export function getDataBlockProps(dataBlock: DataBlockModel): DataBlockPropsModel {
  const { props = {} } = dataBlock;
  return props;
}

export function getDataBlockCombinedProps(dataBlock: DataBlockModel): DataBlockPropsModel {
  const dataBlockProps = getDataBlockProps(dataBlock);
  const block = getBlockFromDataBlock(dataBlock);
  const blockProps = getBlockProps(block);
  const combinedProps = {
    ...blockProps,
    ...dataBlockProps,
  };
  return combinedProps;
}

export function getDataBlockPropLabel(propKey: string, dataBlock: DataBlockModel): string {
  const propsConfig = getDataBlockPropsConfig(dataBlock);
  const propConfig = propsConfig[propKey];
  if (propConfig && propConfig.label) {
    return propConfig.label;
  }
  return '';
}

export function getDataBlockPropReference(propKey: string, dataBlock: DataBlockModel): boolean {
  const propsConfig = getDataBlockPropsConfig(dataBlock);
  const propConfig = propsConfig[propKey];
  if (propConfig && propConfig.propReference) {
    return true;
  }
  return false;
}

export function getDataBlockPropType(
  propKey: string,
  dataBlock: DataBlockModel
): BlockPropsConfigTypes {
  const propsConfig = getDataBlockPropsConfig(dataBlock);
  const propConfig = propsConfig[propKey];
  if (propConfig && propConfig.type) {
    return propConfig.type;
  }
  return '';
}

export function getBlockPropLabel(propKey: string, block: BlockModel): string {
  const propsConfig = getBlockPropsConfig(block);
  const propConfig = propsConfig[propKey];
  if (propConfig && propConfig.label) {
    return propConfig.label;
  }
  return '';
}

export function getBlockPropReference(propKey: string, block: BlockModel): string {
  const propsConfig = getBlockPropsConfig(block);
  const propConfig = propsConfig[propKey];
  if (propConfig && propConfig.propReference) {
    return true;
  }
  return false;
}

export function getBlockPropType(propKey: string, block: BlockModel): BlockPropsConfigTypes {
  const propsConfig = getBlockPropsConfig(block);
  const propConfig = propsConfig[propKey];
  if (propConfig && propConfig.type) {
    return propConfig.type;
  }
  return '';
}

export function getPropFieldLabel(
  propKey: string,
  block: BlockModel,
  dataBlock: DataBlockModel
): string {
  const dataBlockLabel = getDataBlockPropLabel(propKey, dataBlock);
  if (dataBlockLabel) {
    return dataBlockLabel;
  }
  const blockLabel = getBlockPropLabel(propKey, block);
  if (blockLabel) {
    return blockLabel;
  }
  return propKey;
}

export function isFieldPropReference(
  propKey: string,
  block: BlockModel,
  dataBlock: DataBlockModel
): boolean {
  const dataBlockPropReference = getDataBlockPropReference(propKey, dataBlock);
  if (dataBlockPropReference) {
    return true;
  }
  const blockPropReference = getBlockPropReference(propKey, block);
  if (blockPropReference) {
    return true;
  }
  return false;
}

export function getModulePropFieldLabel(
  propKey: string,
  propsConfig: DataBlockPropsConfigModel
): string {
  return propsConfig[propKey] && propsConfig[propKey].label ? propsConfig[propKey].label : propKey;
}

export function getModulePropFieldType(
  propKey: string,
  propsConfig: DataBlockPropsConfigModel
): BlockPropsConfigTypes {
  if (propsConfig[propKey] && propsConfig[propKey].type) {
    return propsConfig[propKey].type;
  }
  return blockPropsConfigTypes.string;
}

export function getPropFieldType(
  propKey: string,
  block: BlockModel,
  dataBlock: DataBlockModel
): BlockPropsConfigTypes {
  const dataBlockType = getDataBlockPropType(propKey, dataBlock);
  if (dataBlockType) {
    return dataBlockType;
  }
  const blockType = getBlockPropType(propKey, block);
  if (blockType) {
    return blockType;
  }
  return blockPropsConfigTypes.string;
}

export function getDataBlockPropValue(propKey: string, dataBlock: DataBlockModel): string {
  const props = getDataBlockProps(dataBlock);
  const prop = props[propKey];
  if (!isValueDefined(prop)) {
    console.warn(`No prop found for ${propKey}.`, dataBlock);
    return '';
  }
  return prop;
}

const mappedPropTypeToInputType = {
  [blockPropsConfigTypes.string]: editorInputTypes.string,
  [blockPropsConfigTypes.html]: editorInputTypes.htmlSelector,
  [blockPropsConfigTypes.module]: editorInputTypes.string,
  [blockPropsConfigTypes.blocks]: editorInputTypes.string,
  [blockPropsConfigTypes.htmlAttribute]: editorInputTypes.string,
  [blockPropsConfigTypes.repeaterData]: editorInputTypes.repeaterData,
};

export function getFieldInputTypeFromPropType(propType: BlockPropsConfigTypes): EditorInputTypes {
  const inputType = mappedPropTypeToInputType[propType];
  if (!inputType) {
    throw new Error(`No input type matched to propType "${propType}"`);
  }
  return inputType;
}

export function getPropConfigFromCombinedPropsConfig(propKey: string, dataBlock: DataBlockModel) {
  const combinedPropsConfig = getDataBlockCombinedPropsConfig(dataBlock);
  return combinedPropsConfig[propKey];
}

export function canPropBeLinked(propKey: string, dataBlock: DataBlockModel): boolean {
  const propConfig = getPropConfigFromCombinedPropsConfig(propKey, dataBlock);
  return propConfig.type !== blockPropsConfigTypes.repeaterData;
}

export function isFieldNoLabelWrapper(propType: BlockPropsConfigTypes): boolean {
  return propType === blockPropsConfigTypes.repeaterData;
}

export function mapHtmlPropField(
  propKey: string,
  block: BlockModel,
  dataBlock: DataBlockModel,
  updateValue: (propKey: string, value: string) => void
): EditorFieldModel {
  const label = getPropFieldLabel(propKey, block, dataBlock);
  const value = getDataBlockPropValue(propKey, dataBlock);
  const type = getPropFieldType(propKey, block, dataBlock);
  const inputType = getFieldInputTypeFromPropType(type);
  const isPropReference = isFieldPropReference(propKey, block, dataBlock);
  const linkedPropKey = isPropReference ? value : '';
  const isPropLinkable = canPropBeLinked(propKey, dataBlock);
  return {
    key: propKey,
    label,
    labelHighlighted: true,
    value,
    inheritedValue: '',
    inputType,
    onChange: (newValue: string) => updateValue(propKey, newValue),
    noLabelWrapper: isFieldNoLabelWrapper(type),
    columns: 0,
    isPropReference,
    linkedPropKey,
    isLinkable: isPropLinkable,
  };
}

export function mapModuleHtmlPropField(
  propKey: string,
  dataBlock: DataBlockModel,
  propsConfig: DataBlockPropsConfigModel,
  updateValue: (propKey: string, value: string) => void
) {
  const label = getModulePropFieldLabel(propKey, propsConfig);
  const value = getDataBlockPropValue(propKey, dataBlock);
  const type = getModulePropFieldType(propKey, propsConfig);
  const inputType = getFieldInputTypeFromPropType(type);
  const isPropReference = getDataBlockPropReference(propKey, dataBlock);
  const linkedPropKey = isPropReference ? value : '';
  return {
    key: propKey,
    label,
    labelHighlighted: true,
    value,
    inheritedValue: '',
    inputType,
    onChange: (newValue: string) => updateValue(propKey, newValue),
    noLabelWrapper: false,
    columns: 0,
    isPropReference,
    linkedPropKey,
  };
}

export function getHtmlPropsFields(
  block: BlockModel,
  dataBlock: DataBlockModel,
  updateValue: (propKey: string, value: string) => void
): Array<EditorFieldModel> {
  const htmlPropsKeys = getBlockHtmlPropsKeys(block);
  return htmlPropsKeys.map(propKey => mapHtmlPropField(propKey, block, dataBlock, updateValue));
}

export function getDataBlockPropsKeys(dataBlock: DataBlockModel): Array<string> {
  const propsConfig = getDataBlockPropsConfig(dataBlock);
  return Object.keys(propsConfig);
}

export function combinePropsKeys(propKeysArray: Array<Array<string>>): Array<string> {
  const combinedPropsKeys = {};
  propKeysArray.forEach((propsKeys: Array<string>) => {
    propsKeys.forEach(propKey => {
      combinedPropsKeys[propKey] = true;
    });
  });
  return Object.keys(combinedPropsKeys);
}

export function getContentPropsFields(
  block: BlockModel,
  dataBlock: DataBlockModel,
  updateValue: (propKey: string, value: string) => void
): Array<EditorFieldModel> {
  const dataBlockPropsKeys = getDataBlockPropsKeys(dataBlock);
  const blockPropsKeys = getBlockContentPropsKeys(block);
  const propsKeys = combinePropsKeys([dataBlockPropsKeys, blockPropsKeys]);
  return propsKeys.map(propKey => mapHtmlPropField(propKey, block, dataBlock, updateValue));
}

export function getModuleImportContentPropsFields(
  moduleBlockPropsConfig: DataBlockPropsConfigModel,
  dataBlock: DataBlockModel,
  updateValue: (propKey: string, value: string) => void
): Array<EditorFieldModel> {
  const propsKeys = Object.keys(moduleBlockPropsConfig);
  return propsKeys.map(propKey =>
    mapModuleHtmlPropField(propKey, dataBlock, moduleBlockPropsConfig, updateValue)
  );
}
