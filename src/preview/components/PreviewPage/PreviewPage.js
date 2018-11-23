// @flow
import React from 'react';
import { previewBlocksParser } from '../../../parser/parser';
import type { MappedDataBlocks } from '../../../data/blocks/models';
import styles from './styles';
import BlockHighlighter from '../BlockHighlighter/BlockHighlighter';

type Props = {
  data: MappedDataBlocks,
  hoveredBlockKey: string,
};

const PreviewPage = ({ data, hoveredBlockKey }: Props) => (
  <React.Fragment>
    <div className={styles.containerClass}>{previewBlocksParser(data, hoveredBlockKey)}</div>
    <BlockHighlighter hoveredBlockKey={hoveredBlockKey} />
  </React.Fragment>
);

export default PreviewPage;
