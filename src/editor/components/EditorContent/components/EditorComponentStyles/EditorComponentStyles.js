// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditorFields from '../EditorFields/EditorFields';
import { editorInputTypes } from '../EditorFields/components/EditorField/EditorField';
import EditorLayout from '../EditorLayout/EditorLayout';
import EditorLayoutColumn from '../EditorLayout/components/EditorLayoutColumn';
import EditorFieldGroup from '../EditorFields/components/EditorFieldGroup/EditorFieldGroup';
import type { EditorFieldGroupModel, EditorFieldModel } from '../EditorFields/model';
import EditorStylesMixins from './components/EditorStylesMixins/EditorStylesMixins';
import type { ReduxState } from '../../../../../state/redux/store';
import {
  getMixinsFromState,
  getSelectedBlockStyle,
  getSelectedModuleSelectedBlockMixins,
} from '../../../../../state/redux/editor/state';
import { getEditorMappedBlockStyles, getStyleValue } from '../../../../../data/styles/state';
import { setBlockStyleValue } from '../../../../../state/redux/editor/reducer';
import type { EditorMappedStylesContainer } from '../../../../../data/styles/models';
import DisabledMessage from '../DisabledMessage/DisabledMessage';

type CssProperty = {
  key: string,
  label: string,
  inputType: string,
  columns: number,
  noLabelWrapper: boolean,
};

const textCssProperties: {
  [string]: CssProperty,
} = {
  fontFamily: {
    key: 'fontFamily',
    label: 'font-family',
    inputType: editorInputTypes.fontFamily,
    columns: 3,
    noLabelWrapper: false,
  },
  fontSize: {
    key: 'fontSize',
    label: 'font-size',
    inputType: editorInputTypes.string,
    columns: 1,
    noLabelWrapper: false,
  },
  fontWeight: {
    key: 'fontWeight',
    label: 'font-weight',
    inputType: editorInputTypes.fontWeight,
    columns: 3,
    noLabelWrapper: false,
  },
  color: {
    key: 'color',
    label: 'color',
    inputType: editorInputTypes.color,
    columns: 1,
    noLabelWrapper: true,
  },
  fontStyle: {
    key: 'fontStyle',
    label: 'font-style',
    inputType: editorInputTypes.fontStyle,
    columns: 3,
    noLabelWrapper: false,
  },
  lineHeight: {
    key: 'lineHeight',
    label: 'line-height',
    inputType: editorInputTypes.string,
    columns: 1,
    noLabelWrapper: false,
  },
  textAlign: {
    key: 'textAlign',
    label: 'text-align',
    inputType: editorInputTypes.textAlign,
    columns: 4,
    noLabelWrapper: false,
  },
};

const appearanceCssProperties: {
  [string]: CssProperty,
} = {
  background: {
    key: 'background',
    label: 'background',
    inputType: editorInputTypes.string,
    columns: 4,
    noLabelWrapper: false,
  },
  border: {
    key: 'border',
    label: 'border',
    inputType: editorInputTypes.string,
    columns: 4,
    noLabelWrapper: false,
  },
  boxShadow: {
    key: 'boxShadow',
    label: 'box-shadow',
    inputType: editorInputTypes.string,
    columns: 4,
    noLabelWrapper: false,
  },
};

const dimensionsCssProperties: {
  [string]: CssProperty,
} = {
  width: {
    key: 'width',
    label: 'width',
    inputType: editorInputTypes.string,
    columns: 2,
    noLabelWrapper: false,
  },
  maxWidth: {
    key: 'maxWidth',
    label: 'max-width',
    inputType: editorInputTypes.string,
    columns: 1,
    noLabelWrapper: false,
  },
  minWidth: {
    key: 'minWidth',
    label: 'min-width',
    inputType: editorInputTypes.string,
    columns: 1,
    noLabelWrapper: false,
  },
  height: {
    key: 'height',
    label: 'height',
    inputType: editorInputTypes.string,
    columns: 2,
    noLabelWrapper: false,
  },
  maxHeight: {
    key: 'maxHeight',
    label: 'max-height',
    inputType: editorInputTypes.string,
    columns: 1,
    noLabelWrapper: false,
  },
  minHeight: {
    key: 'minHeight',
    label: 'min-height',
    inputType: editorInputTypes.string,
    columns: 1,
    noLabelWrapper: false,
  },
};

