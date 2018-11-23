// @flow

import { getBlockUniqueId } from '../../../utils';
import { blockGroups, blockTypes } from '../../../config';
import { EMPTY_BLOCK_STYLES } from '../../../../data/styles/defaults';
import config from './config';

const dataBlock = ({ rootBlockKey, label }: { rootBlockKey: string, label: string }) => ({
  key: getBlockUniqueId(),
  groupKey: blockGroups.Module,
  blockKey: config.key,
  blockType: blockTypes.module,
  label,
  props: {
    children: null,
  },
  propsConfig: {},
  blockChildrenKeys: [rootBlockKey],
  isParentModule: true,
  rawStyles: {
    ...EMPTY_BLOCK_STYLES,
  },
});

export default dataBlock;
