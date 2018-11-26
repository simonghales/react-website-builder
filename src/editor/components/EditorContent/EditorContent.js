// @flow
import React, { Component } from 'react';
import styles from './styles';
import EditorComponentTabs, {
  editorComponentTabs,
} from './components/EditorComponentTabs/EditorComponentTabs';
import EditorComponentProps from './components/EditorComponentProps/EditorComponentProps';
import type { DataBlockModel } from '../../../data/blocks/models';
import type { EditorComponentTabsOptions } from './components/EditorComponentTabs/EditorComponentTabs';
import EditorComponentStyles from './components/EditorComponentStyles/EditorComponentStyles';
import { doesBlockAllowStyles } from '../../../data/blocks/state';
import EditorComponentHtml from "./components/EditorComponentHtml/EditorComponentHtml";

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
      selectedTab: editorComponentTabs.HTML,
    };
  }

  handleSelectTab = (tab: EditorComponentTabsOptions) => {
    this.setState({
      selectedTab: tab,
    });
  };

  renderMainContent() {
    const { selectedTab } = this.state;
    const { selectedBlock } = this.props;
    if (selectedTab === editorComponentTabs.Props) {
      return (
        <EditorComponentProps selectedBlock={selectedBlock} key={selectedBlock.key} />
      )
    } else if (selectedTab === editorComponentTabs.Styles) {
      return (
        <EditorComponentStyles
          blockKey={selectedBlock.key}
          key={selectedBlock.key}
          disabled={!doesBlockAllowStyles(selectedBlock)}
        />
      )
    } else {
      return (
        <EditorComponentHtml
          key={selectedBlock.key}
        />
      )
    }
  }

  render() {
    const { selectedTab } = this.state;
    return (
      <div className={styles.containerClass}>
        <EditorComponentTabs selectedTab={selectedTab} selectTab={this.handleSelectTab} />
        <div className={styles.mainClass}>
          {this.renderMainContent()}
        </div>
      </div>
    );
  }
}

export default EditorContent;
