// @flow

import { getBlockUniqueId } from '../../utils';
import { blockGroups, blockTypes } from '../../config';
import ModuleImport from './ModuleImport';
import { EMPTY_BLOCK_STYLES } from '../../../data/styles/defaults';

const dataBlock = ({ linkedModuleKey, label }: { linkedModuleKey: string, label: string }) => ({
  key: getBlockUniqueId(),
  groupKey: blockGroups.Module,
  blockKey: ModuleImport.key,
  blockType: blockTypes.module,
  label,
  props: {
    children: null,
  },
  propsConfig: {},
  blockChildrenKeys: [],
  linkedModuleKey,
  isParentModule: false,
  rawStyles: {
    ...EMPTY_BLOCK_STYLES,
  },
});

export default dataBlock;
