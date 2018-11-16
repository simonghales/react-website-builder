// @flow

import type { ModuleTemplate, ModuleTemplates } from './models';
import { DUMMY_INTRO_MODULE } from '../modules/dummy';

export const DUMMY_MODULE_TEMPLATE_INTRO: ModuleTemplate = {
  key: 'DUMMY_MODULE_TEMPLATE_INTRO',
  moduleKey: DUMMY_INTRO_MODULE.key,
};

export const DUMMY_MODULE_TEMPLATES: ModuleTemplates = {
  [DUMMY_MODULE_TEMPLATE_INTRO.key]: DUMMY_MODULE_TEMPLATE_INTRO,
};
