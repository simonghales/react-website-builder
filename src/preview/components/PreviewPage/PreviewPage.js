// @flow
import React from 'react';
import { previewBlocksParser } from '../../../parser/parser';
import type { OLDSitePageDataModel } from '../../../data/blocks/models';
import styles from './styles';

type Props = {
  data: OLDSitePageDataModel,
};

const PreviewPage = ({ data }: Props) => (
  <div className={styles.containerClass}>{previewBlocksParser(data.blocks)}</div>
);

export default PreviewPage;
