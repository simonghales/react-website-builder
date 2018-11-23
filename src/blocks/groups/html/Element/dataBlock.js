// @flow

import { getBlockUniqueId } from '../../../utils';
import { blockGroups, blockTypes } from '../../../config';
import { EMPTY_BLOCK_STYLES } from '../../../../data/styles/defaults';
import config from './config';
import { blockPropsConfigTypes } from '../../../props';

const dataBlock = () => ({
  key: getBlockUniqueId(),
  groupKey: blockGroups.HTML,
  blockKey: config.key,
  blockType: blockTypes.html,
  label: 'HTML Element',
  props: {
    element: 'p',
    content: '',
  },
  propsConfig: {
    element: {
      label: 'Element',
      type: blockPropsConfigTypes.html,
    },
  },
  blockChildrenKeys: [],
  isParentModule: false,
  rawStyles: {
    ...EMPTY_BLOCK_STYLES,
  },
});

export default dataBlock;
