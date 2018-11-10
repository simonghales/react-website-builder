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
      selectedTab: editorComponentTabs.Props,
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
          <div className={styles.addPropClass}>
            <Button type={buttonTypes.slim}>Add Prop</Button>
          </div>
          <EditorComponentProps selectedBlock={selectedBlock} />
        </div>
      </div>
    );
  }
}

export default EditorContent;
