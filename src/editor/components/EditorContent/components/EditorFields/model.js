// @flow

export type EditorFieldModel = {
  key: string,
  label: string,
  labelHighlighted: boolean,
  value: string,
  inheritedValue: string,
  inputType: string,
  onChange: (value: string) => void,
  noLabelWrapper: boolean,
  columns: number,
  isPropReference: boolean,
  linkedPropKey: string,
  isLinkable?: boolean,
};

export type EditorFieldGroupModel = {
  key: string,
  label: string,
  grid: boolean,
  fields: Array<EditorFieldModel>,
};
