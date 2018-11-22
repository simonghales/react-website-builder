// @flow
import React from 'react';
import { connect } from 'react-redux';
import { MdFormatColorText, MdClose } from 'react-icons/md';
import { cx } from 'emotion';
import StyleSection from '../StyleSection/StyleSection';
import type { ReduxState } from '../../../../../../../state/redux/store';
import { getSelectedModuleSelectedBlockMappedMixins } from '../../../../../../../state/redux/editor/state';
import type { DataBlockMappedMixinsModel } from '../../../../../../../data/blocks/models';
import {
  removeBlockStylesMixin,
  updateBlockStylesMixinsOrder,
} from '../../../../../../../state/redux/editor/reducer';
import MixinList from './components/MixinList/MixinList';

type Props = {
  blockKey: string,
  mixins: DataBlockMappedMixinsModel,
  removeMixin: (blockKey: string, mixinKey: string) => void,
  updateMixinsOrder: (blockKey: string, mixinKeys: Array<string>) => void,
};

const EditorStylesMixins = ({ blockKey, mixins, removeMixin, updateMixinsOrder }: Props) => (
  <StyleSection title="Mixins" gridBody={false} showAdd addTooltip="Add mixin">
    <MixinList
      mixins={mixins}
      removeMixin={(mixinKey: string) => removeMixin(blockKey, mixinKey)}
      onChange={(mixinKeys: Array<string>) => {
        updateMixinsOrder(blockKey, mixinKeys);
      }}
    />
  </StyleSection>
);

const mapStateToProps = (state: ReduxState) => ({
  mixins: getSelectedModuleSelectedBlockMappedMixins(state.editor),
});

const mapDispatchToProps = {
  updateMixinsOrder: (blockKey: string, mixinKeys: Array<string>) =>
    updateBlockStylesMixinsOrder(blockKey, mixinKeys),
  removeMixin: (blockKey: string, mixinKey: string) => removeBlockStylesMixin(blockKey, mixinKey),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorStylesMixins);
