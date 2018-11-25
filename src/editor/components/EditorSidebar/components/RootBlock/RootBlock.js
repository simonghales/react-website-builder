// @flow
import React from 'react';
import BlockPreview from '../BlockPreview/BlockPreview';

type Props = {
  children: any,
  blockKey: string,
  selected: boolean,
};

const RootBlock = ({ children, blockKey, selected }: Props) => (
  <BlockPreview blockKey={blockKey} selected={selected}>
    {children}
  </BlockPreview>
);

export default RootBlock;