type Props = {
  blockKey: string,
  disabled: boolean,
  editorMappedStyles: EditorMappedStylesContainer,
  updateStyle: (
    blockKey: string,
    cssKey: string,
    modifier: string,
    section: string,
    value: string
  ) => void,
};

class EditorComponentStyles extends Component<Props> {
  handleUpdateStyle = (cssKey: string, value: string) => {
    const modifier = 'default'; // todo - variable
    const section = 'editor'; // todo - variable
    const { updateStyle, blockKey } = this.props;
    updateStyle(blockKey, cssKey, modifier, section, value);
  };

  getStyleUpdate = (cssKey: string) => (value: string) => {
    this.handleUpdateStyle(cssKey, value);
  };

  getTextField = (property: CssProperty): EditorFieldModel => {
    const { editorMappedStyles } = this.props;
    const styleValue = getStyleValue(property.key, editorMappedStyles);
    const { value, inheritedValue, setInBlock = false } = styleValue;
    return {
      key: property.key,
      label: property.label,
      labelHighlighted: setInBlock,
      inputType: property.inputType,
      value,
      inheritedValue,
      onChange: this.getStyleUpdate(property.key),
      noLabelWrapper: property.noLabelWrapper,
      columns: property.columns,
    };
  };

  getTextFields = (properties: Array<CssProperty>): Array<EditorFieldModel> =>
    properties.map(this.getTextField);

  getTextFieldGroup = (): EditorFieldGroupModel => ({
    key: 'text',
    label: 'Text',
    grid: true,
    fields: this.getTextFields(
      Object.keys(textCssProperties).map(propertyKey => textCssProperties[propertyKey])
    ),
  });

  getAppearanceFieldGroup = (): EditorFieldGroupModel => ({
    key: 'appearance',
    label: 'Appearance',
    grid: true,
    fields: this.getTextFields(
      Object.keys(appearanceCssProperties).map(propertyKey => appearanceCssProperties[propertyKey])
    ),
  });

  getDimensionsFieldGroup = (): EditorFieldGroupModel => ({
    key: 'dimensions',
    label: 'Dimensions',
    grid: true,
    fields: this.getTextFields(
      Object.keys(dimensionsCssProperties).map(propertyKey => dimensionsCssProperties[propertyKey])
    ),
  });

  getMainFieldGroups(): Array<EditorFieldGroupModel> {
    return [
      this.getTextFieldGroup(),
      this.getAppearanceFieldGroup(),
      this.getDimensionsFieldGroup(),
    ];
  }

  render() {
    const { blockKey, disabled } = this.props;
    if (disabled) {
      return <DisabledMessage message="This block cannot be styled." />;
    }
    return (
      <EditorLayout>
        <EditorLayoutColumn columns={8}>
          <EditorFields fieldGroups={this.getMainFieldGroups()} blockKey={blockKey} />
        </EditorLayoutColumn>
        <EditorLayoutColumn columns={1} />
        <EditorLayoutColumn columns={5}>
          <EditorStylesMixins blockKey={blockKey} />
        </EditorLayoutColumn>
      </EditorLayout>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const mixins = getMixinsFromState(state.editor);
  const blockStyles = getSelectedBlockStyle(state.editor);
  const blockMixins = getSelectedModuleSelectedBlockMixins(state.editor);
  const editorMappedStyles = getEditorMappedBlockStyles(blockStyles.styles, blockMixins, mixins);
  return {
    editorMappedStyles,
  };
};

const mapDispatchToProps = {
  updateStyle: (
    blockKey: string,
    cssKey: string,
    modifier: string,
    section: string,
    value: string
  ) => setBlockStyleValue(blockKey, cssKey, modifier, section, value),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorComponentStyles);
