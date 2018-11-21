// @flow

import type { ModuleTemplate, ModuleTemplates } from './models';
import { DUMMY_INTRO_MODULE, DUMMY_SUB_MODULE } from '../modules/dummy';

export const DUMMY_MODULE_TEMPLATE_INTRO: ModuleTemplate = {
  key: 'DUMMY_MODULE_TEMPLATE_INTRO',
  moduleKey: DUMMY_INTRO_MODULE.key,
};

export const DUMMY_MODULE_TEMPLATE_SUB: ModuleTemplate = {
  key: 'DUMMY_MODULE_TEMPLATE_SUB',
  moduleKey: DUMMY_SUB_MODULE.key,
};

export const DUMMY_MODULE_TEMPLATES: ModuleTemplates = {
  [DUMMY_MODULE_TEMPLATE_INTRO.key]: DUMMY_MODULE_TEMPLATE_INTRO,
  [DUMMY_MODULE_TEMPLATE_SUB.key]: DUMMY_MODULE_TEMPLATE_SUB,
};
