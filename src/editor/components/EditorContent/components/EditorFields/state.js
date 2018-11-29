// @flow

import type { EditorFieldModel } from './model';
import type { BlockModel, BlockPropsConfigModel } from '../../../../../blocks/models';
import { getBlockHtmlPropsKeys } from '../../../../../blocks/state';
import type {
  DataBlockModel,
  DataBlockPropsConfigModel,
  DataBlockPropsModel,
} from '../../../../../data/blocks/models';
import { editorInputTypes } from './components/EditorField/EditorField';

export function getDataBlockPropsConfig(dataBlock: DataBlockModel): DataBlockPropsConfigModel {
  const { propsConfig = {} } = dataBlock;
  return propsConfig;
}

export function getBlockPropsConfig(block: BlockModel): BlockPropsConfigModel {
  const { propsConfig = {} } = block;
  return propsConfig;
}

export function getDataBlockPropLabel(propKey: string, dataBlock: DataBlockModel): string {
  const propsConfig = getDataBlockPropsConfig(dataBlock);
  const propConfig = propsConfig[propKey];
  if (propConfig && propConfig.label) {
    return propConfig.label;
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

export function getDataBlockProps(dataBlock: DataBlockModel): DataBlockPropsModel {
  const { props = {} } = dataBlock;
  return props;
}

export function getDataBlockPropValue(propKey: string, dataBlock: DataBlockModel): string {
  const props = getDataBlockProps(dataBlock);
  const prop = props[propKey];
  if (prop) {
    // todo - check if not undefined, not truthy
    return prop;
  }
  console.warn(`No prop found for ${propKey}.`);
  return '';
}

export function mapHtmlPropField(
  propKey: string,
  block: BlockModel,
  dataBlock: DataBlockModel
): EditorFieldModel {
  const label = getPropFieldLabel(propKey, block, dataBlock);
  const value = getDataBlockPropValue(propKey, dataBlock);
  return {
    key: propKey,
    label,
    labelHighlighted: true,
    value,
    inheritedValue: '',
    inputType: editorInputTypes.htmlSelector,
    onChange: () => {},
    noLabelWrapper: false,
    columns: 0,
  };
}

export function getHtmlPropsFields(
  block: BlockModel,
  dataBlock: DataBlockModel
): Array<EditorFieldModel> {
  const htmlPropsKeys = getBlockHtmlPropsKeys(block);
  return htmlPropsKeys.map(propKey => mapHtmlPropField(propKey, block, dataBlock));
}
