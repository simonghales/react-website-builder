// @flow
import React from 'react';
import { connect } from 'react-redux';
import StyleSection from '../StyleSection/StyleSection';
import type { ReduxState } from '../../../../../../../state/redux/store';
import { getSelectedModuleSelectedBlockMixins } from '../../../../../../../state/redux/editor/state';
import type { DataBlockMappedMixinsModel } from '../../../../../../../data/blocks/models';

type Props = {
  mixins: DataBlockMappedMixinsModel,
};

const EditorStylesMixins = ({ mixins }: Props) => (
  <StyleSection title="Mixins" gridBody={false}>
    {mixins.map(mixin => (
      <div key={mixin.key}>
        <div>{mixin.groupKey}</div>
        <div>{mixin.name}</div>
      </div>
    ))}
  </StyleSection>
);

const mapStateToProps = (state: ReduxState) => ({
  mixins: getSelectedModuleSelectedBlockMixins(state.editor),
});

export default connect(mapStateToProps)(EditorStylesMixins);
