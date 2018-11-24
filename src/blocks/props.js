// @flow

export const blockPropsConfigTypes = {
  string: 'string',
  html: 'html',
  htmlHeadings: 'htmlHeadings',
  htmlContainers: 'htmlContainers',
  module: 'module',
  blocks: 'blocks',
};

export type BlockPropsConfigTypes = $Keys<typeof blockPropsConfigTypes>;
