// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';
import StyleProp from '../../../../../components/StyleProp/StyleProp';
import styleProps from '../../../../../data/styles/styleProps';

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

const Main = () => (
  <div className={styles.mainClass}>
    <StyleSection title="Text">
      <StyleProp columns={3} styleProp={styleProps.fontFamily} />
      <StyleProp columns={1} styleProp={styleProps.fontSize} />
      <StyleProp columns={3} styleProp={styleProps.fontWeight} />
      <StyleProp columns={1} styleProp={styleProps.color} />
      <StyleProp columns={3} styleProp={styleProps.textStyle} />
      <StyleProp columns={1} styleProp={styleProps.lineHeight} />
      <StyleProp columns={4} styleProp={styleProps.textAlign} />
    </StyleSection>
    <StyleSection title="Appearance">
      <StyleProp columns={3} styleProp={styleProps.fontFamily} />
      <StyleProp columns={1} styleProp={styleProps.fontFamily} />
    </StyleSection>
    <StyleSection title="Layout">
      <StyleProp columns={3} styleProp={styleProps.fontFamily} />
      <StyleProp columns={1} styleProp={styleProps.fontFamily} />
    </StyleSection>
    <StyleSection title="Custom" gridBody={false}>
      <div>Custom style</div>
    </StyleSection>
  </div>
);

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

const EditorComponentStyles = () => (
  <div className={styles.containerClass}>
    <Main />
    <Side />
  </div>
);

export default EditorComponentStyles;
