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
};

export type EditorFieldGroupModel = {
  key: string,
  label: string,
  grid: boolean,
  fields: Array<EditorFieldModel>,
};
