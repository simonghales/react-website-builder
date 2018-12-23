// @flow

import type { DataBlockModel } from './models';
import ModuleImport from '../../blocks/groups/module/ModuleImport/ModuleImport';
import Module from '../../blocks/groups/module/Module/Module';
import {
  getDataBlockLinkedPropsKeys,
  getReferencedPropFromAllPropsDetails,
} from '../modules/generator';
import {
  getDataBlockCombinedProps,
  getDataBlockCombinedPropsConfig,
} from '../../editor/components/EditorContent/components/EditorFields/state';
import type { AvailableDataBlockPropsDetails, DataBlockPropsDetails } from './state';

export function getNewModuleImportPropsAndPropsConfig(
  dataBlock: DataBlockModel,
  allAvailablePropsDetails: AvailableDataBlockPropsDetails
) {
  const linkedPropsKeys = getDataBlockLinkedPropsKeys(dataBlock);
  const props = getDataBlockCombinedProps(dataBlock);
  const propsConfig = getDataBlockCombinedPropsConfig(dataBlock);
  const newProps = {};
  const newPropsConfig = {};

  linkedPropsKeys.forEach(propKey => {
    const referencedPropKey = props[propKey];
    const referencedProp = getReferencedPropFromAllPropsDetails(
      referencedPropKey,
      allAvailablePropsDetails
    );
    if (referencedProp) {
      newProps[propKey] = referencedPropKey;
      newPropsConfig[propKey] = {
        ...propsConfig[propKey],
        label: referencedProp.label,
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
  allAvailablePropsDetails: AvailableDataBlockPropsDetails
): DataBlockModel {
  const { props, propsConfig } = getNewModuleImportPropsAndPropsConfig(
    dataBlock,
    allAvailablePropsDetails
  );
  return ModuleImport.dataBlock({ moduleKey, label, props, propsConfig });
}

export function generateNewEmptyModuleBlock(label: string): DataBlockModel {
  return Module.dataBlock({
    label,
    props: {},
    propsConfig: {},
  });
}
