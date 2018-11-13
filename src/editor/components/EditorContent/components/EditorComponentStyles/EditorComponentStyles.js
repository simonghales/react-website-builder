// @flow
import React from 'react';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import styles from './styles';
import StyleProp from '../../../../../components/StyleProp/StyleProp';
import type { BlockStyles } from '../../../../../data/styles/models';
import { appearanceStyleSection, dimensionsStyleSection, textStyleSection } from './data';
import type { StyleSectionModel } from './data';
import { setBlockStyleValue } from '../../../../../state/redux/editor/reducer';

const SectionHeader = ({ text }: { text: string }) => (
  <header className={styles.sectionHeaderClass}>
    <div className={styles.sectionHeaderTitleClass}>{text}</div>
  </header>
);

const StyleSection = ({
  children,
  title,
  gridBody,
}: {
  children: any,
  title: string,
  gridBody?: boolean,
}) => (
  <div className={styles.sectionClass}>
    <SectionHeader text={title} />
    <div
      className={cx(styles.sectionBodyClass, {
        [styles.sectionBodyGridClass]: gridBody,
      })}
    >
      {children}
    </div>
  </div>
);

StyleSection.defaultProps = {
  gridBody: true,
};

type StyleSectionWrapperProps = {
  blockStyles: BlockStyles,
  data: StyleSectionModel,
  updateStyle: (cssKey: string, value: string) => void,
};

const StyleSectionWrapper = ({ data, blockStyles, updateStyle }: StyleSectionWrapperProps) => (
  <StyleSection title={data.title} gridBody>
    {data.styles.map(style => (
      <StyleProp
        styleProp={style.styleProp}
        columns={style.columns}
        key={style.styleProp.cssKey}
        blockStyles={blockStyles}
        updateStyle={updateStyle}
      />
    ))}
  </StyleSection>
);

type Props = {
  blockStyles: BlockStyles,
  blockKey: string,
  updateStyle: (
    blockKey: string,
    cssKey: string,
    modifier: string,
    section: string,
    value: string
  ) => void,
};

const Main = ({ blockKey, blockStyles, updateStyle }: Props) => {
  const modifier = 'default'; // todo - variable
  const section = 'editor'; // todo - variable
  const update = (cssKey: string, value: string) => {
    updateStyle(blockKey, cssKey, modifier, section, value);
  };
  return (
    <div className={styles.mainClass}>
      <StyleSectionWrapper data={textStyleSection} blockStyles={blockStyles} updateStyle={update} />
      <StyleSectionWrapper
        data={appearanceStyleSection}
        blockStyles={blockStyles}
        updateStyle={update}
      />
      <StyleSectionWrapper
        data={dimensionsStyleSection}
        blockStyles={blockStyles}
        updateStyle={update}
      />
      <StyleSection title="Custom" gridBody={false}>
        <div>Custom style</div>
      </StyleSection>
    </div>
  );
};

const Side = () => (
  <div className={styles.sideClass}>
    <StyleSection title="Mixins" gridBody={false}>
      <div>Mixins</div>
    </StyleSection>
    <StyleSection title="Modifiers" gridBody={false}>
      <div>Modifiers</div>
    </StyleSection>
  </div>
);

const EditorComponentStyles = (props: Props) => (
  <div className={styles.containerClass}>
    <Main {...props} />
    <Side {...props} />
  </div>
);

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
  null,
  mapDispatchToProps
)(EditorComponentStyles);
