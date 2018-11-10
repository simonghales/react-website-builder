// @flow
import React from 'react';
import { previewBlocksParser } from '../../../parser/parser';
import type { SitePageDataModel } from '../../../data/blocks/models';
import styles from './styles';

type Props = {
  data: SitePageDataModel,
};

const PreviewPage = ({ data }: Props) => (
  <div className={styles.containerClass}>{previewBlocksParser(data.blocks)}</div>
);

export default PreviewPage;
