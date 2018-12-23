// @flow
import { get } from 'lodash';
import Module from 'blocks/groups/module/Module/Module';
import type { DataBlockModel, SitePageDataBlocks } from '../blocks/models';
import type { DataModule } from './models';
import { getBlockUniqueId, getModuleUniqueId } from '../../blocks/utils';
import {
  getDataBlockCombinedProps,
  getDataBlockCombinedPropsConfig,
} from '../../editor/components/EditorContent/components/EditorFields/state';
import type {
  AvailableDataBlockPropsDetails,
  DataBlockPropDetail,
  DataBlockPropsDetails,
} from '../blocks/state';
import { generateNewEmptyModuleBlock } from '../blocks/generator';

export function getDataBlockLinkedPropsKeys(dataBlock: DataBlockModel): Array<string> {
  const combinedPropsConfig = getDataBlockCombinedPropsConfig(dataBlock);
  return Object.keys(combinedPropsConfig).filter(
    propKey => !!combinedPropsConfig[propKey].propReference
  );
}

export function getReferencedPropFromAllPropsDetails(
  referencedPropKey: string,
  allAvailablePropsDetails: AvailableDataBlockPropsDetails
): DataBlockPropDetail | null {
  const splitPropPath = referencedPropKey.split('.');
  const blockKey = splitPropPath[0];
  const blockProps = get(allAvailablePropsDetails[blockKey], 'props', undefined);
  return get(blockProps, referencedPropKey, null);
}

export function getNewModulePropsAndPropsConfig(
  dataBlock: DataBlockModel,
  allAvailablePropsDetails: AvailableDataBlockPropsDetails
) {
  const dataBlockLinkedPropsKeys = getDataBlockLinkedPropsKeys(dataBlock);
  const props = getDataBlockCombinedProps(dataBlock);
  const propsConfig = getDataBlockCombinedPropsConfig(dataBlock);
  const newModuleProps = {};
  const newModulePropsConfig = {};
  dataBlockLinkedPropsKeys.forEach(propKey => {
    const referencedPropKey = props[propKey];
    const referencedProp = getReferencedPropFromAllPropsDetails(
      referencedPropKey,
      allAvailablePropsDetails
    );
    if (referencedProp) {
      newModuleProps[propKey] = referencedProp.value;
    }
    if (propsConfig[propKey]) {
      newModulePropsConfig[propKey] = {
        ...propsConfig[propKey],
        label: referencedProp.label,
        propReference: false,
      };
    }
  });
  return {
    props: newModuleProps,
    propsConfig: newModulePropsConfig,
  };
}

export function generateModule(
  name: string,
  blocks: SitePageDataBlocks,
  moduleBlock: DataBlockModel
): DataModule {
  return {
    key: getModuleUniqueId(),
    groupKey: 'Site',
    name,
    blocks: {
      ...blocks,
      [moduleBlock.key]: moduleBlock,
    },
    rootBlock: moduleBlock.key,
  };
}

export function generateNewModule(
  blocks: SitePageDataBlocks,
  rootBlockKey: string,
  name: string,
  dataBlock: DataBlockModel,
  allAvailablePropsDetails: AvailableDataBlockPropsDetails
): DataModule {
  const { props, propsConfig } = getNewModulePropsAndPropsConfig(
    dataBlock,
    allAvailablePropsDetails
  );
  const moduleBlock = Module.dataBlock({
    rootBlockKey,
    label: name,
    props,
    propsConfig,
  });
  return generateModule(name, blocks, moduleBlock);
}

export function generateNewEmptyModule(name: string): DataModule {
  const emptyRootBlock = generateNewEmptyModuleBlock(name);
  return generateModule(name, [], emptyRootBlock);
}
