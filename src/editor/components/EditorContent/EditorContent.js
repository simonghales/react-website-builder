// @flow
import React, { Component } from 'react';
import styles from './styles';
import EditorComponentTabs, {
  editorComponentTabs,
} from './components/EditorComponentTabs/EditorComponentTabs';
import EditorComponentProps from './components/EditorComponentProps/EditorComponentProps';
import Button, { buttonTypes } from '../../../components/Button/Button';
import type { DataBlockModel } from '../../../data/blocks/models';
import type { EditorComponentTabsOptions } from './components/EditorComponentTabs/EditorComponentTabs';
import EditorComponentStyles from './components/EditorComponentStyles/EditorComponentStyles';

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
      selectedTab: editorComponentTabs.Styles,
    };
  }

  handleSelectTab = (tab: EditorComponentTabsOptions) => {
    this.setState({
      selectedTab: tab,
    });
  };

  render() {
    const { selectedBlock } = this.props;
    const { selectedTab } = this.state;
    return (
      <div className={styles.containerClass}>
        <EditorComponentTabs selectedTab={selectedTab} selectTab={this.handleSelectTab} />
        <div className={styles.mainClass}>
          {selectedTab === editorComponentTabs.Props ? (
            <EditorComponentProps selectedBlock={selectedBlock} />
          ) : (
            <EditorComponentStyles />
          )}
        </div>
      </div>
    );
  }
}

export default EditorContent;
