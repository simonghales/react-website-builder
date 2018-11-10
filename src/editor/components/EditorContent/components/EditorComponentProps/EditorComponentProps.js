// @flow
import React from 'react';
import Field from '../../../../../components/Field/Field';
import styles from './styles';
import type { SitePageDataBlockModel } from '../../../../../data/blocks/models';
import { getBlockPropLabel } from '../../../../../data/blocks/models';

type PropFieldProps = {
  label: string,
  value: string,
};

const PropField = ({ label, value }: PropFieldProps) => (
  <div className={styles.fieldClass}>
    <Field label={label} value={value} />
  </div>
);

type Props = {
  selectedBlock: SitePageDataBlockModel,
};

const EditorComponentProps = ({ selectedBlock }: Props) => (
  <div className={styles.containerClass}>
    {Object.keys(selectedBlock.propsConfig).map(propKey => {
      const value = selectedBlock.props[propKey];
      const propConfig = selectedBlock.propsConfig[propKey];
      const label = getBlockPropLabel(propKey, propConfig);
      return <PropField key={propKey} value={value} label={label} />;
    })}
  </div>
);

export default EditorComponentProps;
