// @flow

import type { DataBlockModel } from './models';
import ModuleImport from '../../blocks/groups/module/ModuleImport/ModuleImport';

export function generateNewModuleTemplateBlock(
  moduleKey: string,
  label: string
): DataBlockModel {
  return ModuleImport.dataBlock({ moduleKey, label });
}
