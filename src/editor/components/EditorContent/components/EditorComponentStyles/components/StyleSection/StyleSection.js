// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from '../../styles';

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

export default StyleSection;
