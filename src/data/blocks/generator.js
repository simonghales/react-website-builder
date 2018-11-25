// @flow

import type { DataBlockModel } from './models';
import ModuleImport from '../../blocks/groups/module/ModuleImport/ModuleImport';

export function generateNewModuleTemplateBlock(
  linkedModuleKey: string,
  label: string
): DataBlockModel {
  return ModuleImport.dataBlock({ linkedModuleKey, label });
}
