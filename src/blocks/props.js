// @flow

export const blockPropsConfigTypes = {
  string: 'string',
  html: 'html',
  module: 'module',
  blocks: 'blocks',
  htmlAttribute: 'htmlAttribute',
};

export type BlockPropsConfigTypes = $Keys<typeof blockPropsConfigTypes>;

export const blockPropsDisplaySections = {
  props: 'props',
  html: 'html',
};
export type BlockPropsDisplaySections = $Keys<typeof blockPropsDisplaySections>;
