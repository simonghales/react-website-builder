// @flow
import React, { Component } from 'react';
import { PREVIEW_IFRAME_BROADCAST_INIT } from '../../../preview/constants';
import { PREVIEW_CONTENT_UPDATE_EVENT } from '../../../preview/event';
import { DUMMY_PAGE_DATA } from '../../../data/dummy';
import styles from './styles';

type Props = {};

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

  componentDidUpdate() {
    this.updateIframeData();
  }

  updateIframeData() {
    const { iframeInit } = this.state;
    if (!iframeInit) return;
    const iframe = this.iframeRef.current;
    if (!iframe) return;
    iframe.contentWindow.dispatchEvent(
      new CustomEvent(PREVIEW_CONTENT_UPDATE_EVENT, {
        detail: DUMMY_PAGE_DATA,
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

export default EditorPreviewIframe;
