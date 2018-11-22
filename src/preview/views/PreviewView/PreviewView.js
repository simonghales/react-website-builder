// @flow
import React, { Component } from 'react';
import PreviewPage from '../../components/PreviewPage/PreviewPage';
import { PREVIEW_IFRAME_BROADCAST_INIT } from '../../constants';
import { PREVIEW_CONTENT_UPDATE_EVENT, PREVIEW_HOVERED_BLOCK_UPDATE_EVENT } from '../../event';
import type { MappedDataBlocks } from '../../../data/blocks/models';

type Props = {};

type State = {
  data: MappedDataBlocks | null,
  hoveredBlockKey: string,
};

class PreviewView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
      hoveredBlockKey: '',
    };
  }

  componentDidMount() {
    this.listenForContentUpdateEvents();
    this.updateParentWindow();
  }

  componentWillUnmount() {
    window.removeEventListener(PREVIEW_CONTENT_UPDATE_EVENT, this.handleContentUpdateEvent);
    window.removeEventListener(
      PREVIEW_HOVERED_BLOCK_UPDATE_EVENT,
      this.handleHoveredBlockUpdateEvent
    );
  }

  listenForContentUpdateEvents() {
    window.addEventListener(PREVIEW_CONTENT_UPDATE_EVENT, this.handleContentUpdateEvent);
    window.addEventListener(PREVIEW_HOVERED_BLOCK_UPDATE_EVENT, this.handleHoveredBlockUpdateEvent);
  }

  handleHoveredBlockUpdateEvent = (event: any) => {
    const { detail } = event;
    if (!detail) {
      console.warn(`No detail provided`);
      return;
    }
    this.setState({
      hoveredBlockKey: detail,
    });
  };

  handleContentUpdateEvent = (event: any) => {
    const { detail } = event;
    if (!detail) {
      console.warn(`No detail provided`);
      return;
    }
    this.setState({
      data: detail,
    });
  };

  updateParentWindow() {
    window.parent.postMessage(PREVIEW_IFRAME_BROADCAST_INIT);
  }

  render() {
    const { data, hoveredBlockKey } = this.state;
    if (!data) return null;
    return <PreviewPage data={data} hoveredBlockKey={hoveredBlockKey} />;
  }
}

export default PreviewView;
