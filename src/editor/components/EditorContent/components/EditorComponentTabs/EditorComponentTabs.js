// @flow
import React from 'react';
import { MdFormatListBulleted, MdBrush, MdCode, MdEdit } from 'react-icons/md';
import { cx } from 'emotion';
import styles from './styles';

export const editorComponentTabs = {
  Content: 'Content',
  Styles: 'Styles',
  HTML: 'HTML',
  Mixin: 'Mixin',
};

export type EditorComponentTabsOptions = $Keys<typeof editorComponentTabs>;

type Props = {
  selectedTab: EditorComponentTabsOptions,
  selectTab: (tab: EditorComponentTabsOptions) => void,
};

const EditorComponentTabs = ({ selectedTab, selectTab }: Props) => {
  const isMixinSelected = selectedTab === editorComponentTabs.Mixin;
  return (
    <nav className={styles.containerClass}>
      <div className={styles.mainNavClass}>
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
      </div>
      <div className={styles.extraNavClass}>
        {isMixinSelected && (
          <div
            className={cx(styles.tabClass, {
              [styles.activeTabClass]: isMixinSelected,
            })}
            onClick={() => {}}
          >
            <MdEdit />
            <span>{editorComponentTabs.Mixin}</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default EditorComponentTabs;
