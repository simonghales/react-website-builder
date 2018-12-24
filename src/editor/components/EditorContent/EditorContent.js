// @flow
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
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
import { EditorContentContext } from './context';
import type { EditorContentContextState } from './context';
import EditorComponentMixin from './components/EditorComponentMixin/EditorComponentMixin';
import { setEditingMixinKeyRedux } from '../../../state/redux/ui/reducer';
import type { ReduxState } from '../../../state/redux/store';
import { getEditingMixinKeyFromUIState } from '../../../state/redux/ui/state';

type Props = {
  editingMixinKey: string,
  selectedBlock: DataBlockModel,
  setEditingMixinKey: (mixinKey: string) => void,
};

type State = {
  selectedTab: EditorComponentTabsOptions,
  context: EditorContentContextState,
};

class EditorContent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedTab: editorComponentTabs.Mixin, // todo - set to Props
      context: {
        setEditingMixin: this.handleSetEditingMixin,
      },
    };
  }

  handleSetEditingMixin = (mixinKey: string) => {
    const { setEditingMixinKey } = this.props;
    setEditingMixinKey(mixinKey);
    this.setState({
      selectedTab: editorComponentTabs.Mixin,
    });
  };

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
    const { selectedBlock, editingMixinKey } = this.props;
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
    if (selectedTab === editorComponentTabs.HTML) {
      return (
        <EditorComponentHtml
          key={selectedBlock.key}
          blockKey={selectedBlock.key}
          dataBlock={selectedBlock}
          disabled={!doesBlockAllowHtml(selectedBlock)}
        />
      );
    }
    if (selectedTab === editorComponentTabs.Mixin) {
      return (
        <EditorComponentMixin
          blockKey={selectedBlock.key}
          mixinKey={editingMixinKey}
          key={editingMixinKey}
          disabled={!doesBlockAllowStyles(selectedBlock)}
        />
      );
    }
    return null;
  }

  render() {
    const { selectedTab, context } = this.state;
    return (
      <EditorContentContext.Provider value={context}>
        <div className={styles.containerClass}>
          <EditorComponentTabs selectedTab={selectedTab} selectTab={this.handleSelectTab} />
          <div className={styles.mainClass}>{this.renderMainContent()}</div>
        </div>
      </EditorContentContext.Provider>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  editingMixinKey: getEditingMixinKeyFromUIState(state.ui),
});

const mapDispatchToProps = {
  setEditingMixinKey: (mixinKey: string) => setEditingMixinKeyRedux(mixinKey),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorContent);
