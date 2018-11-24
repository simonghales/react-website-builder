import { getBlockUniqueId } from '../../../utils';
import { blockGroups, blockTypes } from '../../../config';
import config from './config';
import { EMPTY_BLOCK_STYLES } from '../../../../data/styles/defaults';
import { containerDefaultProps } from './props';

const dataBlock = () => ({
  key: getBlockUniqueId(),
  groupKey: blockGroups.Basic,
  blockKey: config.key,
  blockType: blockTypes.module,
  label: 'Container',
  props: {
    ...containerDefaultProps,
  },
  propsConfig: {},
  blockChildrenKeys: [],
  isParentModule: false,
  rawStyles: {
    ...EMPTY_BLOCK_STYLES,
  },
});

export default dataBlock;
