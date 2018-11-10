// @flow
import React from 'react';
import { MdBrush, MdCode } from 'react-icons/md';
import { cx } from 'emotion';
import styles from './styles';

export const editorComponentTabs = {
  Props: 'Props',
  Styles: 'Styles',
};

export type EditorComponentTabsOptions = $Keys<typeof editorComponentTabs>;

type Props = {
  selectedTab: EditorComponentTabsOptions,
  selectTab: (tab: EditorComponentTabsOptions) => void,
};

const EditorComponentTabs = ({ selectedTab, selectTab }: Props) => (
  <nav className={styles.containerClass}>
    <div
      className={cx(styles.tabClass, {
        [styles.activeTabClass]: selectedTab === editorComponentTabs.Props,
      })}
      onClick={() => selectTab(editorComponentTabs.Props)}
    >
      <MdCode />
      <span>{editorComponentTabs.Props}</span>
    </div>
    <div
      className={cx(styles.tabClass, {
        [styles.activeTabClass]: selectedTab === editorComponentTabs.Styles,
      })}
      onClick={() => selectTab(editorComponentTabs.Styles)}
    >
      <MdBrush />
      <span>{editorComponentTabs.Styles}</span>
    </div>
  </nav>
);

export default EditorComponentTabs;
