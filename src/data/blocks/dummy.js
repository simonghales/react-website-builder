// @flow
import type { OLDSitePageDataModel } from './models';
import { getBlockUniqueId } from '../../blocks/utils';

export const DUMMY_PAGE_DATA: OLDSitePageDataModel = {
  blocks: [
    {
      key: getBlockUniqueId(),
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
      key: getBlockUniqueId(),
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
      key: getBlockUniqueId(),
      groupKey: `Basic`,
      blockKey: `Container`,
      blockType: 'custom',
      label: 'Container',
      props: {
        children: [
          {
            key: getBlockUniqueId(),
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
          label: 'Content',
          type: 'blocks',
        },
      },
    },
  ],
};
