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
};

export type EditorFieldGroupModel = {
  key: string,
  label: string,
  grid: boolean,
  fields: Array<EditorFieldModel>,
};
