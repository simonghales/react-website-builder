// @flow
import React from 'react';
import { previewBlocksParser } from '../../../parser/parser';
import type { MappedDataBlocks } from '../../../data/blocks/models';
import styles from './styles';

type Props = {
  data: MappedDataBlocks,
};

const PreviewPage = ({ data }: Props) => (
  <div className={styles.containerClass}>{previewBlocksParser(data)}</div>
);

export default PreviewPage;
