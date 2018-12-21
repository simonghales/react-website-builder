import { getBlockUniqueId } from '../../../utils';
import { blockGroups, blockTypes } from '../../../config';
import config from './config';
import { EMPTY_BLOCK_STYLES } from '../../../../data/styles/defaults';
import { repeaterDefaultProps } from './props';

const dataBlock = ({ blockKey }) => ({
  key: getBlockUniqueId(),
  groupKey: blockGroups.Functional,
  blockKey: config.key,
  blockType: blockTypes.module,
  label: 'Repeater',
  props: {
    ...repeaterDefaultProps,
  },
  propsConfig: {},
  blockChildrenKeys: [blockKey],
  isParentModule: false,
  rawStyles: {
    ...EMPTY_BLOCK_STYLES,
  },
});

export default dataBlock;
