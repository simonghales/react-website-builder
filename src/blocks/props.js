// @flow

export const blockPropsConfigTypes = {
  string: 'string',
  html: 'html',
  module: 'module',
  blocks: 'blocks',
  htmlAttribute: 'htmlAttribute',
  propReference: 'propReference',
};

export const blockPropsCustomAllowedTypes: Array<string> = [blockPropsConfigTypes.string];

export type BlockPropsConfigTypes = $Keys<typeof blockPropsConfigTypes>;

export const blockPropsDisplaySections = {
  props: 'props',
  html: 'html',
};
export type BlockPropsDisplaySections = $Keys<typeof blockPropsDisplaySections>;
