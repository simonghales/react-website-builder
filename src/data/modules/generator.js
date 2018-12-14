// @flow
import Module from 'blocks/groups/module/Module/Module';
import type { DataBlockModel, SitePageDataBlocks } from '../blocks/models';
import type { DataModule } from './models';
import { getBlockUniqueId } from '../../blocks/utils';
import {
  getDataBlockCombinedProps,
  getDataBlockCombinedPropsConfig,
  getDataBlockProps,
  getDataBlockPropsConfig,
} from '../../editor/components/EditorContent/components/EditorFields/state';
import type { DataBlockPropsDetails } from '../blocks/state';

export function getDataBlockLinkedPropsKeys(dataBlock: DataBlockModel): Array<string> {
  const combinedPropsConfig = getDataBlockCombinedPropsConfig(dataBlock);
  return Object.keys(combinedPropsConfig).filter(
    propKey => !!combinedPropsConfig[propKey].propReference
  );
}

export function getNewModulePropsAndPropsConfig(
  dataBlock: DataBlockModel,
  selectedModulePropsDetails: DataBlockPropsDetails
) {
  const dataBlockLinkedPropsKeys = getDataBlockLinkedPropsKeys(dataBlock);
  const props = getDataBlockCombinedProps(dataBlock);
  const propsConfig = getDataBlockCombinedPropsConfig(dataBlock);
  const newModuleProps = {};
  const newModulePropsConfig = {};
  dataBlockLinkedPropsKeys.forEach(propKey => {
    const referencedPropKey = props[propKey];
    const referencedPropLabel = selectedModulePropsDetails[referencedPropKey].label;
    const referencedPropValue = selectedModulePropsDetails[referencedPropKey].value;
    if (props[propKey]) {
      newModuleProps[referencedPropKey] = referencedPropValue;
    }
    if (propsConfig[propKey]) {
      newModulePropsConfig[referencedPropKey] = {
        ...propsConfig[propKey],
        label: referencedPropLabel,
        propReference: false,
      };
    }
  });
  return {
    props: newModuleProps,
    propsConfig: newModulePropsConfig,
  };
}

export function generateNewModule(
  blocks: SitePageDataBlocks,
  rootBlockKey: string,
  name: string,
  dataBlock: DataBlockModel,
  selectedModulePropsDetails: DataBlockPropsDetails
): DataModule {
  const { props, propsConfig } = getNewModulePropsAndPropsConfig(
    dataBlock,
    selectedModulePropsDetails
  );
  const moduleBlock = Module.dataBlock({
    rootBlockKey,
    label: name,
    props,
    propsConfig,
  });
  return {
    key: getBlockUniqueId(),
    groupKey: 'Site',
    name,
    blocks: {
      ...blocks,
      [moduleBlock.key]: moduleBlock,
    },
    rootBlock: moduleBlock.key,
  };
}
