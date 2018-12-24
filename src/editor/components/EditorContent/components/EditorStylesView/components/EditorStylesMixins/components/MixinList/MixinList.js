// @flow
import React from 'react';
import Nestable from 'react-nestable';
import type {
  DataBlockMappedMixinModel,
  DataBlockMappedMixinsModel,
} from '../../../../../../../../../data/blocks/models';
import Mixin from '../Mixin/Mixin';
import { EditorContentContext } from '../../../../../../context';
import type { EditorContentContextState } from '../../../../../../context';

type NestItem = {
  id: string,
  mixin: DataBlockMappedMixinModel,
  childrenEnabled: boolean,
  removeMixin: (mixinKey: string) => void,
};

function mapMixinsToNestItems(
  mixins: DataBlockMappedMixinsModel,
  removeMixin: (mixinKey: string) => void,
  setEditingMixin: (mixinKey: string) => void
): Array<NestItem> {
  return mixins.map(mixin => ({
    id: mixin.key,
    mixin,
    childrenEnabled: false,
    removeMixin,
    setEditingMixin,
  }));
}

function renderNestItem({ item }: { item: NestItem }) {
  const { mixin, removeMixin, setEditingMixin } = item;
  return <Mixin mixin={mixin} removeMixin={removeMixin} setEditingMixin={setEditingMixin} />;
}

type Props = {
  mixins: DataBlockMappedMixinsModel,
  removeMixin: (mixinKey: string) => void,
  onChange: (mixinKeys: Array<string>) => void,
};

const MixinList = ({ mixins, removeMixin, onChange }: Props) => (
  <EditorContentContext.Consumer>
    {({ setEditingMixin }: EditorContentContextState) => (
      <Nestable
        items={mapMixinsToNestItems(mixins, removeMixin, setEditingMixin)}
        renderItem={renderNestItem}
        onChange={(items: Array<NestItem>) => {
          onChange(items.map(item => item.id));
        }}
        maxDepth={1}
      />
    )}
  </EditorContentContext.Consumer>
);

export default MixinList;
