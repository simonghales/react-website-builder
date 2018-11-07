// @flow

import type { SitePageDataModel } from './models';

export const DUMMY_PAGE_DATA: SitePageDataModel = {
  blocks: [
    {
      key: 'unique',
      groupKey: `Basic`,
      blockKey: `Heading`,
      props: {
        text: 'Hello World',
      },
    },
  ],
};
