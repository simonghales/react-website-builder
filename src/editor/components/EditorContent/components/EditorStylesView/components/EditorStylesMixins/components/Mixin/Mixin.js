// @flow
import React from 'react';
import { cx } from 'emotion';
import { MdClose, MdFormatColorText } from 'react-icons/md';
import styles from '../../styles';
import type { DataBlockMappedMixinModel } from '../../../../../../../../../data/blocks/models';

type Props = {
  mixin: DataBlockMappedMixinModel,
  removeMixin: (mixinKey: string) => void,
  setEditingMixin: (mixinKey: string) => void,
};

const Mixin = ({ mixin, removeMixin, setEditingMixin }: Props) => (
  <div
    className={cx(styles.mixinClass, styles.classNames.mixin)}
    key={mixin.key}
    onClick={event => {
      setEditingMixin(mixin.key);
      event.stopPropagation();
    }}
  >
    <div className={styles.mixinIconClass}>
      <MdFormatColorText />
    </div>
    <div className={styles.mixinTextClass}>
      <div className={styles.mixinLabelClass}>{mixin.groupKey}</div>
      <div>{mixin.name}</div>
    </div>
    <div
      className={styles.mixinRemoveClass}
      onClick={event => {
        removeMixin(mixin.key);
        event.stopPropagation();
      }}
    >
      <MdClose />
    </div>
  </div>
);

export default Mixin;
