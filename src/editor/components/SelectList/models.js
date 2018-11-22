// @flow

export type SelectListItemModel = {
  key: string,
  name: string,
  disabled: boolean,
  onClick: () => void,
};

export type SelectListGroupModel = {
  key: string,
  name: string,
  items: Array<SelectListItemModel>,
};
