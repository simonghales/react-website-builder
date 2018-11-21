// @flow
import type { EditorReduxState } from '../state/redux/editor/reducer';
import { DUMMY_INTRO_MODULE, DUMMY_PAGE_MODULE, DUMMY_SUB_MODULE } from './modules/dummy';
import { DUMMY_MODULE_TEMPLATES } from './moduleTemplates/dummy';
import { DUMMY_MIXINS } from './mixins/dummy';

export const DUMMY_PAGE_DATA: EditorReduxState = {
  modules: {
    [DUMMY_INTRO_MODULE.key]: DUMMY_INTRO_MODULE,
    [DUMMY_PAGE_MODULE.key]: DUMMY_PAGE_MODULE,
    [DUMMY_SUB_MODULE.key]: DUMMY_SUB_MODULE,
  },
  moduleTemplates: DUMMY_MODULE_TEMPLATES,
  selectedModule: DUMMY_PAGE_MODULE.key,
  mixinStyles: DUMMY_MIXINS,
};
