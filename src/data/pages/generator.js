// @flow

import type { PageDataModel } from './models';

export function generateNewPage(name: string, slug: string, moduleKey: string): PageDataModel {
  // todo - generate moduleKey

  return {
    key: '',
    name,
    slug,
    moduleKey,
  };
}
