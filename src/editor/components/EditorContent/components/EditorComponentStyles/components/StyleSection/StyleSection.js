// @flow
import React from 'react';
import { cx } from 'emotion';
import { MdAdd, MdClose } from 'react-icons/md';
import styles from '../../styles';

const SectionHeader = ({
  text,
  showAdd,
  addTooltip,
}: {
  text: string,
  showAdd: boolean,
  addTooltip: string,
}) => (
  <header className={styles.sectionHeaderClass}>
    <div className={styles.sectionHeaderTitleClass}>{text}</div>
    {showAdd && (
      <div className={styles.sctionHeaderAddClass} data-tip={addTooltip}>
        <MdAdd size={18} />
      </div>
    )}
  </header>
);

const StyleSection = ({
  children,
  title,
  gridBody,
  showAdd = false,
  addTooltip = '',
}: {
  children: any,
  title: string,
  gridBody?: boolean,
  showAdd?: boolean,
  addTooltip?: string,
}) => (
  <div className={styles.sectionClass}>
    <SectionHeader text={title} showAdd={showAdd} addTooltip={addTooltip} />
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
  showAdd: false,
  addTooltip: '',
};

export default StyleSection;
