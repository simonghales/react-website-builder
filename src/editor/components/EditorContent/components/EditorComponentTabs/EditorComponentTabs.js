// @flow
import React from 'react';
import { MdFormatListBulleted, MdBrush, MdCode } from 'react-icons/md';
import { cx } from 'emotion';
import styles from './styles';

export const editorComponentTabs = {
  Content: 'Content',
  Styles: 'Styles',
  HTML: 'HTML',
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
        [styles.activeTabClass]: selectedTab === editorComponentTabs.Content,
      })}
      onClick={() => selectTab(editorComponentTabs.Content)}
    >
      <MdFormatListBulleted />
      <span>{editorComponentTabs.Content}</span>
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
    <div
      className={cx(styles.tabClass, {
        [styles.activeTabClass]: selectedTab === editorComponentTabs.HTML,
      })}
      onClick={() => selectTab(editorComponentTabs.HTML)}
    >
      <MdCode />
      <span>{editorComponentTabs.HTML}</span>
    </div>
  </nav>
);

export default EditorComponentTabs;
