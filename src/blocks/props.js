// @flow

export const BLOCK_REPEATER_DATA_CHILDREN = '_BLOCK_REPEATER_DATA_CHILDREN';

export const blockPropsConfigTypes = {
  string: 'string',
  html: 'html',
  module: 'module',
  blocks: 'blocks',
  htmlAttribute: 'htmlAttribute',
  propReference: 'propReference',
  repeaterData: 'repeaterData',
};

export const blockPropsCustomAllowedTypes: Array<string> = [blockPropsConfigTypes.string];

export type BlockPropsConfigTypes = $Keys<typeof blockPropsConfigTypes>;

export const blockPropsDisplaySections = {
  props: 'props',
  html: 'html',
};
export type BlockPropsDisplaySections = $Keys<typeof blockPropsDisplaySections>;
