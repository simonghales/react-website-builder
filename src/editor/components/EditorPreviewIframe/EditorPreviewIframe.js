// @flow
import React, { Component } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { connect } from 'react-redux';
import { cx } from 'emotion';
import { PREVIEW_IFRAME_BROADCAST_INIT } from '../../../preview/constants';
import {
  PREVIEW_CONTENT_UPDATE_EVENT,
  PREVIEW_HOVERED_BLOCK_UPDATE_EVENT,
  PREVIEW_TAB_POLL_EVENT,
  PREVIEW_TAB_POLL_RECEIVED_EVENT,
} from '../../../preview/event';
import styles from './styles';
import type { ReduxState } from '../../../state/redux/store';
import {
  getPagePreviewMappedBlocks,
  getPreviewModuleMappedBlocks,
} from '../../../state/redux/editor/state';
import type { MappedDataBlocks } from '../../../data/blocks/models';
import IconButton from '../../../components/IconButton/IconButton';

export const editorPreviewIframeSizes = {
  full: 'full',
  embed: 'embed',
};

export const editorPreviewIframeTypes = {
  module: 'module',
  page: 'page',
};

type EditorPreviewIframeTypes = $Keys<typeof editorPreviewIframeTypes>;

type EditorPreviewIframeSizes = $Keys<typeof editorPreviewIframeSizes>;

type Props = {
  blocks: MappedDataBlocks,
  hoveredBlockKey: string,
  size?: EditorPreviewIframeSizes,
  type: EditorPreviewIframeTypes,
};

type State = {
  iframeInit: boolean,
  openedPreviewInTab: boolean,
};

class EditorPreviewIframe extends Component<Props, State> {
  iframeRef: {
    current: null | HTMLIFrameElement,
  };

  previewTabPollInterval: IntervalID;

  previewTabReference;

  static defaultProps = {
    size: editorPreviewIframeSizes.embed,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      iframeInit: false,
      openedPreviewInTab: false,
    };
    this.iframeRef = React.createRef();
  }

  componentDidMount() {
    this.addIframeListener();
    this.updateIframeData();
    this.updateHoveredBlockKey();
  }

  componentWillUnmount() {
    this.removeIframeListener();
  }

  isFullSize() {
    const { size } = this.props;
    return size === editorPreviewIframeSizes.full;
  }

  addIframeListener() {
    window.addEventListener('message', this.handlePreviewIframeBroadcast);
  }

  removeIframeListener() {
    window.removeEventListener('message', this.handlePreviewIframeBroadcast);
  }

  handlePreviewIframeBroadcast = (event: any) => {
    const { data } = event;
    if (data === PREVIEW_IFRAME_BROADCAST_INIT) {
      this.setState({
        iframeInit: true,
      });
      this.updateIframeData();
      console.log('handlePreviewIframeBroadcast');
    } else if (data === PREVIEW_TAB_POLL_RECEIVED_EVENT) {
      this.handlePreviewTabPollReceivedEvent();
    }
  };

  componentDidUpdate(prevProps: Props) {
    // eslint-disable-next-line react/destructuring-assignment
    if (prevProps.hoveredBlockKey !== this.props.hoveredBlockKey) {
      this.updateHoveredBlockKey();
    }
    this.updateIframeData();
  }

  getIframe(): null | HTMLIFrameElement {
    const { iframeInit } = this.state;
    if (!iframeInit) return null;
    const iframe = this.iframeRef.current;
    if (!iframe) return null;
    return iframe;
  }

  updateHoveredBlockKey() {
    const iframe = this.getIframe();
    if (!iframe) return;
    const { hoveredBlockKey } = this.props;
    iframe.contentWindow.dispatchEvent(
      new CustomEvent(PREVIEW_HOVERED_BLOCK_UPDATE_EVENT, {
        detail: hoveredBlockKey,
      })
    );
  }

  updateIframeData() {
    const iframe = this.getIframe();
    if (!iframe) return;
    const { blocks } = this.props;
    const dispatchEvent = new CustomEvent(PREVIEW_CONTENT_UPDATE_EVENT, {
      detail: blocks,
    });
    iframe.contentWindow.dispatchEvent(dispatchEvent);
    if (this.previewTabReference) {
      this.previewTabReference.dispatchEvent(dispatchEvent);
    }
  }

  getPreviewUrl = (): string => `${window.location.origin}/preview`;

  handleOpenPreviewInNewTab = () => {
    const url = this.getPreviewUrl();
    this.previewTabReference = window.open(url, `Preview Tab`);
    this.setState({
      openedPreviewInTab: true,
    });
    setTimeout(() => {
      this.pollNewPreviewTab();
      this.previewTabPollInterval = setInterval(this.pollNewPreviewTab, 1000);
    });
  };

  handlePreviewTabPollReceivedEvent = () => {
    console.log('handlePreviewTabPollReceivedEvent');
    clearInterval(this.previewTabPollInterval);
    this.updateIframeData();
  };

  pollNewPreviewTab = () => {
    try {
      this.previewTabReference.postMessage(PREVIEW_TAB_POLL_EVENT, '*');
    } catch (e) {
      console.error(e);
      clearInterval(this.previewTabPollInterval);
    }
  };

  render() {
    const isFullSize = this.isFullSize();
    return (
      <div className={styles.containerClass}>
        <div
          className={cx(styles.iframeWrapperClass, {
            [styles.iframeWrapperEmbedClass]: !isFullSize,
            [styles.iframeWrapperFullClass]: isFullSize,
          })}
        >
          <iframe
            className={styles.iframeClass}
            ref={this.iframeRef}
            src={this.getPreviewUrl()}
            title="Preview"
          />
          {!this.isFullSize() && (
            <div className={styles.openInTabClass}>
              <div>
                <IconButton
                  onClick={this.handleOpenPreviewInNewTab}
                  icon={<MdOpenInNew />}
                  tooltip="Open preview in new tab"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState, props: Props) => {
  const { type } = props;
  const isModuleType = type === editorPreviewIframeTypes.module;
  const blocks = isModuleType ? getPreviewModuleMappedBlocks(state) : getPagePreviewMappedBlocks(state);
  const hoveredBlockKey = isModuleType ? state.ui.hoveredBlockKey : '';
  return {
    blocks,
    hoveredBlockKey,
  };
};

export default connect(mapStateToProps)(EditorPreviewIframe);
