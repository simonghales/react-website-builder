// @flow
import React, { Component } from 'react';
import PreviewPage from '../../components/PreviewPage/PreviewPage';
import { PREVIEW_IFRAME_BROADCAST_INIT } from '../../constants';
import { PREVIEW_CONTENT_UPDATE_EVENT } from '../../event';
import type { OLDSitePageDataModel } from '../../../data/blocks/models';

type Props = {};

type State = {
  data: OLDSitePageDataModel | null,
};

class PreviewView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.listenForContentUpdateEvents();
    this.updateParentWindow();
  }

  componentWillUnmount() {
    window.removeEventListener(PREVIEW_CONTENT_UPDATE_EVENT, this.handleContentUpdateEvent);
  }

  listenForContentUpdateEvents() {
    window.addEventListener(PREVIEW_CONTENT_UPDATE_EVENT, this.handleContentUpdateEvent);
  }

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
    const { data } = this.state;
    if (!data) return null;
    return <PreviewPage data={data} />;
  }
}

export default PreviewView;
