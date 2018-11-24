// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PREVIEW_IFRAME_BROADCAST_INIT } from '../../../preview/constants';
import {
  PREVIEW_CONTENT_UPDATE_EVENT,
  PREVIEW_HOVERED_BLOCK_UPDATE_EVENT,
} from '../../../preview/event';
import styles from './styles';
import type { ReduxState } from '../../../state/redux/store';
import { getPreviewMappedBlocks } from '../../../state/redux/editor/state';
import type { MappedDataBlocks } from '../../../data/blocks/models';

type Props = {
  blocks: MappedDataBlocks,
  hoveredBlockKey: string,
};

type State = {
  iframeInit: boolean,
};

class EditorPreviewIframe extends Component<Props, State> {
  iframeRef: {
    current: null | HTMLIFrameElement,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      iframeInit: false,
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
    iframe.contentWindow.dispatchEvent(
      new CustomEvent(PREVIEW_CONTENT_UPDATE_EVENT, {
        detail: blocks,
      })
    );
  }

  render() {
    return (
      <div className={styles.containerClass}>
        <div className={styles.iframeWrapperClass}>
          <iframe
            className={styles.iframeClass}
            ref={this.iframeRef}
            src={`${window.location.origin}/preview`}
            title="Preview"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  blocks: getPreviewMappedBlocks(state.editor),
  hoveredBlockKey: state.ui.hoveredBlockKey,
});

export default connect(mapStateToProps)(EditorPreviewIframe);
