// @flow

import type { DataModules, MappedDataModule } from '../modules/models';
import { getMappedDataModule } from '../modules/state';
import type { ModuleTemplate, ModuleTemplates } from './models';
import type { MixinsModel } from '../mixins/models';

export function getModuleTemplateFromModuleTemplates(
  linkedModuleKey: string,
  moduleTemplates: ModuleTemplates
): ModuleTemplate {
  const moduleTemplate = moduleTemplates[linkedModuleKey];
  if (!moduleTemplate) {
    throw new Error(`Unable to match ${linkedModuleKey} to moduleTemplates.`);
  }
  return moduleTemplate;
}

export function getModuleTemplateModuleKey(moduleTemplate: ModuleTemplate): string {
  return moduleTemplate.moduleKey;
}

export function getMappedDataLinkedModule(
  linkedModuleKey: string,
  modules: DataModules,
  moduleTemplates: ModuleTemplates,
  mixins: MixinsModel
): MappedDataModule {
  const moduleTemplate = getModuleTemplateFromModuleTemplates(linkedModuleKey, moduleTemplates);
  const moduleKey = getModuleTemplateModuleKey(moduleTemplate);
  return getMappedDataModule(moduleKey, modules, moduleTemplates, mixins);
}

export function getMappedLinkedModuleKey(
  linkedModuleKey: string,
  modules: DataModules,
  moduleTemplates: ModuleTemplates
): string {
  const moduleTemplate = getModuleTemplateFromModuleTemplates(linkedModuleKey, moduleTemplates);
  const moduleKey = getModuleTemplateModuleKey(moduleTemplate);
  return moduleKey;
}
