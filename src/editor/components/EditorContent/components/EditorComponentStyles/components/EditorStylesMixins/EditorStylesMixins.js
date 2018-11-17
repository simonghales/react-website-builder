// @flow
import React from 'react';
import { connect } from 'react-redux';
import { MdFormatColorText, MdClose } from 'react-icons/md';
import { cx } from 'emotion';
import StyleSection from '../StyleSection/StyleSection';
import type { ReduxState } from '../../../../../../../state/redux/store';
import { getSelectedModuleSelectedBlockMappedMixins } from '../../../../../../../state/redux/editor/state';
import type { DataBlockMappedMixinsModel } from '../../../../../../../data/blocks/models';
import styles from './styles';
import { removeBlockStylesMixin } from '../../../../../../../state/redux/editor/reducer';

type Props = {
  blockKey: string,
  mixins: DataBlockMappedMixinsModel,
  removeMixin: (blockKey: string, mixinKey: string) => void,
};

const EditorStylesMixins = ({ blockKey, mixins, removeMixin }: Props) => (
  <StyleSection title="Mixins" gridBody={false}>
    {mixins.map(mixin => (
      <div className={cx(styles.mixinClass, styles.classNames.mixin)} key={mixin.key}>
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
            removeMixin(blockKey, mixin.key);
            event.stopPropagation();
          }}
        >
          <MdClose />
        </div>
      </div>
    ))}
  </StyleSection>
);

const mapStateToProps = (state: ReduxState) => ({
  mixins: getSelectedModuleSelectedBlockMappedMixins(state.editor),
});

const mapDispatchToProps = {
  removeMixin: (blockKey: string, mixinKey: string) => removeBlockStylesMixin(blockKey, mixinKey),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorStylesMixins);
