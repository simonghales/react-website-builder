// @flow
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import styles from './styles';
import EditorComponentTabs, {
  editorComponentTabs,
} from './components/EditorComponentTabs/EditorComponentTabs';
import EditorComponentProps from './components/EditorComponentContent/EditorComponentContent';
import type { DataBlockModel } from '../../../data/blocks/models';
import type { EditorComponentTabsOptions } from './components/EditorComponentTabs/EditorComponentTabs';
import { doesBlockAllowHtml, doesBlockAllowStyles } from '../../../data/blocks/state';
import EditorComponentStyles from './components/EditorComponentStyles/EditorComponentStyles';
import EditorComponentHtml from './components/EditorComponentHtml/EditorComponentHtml';

type Props = {
  selectedBlock: DataBlockModel,
};

type State = {
  selectedTab: EditorComponentTabsOptions,
};

class EditorContent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedTab: editorComponentTabs.Content,
    };
  }

  handleSelectTab = (tab: EditorComponentTabsOptions) => {
    this.setState(
      {
        selectedTab: tab,
      },
      () => {
        ReactTooltip.rebuild();
      }
    );
  };

  renderMainContent() {
    const { selectedTab } = this.state;
    const { selectedBlock } = this.props;
    if (selectedTab === editorComponentTabs.Content) {
      return (
        <EditorComponentProps
          key={selectedBlock.key}
          blockKey={selectedBlock.key}
          dataBlock={selectedBlock}
        />
      );
    }
    if (selectedTab === editorComponentTabs.Styles) {
      return (
        <EditorComponentStyles
          blockKey={selectedBlock.key}
          key={selectedBlock.key}
          disabled={!doesBlockAllowStyles(selectedBlock)}
        />
      );
    }
    return (
      <EditorComponentHtml
        key={selectedBlock.key}
        blockKey={selectedBlock.key}
        dataBlock={selectedBlock}
        disabled={!doesBlockAllowHtml(selectedBlock)}
      />
    );
  }

  render() {
    const { selectedTab } = this.state;
    return (
      <div className={styles.containerClass}>
        <EditorComponentTabs selectedTab={selectedTab} selectTab={this.handleSelectTab} />
        <div className={styles.mainClass}>{this.renderMainContent()}</div>
      </div>
    );
  }
}

export default EditorContent;
