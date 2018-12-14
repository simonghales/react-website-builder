// @flow

import type { DataBlockModel } from './models';
import ModuleImport from '../../blocks/groups/module/ModuleImport/ModuleImport';
import { getDataBlockLinkedPropsKeys } from '../modules/generator';
import {
  getDataBlockCombinedProps,
  getDataBlockCombinedPropsConfig,
} from '../../editor/components/EditorContent/components/EditorFields/state';
import type { DataBlockPropsDetails } from './state';

export function getNewModuleImportPropsAndPropsConfig(
  dataBlock: DataBlockModel,
  selectedModulePropsDetails: DataBlockPropsDetails
) {
  const linkedPropsKeys = getDataBlockLinkedPropsKeys(dataBlock);
  const props = getDataBlockCombinedProps(dataBlock);
  const propsConfig = getDataBlockCombinedPropsConfig(dataBlock);
  const newProps = {};
  const newPropsConfig = {};

  linkedPropsKeys.forEach(propKey => {
    const referencedPropKey = props[propKey];
    const referencedPropLabel = selectedModulePropsDetails[referencedPropKey].label;
    if (props[propKey]) {
      newProps[referencedPropKey] = referencedPropKey;
    }
    if (propsConfig[propKey]) {
      newPropsConfig[referencedPropKey] = {
        ...propsConfig[propKey],
        label: referencedPropLabel,
      };
    }
  });
  return {
    props: newProps,
    propsConfig: newPropsConfig,
  };
}

export function generateNewModuleTemplateBlock(
  moduleKey: string,
  label: string,
  dataBlock: DataBlockModel,
  selectedModulePropsDetails: DataBlockPropsDetails
): DataBlockModel {
  const { props, propsConfig } = getNewModuleImportPropsAndPropsConfig(
    dataBlock,
    selectedModulePropsDetails
  );
  return ModuleImport.dataBlock({ moduleKey, label, props, propsConfig });
}
