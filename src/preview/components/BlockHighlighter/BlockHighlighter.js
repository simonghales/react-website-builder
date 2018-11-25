// @flow
import React, { Component } from 'react';
import styles from './styles';
import { PREVIEW_BLOCK_HOVERED_CLIENT_RECT } from '../../event';
import type { BlockClientRect } from '../BlockHighlighterWrapper/BlockHighlighterWrapper';

type Props = {
  hoveredBlockKey: string,
};

type State = {
  blockKey: string,
  x: number,
  y: number,
  width: number,
  height: number,
  visible: boolean,
};

class BlockHighlighter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      blockKey: '',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      visible: false,
    };
  }

  componentDidMount() {
    window.addEventListener(PREVIEW_BLOCK_HOVERED_CLIENT_RECT, this.handleClientRectUpdate);
  }

  componentWillUnmount() {
    window.removeEventListener(PREVIEW_BLOCK_HOVERED_CLIENT_RECT, this.handleClientRectUpdate);
  }

  handleClientRectUpdate = (event: any) => {
    const { detail } = event;
    if (!detail) {
      console.warn(`No detail provided`);
    }
    const {
      clientRect,
      blockKey,
      visible,
    }: { clientRect: BlockClientRect, blockKey: string, visible: boolean } = detail;
    this.setState({
      blockKey,
      x: clientRect.x,
      y: clientRect.y,
      width: clientRect.width,
      height: clientRect.height,
      visible,
    });
  };

  render() {
    const { blockKey, x, y, width, height, visible } = this.state;
    const { hoveredBlockKey } = this.props;
    return (
      <div
        className={styles.blockClass}
        style={{
          left: x,
          top: y,
          width,
          height,
          display: visible && hoveredBlockKey && hoveredBlockKey === blockKey ? 'block' : 'none',
        }}
      />
    );
  }
}

export default BlockHighlighter;
