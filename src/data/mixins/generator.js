// @flow

import type { MixinModel, MixinStylesModel } from './models';
import type { DataBlockMixinStylesModel } from '../blocks/models';
import { getMixinUniqueId } from '../../blocks/utils';

export function generateNewMixin(
  name: string,
  styles: MixinStylesModel,
  mixins: DataBlockMixinStylesModel
): MixinModel {
  return {
    key: getMixinUniqueId(),
    groupKey: 'General',
    name,
    styles,
    mixins,
  };
}
