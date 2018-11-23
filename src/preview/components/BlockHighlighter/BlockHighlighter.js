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
    const { clientRect, blockKey }: { clientRect: BlockClientRect, blockKey: string } = detail;
    this.setState({
      blockKey,
      x: clientRect.x,
      y: clientRect.y,
      width: clientRect.width,
      height: clientRect.height,
    });
  };

  render() {
    const { blockKey, x, y, width, height } = this.state;
    const { hoveredBlockKey } = this.props;
    return (
      <div
        className={styles.blockClass}
        style={{
          left: x,
          top: y,
          width,
          height,
          display: hoveredBlockKey && hoveredBlockKey === blockKey ? 'block' : 'none',
        }}
      />
    );
  }
}

export default BlockHighlighter;
