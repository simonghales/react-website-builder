// @flow

import { getBlockUniqueId } from '../../../utils';
import { blockGroups, blockTypes } from '../../../config';
import { EMPTY_BLOCK_STYLES } from '../../../../data/styles/defaults';
import config from './config';
import { elementDefaultProps } from './props';

const dataBlock = () => ({
  key: getBlockUniqueId(),
  groupKey: blockGroups.HTML,
  blockKey: config.key,
  blockType: blockTypes.html,
  label: 'HTML Element',
  props: {
    ...elementDefaultProps,
  },
  propsConfig: {},
  blockChildrenKeys: [],
  isParentModule: false,
  rawStyles: {
    ...EMPTY_BLOCK_STYLES,
  },
});

export default dataBlock;
