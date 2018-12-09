// @flow
import type { EditorReduxState } from '../state/redux/editor/reducer';
import { DUMMY_INTRO_MODULE, DUMMY_PAGE_MODULE, DUMMY_SUB_MODULE } from './modules/dummy';
import { DUMMY_MIXINS } from './mixins/dummy';
import { DUMMY_PAGE_HOME, DUMMY_PAGE_ABOUT } from './pages/dummy';

export const DUMMY_PAGE_DATA: EditorReduxState = {
  pages: {
    [DUMMY_PAGE_HOME.key]: DUMMY_PAGE_HOME,
    [DUMMY_PAGE_ABOUT.key]: DUMMY_PAGE_ABOUT,
  },
  modules: {
    [DUMMY_INTRO_MODULE.key]: DUMMY_INTRO_MODULE,
    [DUMMY_PAGE_MODULE.key]: DUMMY_PAGE_MODULE,
    [DUMMY_SUB_MODULE.key]: DUMMY_SUB_MODULE,
  },
  mixinStyles: DUMMY_MIXINS,
};
