// @flow

import type { PageDataModel } from './models';
import { getPageUniqueId } from '../../blocks/utils';

export function generateNewPage(name: string, slug: string, moduleKey: string): PageDataModel {
  return {
    key: getPageUniqueId(),
    name,
    slug,
    moduleKey,
  };
}
