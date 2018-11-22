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

const PreviewPage = ({ data }: Props) => (
  <React.Fragment>
    <div className={styles.containerClass}>{previewBlocksParser(data)}</div>
    <BlockHighlighter />
  </React.Fragment>
);

export default PreviewPage;
