// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from '../../styles';

const SectionHeader = ({ text, headerIcon }: { text: string, headerIcon: any }) => (
  <header className={styles.sectionHeaderClass}>
    <div className={styles.sectionHeaderTitleClass}>{text}</div>
    {headerIcon && headerIcon}
  </header>
);

const StyleSection = ({
  children,
  title,
  gridBody,
  headerIcon,
}: {
  children: any,
  title: string,
  gridBody?: boolean,
  headerIcon?: any,
}) => (
  <div className={styles.sectionClass}>
    <SectionHeader text={title} headerIcon={headerIcon} />
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
  headerIcon: undefined,
};

export default StyleSection;
