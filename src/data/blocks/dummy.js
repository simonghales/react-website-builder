// @flow

import type { SitePageDataModel } from './models';

export const DUMMY_PAGE_DATA: SitePageDataModel = {
  blocks: [
    {
      key: 'uniqueHeading1',
      groupKey: `Basic`,
      blockKey: `Heading`,
      blockType: 'custom',
      label: 'Site Title',
      props: {
        text: 'Hello World',
      },
      propsConfig: {
        text: {
          label: 'Text',
        },
      },
    },
    {
      key: 'uniqueHeading2',
      groupKey: `Basic`,
      blockKey: `Heading`,
      blockType: 'custom',
      label: 'Site Subheading',
      props: {
        text: 'Hello World',
      },
      propsConfig: {
        text: {
          label: 'Text',
        },
      },
    },
    {
      key: 'uniqueContainer',
      groupKey: `Basic`,
      blockKey: `Container`,
      blockType: 'custom',
      label: 'Container',
      props: {
        children: [
          {
            key: 'uniqueParagraph',
            groupKey: `HTML`,
            blockKey: `p`,
            blockType: 'html',
            label: 'Site Description',
            props: {
              children: 'Hello World',
            },
            propsConfig: {
              children: {
                label: 'Text',
              },
            },
          },
        ],
      },
      propsConfig: {
        children: {
          label: 'HIDDEN',
          type: 'blocks',
        },
      },
    },
  ],
};
