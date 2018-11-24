// @flow

export const blockPropsConfigTypes = {
  string: 'string',
  html: 'html',
  module: 'module',
  blocks: 'blocks',
};

export type BlockPropsConfigTypes = $Keys<typeof blockPropsConfigTypes>;
