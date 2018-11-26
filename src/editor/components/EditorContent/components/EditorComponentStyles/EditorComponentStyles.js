// @flow
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import StyleProp from '../../../../../components/StyleProp/StyleProp';
import type { BlockStyles, EditorMappedStylesContainer } from '../../../../../data/styles/models';
import { appearanceStyleSection, dimensionsStyleSection, textStyleSection } from './data';
import type { StyleSectionModel } from './data';
import { setBlockStyleValue } from '../../../../../state/redux/editor/reducer';
import EditorStylesMixins from './components/EditorStylesMixins/EditorStylesMixins';
import StyleSection from './components/StyleSection/StyleSection';
import type { ReduxState } from '../../../../../state/redux/store';
import {
  getMixinsFromState,
  getSelectedBlockStyle,
  getSelectedModuleSelectedBlockMixins,
} from '../../../../../state/redux/editor/state';
import { getEditorMappedBlockStyles } from '../../../../../data/styles/state';
import DisabledMessage from "../DisabledMessage/DisabledMessage";

type StyleSectionWrapperProps = {
  blockStyles: BlockStyles,
  editorMappedStyles: EditorMappedStylesContainer,
  data: StyleSectionModel,
  updateStyle: (cssKey: string, value: string) => void,
};

const StyleSectionWrapper = ({
  data,
  blockStyles,
  editorMappedStyles,
  updateStyle,
}: StyleSectionWrapperProps) => (
  <StyleSection title={data.title} gridBody>
    {data.styles.map(style => (
      <StyleProp
        styleProp={style.styleProp}
        columns={style.columns}
        key={style.styleProp.cssKey}
        blockStyles={blockStyles}
        editorMappedStyles={editorMappedStyles}
        updateStyle={updateStyle}
      />
    ))}
  </StyleSection>
);

type Props = {
  blockStyles: BlockStyles,
  editorMappedStyles: EditorMappedStylesContainer,
  blockKey: string,
  disabled: boolean,
  updateStyle: (
    blockKey: string,
    cssKey: string,
    modifier: string,
    section: string,
    value: string
  ) => void,
};

const Main = ({ blockKey, blockStyles, editorMappedStyles, updateStyle }: Props) => {
  const modifier = 'default'; // todo - variable
  const section = 'editor'; // todo - variable
  const update = (cssKey: string, value: string) => {
    updateStyle(blockKey, cssKey, modifier, section, value);
  };
  return (
    <div className={styles.mainClass}>
      <StyleSectionWrapper
        data={textStyleSection}
        blockStyles={blockStyles}
        editorMappedStyles={editorMappedStyles}
        updateStyle={update}
      />
      <StyleSectionWrapper
        data={appearanceStyleSection}
        blockStyles={blockStyles}
        editorMappedStyles={editorMappedStyles}
        updateStyle={update}
      />
      <StyleSectionWrapper
        data={dimensionsStyleSection}
        blockStyles={blockStyles}
        editorMappedStyles={editorMappedStyles}
        updateStyle={update}
      />
      <StyleSection title="Custom" gridBody={false}>
        <div>Custom style</div>
      </StyleSection>
    </div>
  );
};

const Side = ({ blockKey }: Props) => (
  <div className={styles.sideClass}>
    <EditorStylesMixins blockKey={blockKey} />
    <StyleSection title="Modifiers" gridBody={false}>
      <div>Modifiers</div>
    </StyleSection>
  </div>
);

const EditorComponentStyles = (props: Props) => {
  const { disabled } = props;
  if (disabled) {
    return <DisabledMessage message="This block cannot be styled."/>
  }
  return (
    <div className={styles.containerClass}>
      <Main {...props} />
      <Side {...props} />
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => {
  const mixins = getMixinsFromState(state.editor);
  const blockStyles = getSelectedBlockStyle(state.editor);
  const blockMixins = getSelectedModuleSelectedBlockMixins(state.editor);
  const editorMappedStyles = getEditorMappedBlockStyles(blockStyles.styles, blockMixins, mixins);
  return {
    blockStyles,
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
