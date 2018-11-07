// @flow

export type BlockModel = {
  component: any,
  key: string,
  defaultProps: {
    [string]: any,
  },
};

export type BlockGroupModel = {
  blocks: {
    [string]: BlockModel,
  },
  key: string,
};
