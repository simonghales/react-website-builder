// @flow

export type EditorFieldModel = {
  key: string,
  label: string,
  labelHighlighted: boolean,
  value: string,
  inputType: string,
  onChange: (value: string) => void,
  noLabelWrapper: boolean,
};

export type EditorFieldGroupModel = {
  key: string,
  label: string,
  fields: Array<EditorFieldModel>,
}
