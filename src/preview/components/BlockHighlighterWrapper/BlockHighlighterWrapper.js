// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PREVIEW_BLOCK_HOVERED_CLIENT_RECT } from '../../event';

type Props = {
  blockHighlighterHovered: boolean,
  blockHighlighterKey: string,
  [string]: any,
};

export type BlockClientRect = {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
  x: number,
  y: number,
};

export function withBlockHighlighter(WrappedComponent: any) {
  return class extends Component<Props> {
    childRef: {
      current?: any,
    };

    constructor(props: Props) {
      super(props);
      this.childRef = React.createRef();
    }

    componentDidMount(): void {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.props.blockHighlighterHovered) {
        this.updateHighlighter();
      }
    }

    componentDidUpdate(prevProps: Props): void {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.props.blockHighlighterHovered && !prevProps.blockHighlighterHovered) {
        this.updateHighlighter();
      }
    }

    updateHighlighter() {
      console.log('updateHighlighter');
      if (!this.childRef.current) return;
      let clientRect: BlockClientRect = {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
      };
      try {
        // eslint-disable-next-line react/no-find-dom-node
        const domNode: any = ReactDOM.findDOMNode(this.childRef.current);
        console.log('domNode', domNode);
        clientRect = domNode.getBoundingClientRect();
      } catch (e) {
        console.error(e);
      }
      console.log('clientRect', clientRect);
      const { blockHighlighterKey } = this.props;
      window.dispatchEvent(
        new CustomEvent(PREVIEW_BLOCK_HOVERED_CLIENT_RECT, {
          detail: {
            clientRect,
            blockKey: blockHighlighterKey,
          },
        })
      );
    }

    render() {
      const { blockHighlighterHovered, blockHighlighterKey, ...otherProps } = this.props;
      return <WrappedComponent {...otherProps} ref={this.childRef} />;
    }
  };
}
