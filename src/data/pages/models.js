// @flow

export type PageDataModel = {
  key: string,
  name: string,
  slug: string,
  moduleKey: string,
};

export type PagesDataModel = {
  [string]: PageDataModel,
};
