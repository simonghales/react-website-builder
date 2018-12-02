// @flow

import type { ModuleTemplate } from './models';
import { getBlockUniqueId } from '../../blocks/utils';

export function generateNewModuleTemplate(moduleKey: string): ModuleTemplate {
  return {
    key: getBlockUniqueId(),
    moduleKey,
  };
}
