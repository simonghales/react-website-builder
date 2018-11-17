// @flow
import React from 'react';
import Nestable from 'react-nestable';
import type {
  DataBlockMappedMixinModel,
  DataBlockMappedMixinsModel,
} from '../../../../../../../../../data/blocks/models';
import Mixin from '../Mixin/Mixin';

type NestItem = {
  id: string,
  mixin: DataBlockMappedMixinModel,
  childrenEnabled: boolean,
  removeMixin: (mixinKey: string) => void,
};

function mapMixinsToNestItems(
  mixins: DataBlockMappedMixinsModel,
  removeMixin: (mixinKey: string) => void
): Array<NestItem> {
  return mixins.map(mixin => ({
    id: mixin.key,
    mixin,
    childrenEnabled: false,
    removeMixin,
  }));
}

function renderNestItem({ item }: { item: NestItem }) {
  const { mixin, removeMixin } = item;
  return <Mixin mixin={mixin} removeMixin={removeMixin} />;
}

type Props = {
  mixins: DataBlockMappedMixinsModel,
  removeMixin: (mixinKey: string) => void,
  onChange: (mixinKeys: Array<string>) => void,
};

const MixinList = ({ mixins, removeMixin, onChange }: Props) => (
  <Nestable
    items={mapMixinsToNestItems(mixins, removeMixin)}
    renderItem={renderNestItem}
    onChange={(items: Array<NestItem>) => {
      onChange(items.map(item => item.id));
    }}
    maxDepth={1}
  />
);

export default MixinList;
