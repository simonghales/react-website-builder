// @flow

import { getBlockUniqueId } from '../../../utils';
import { blockGroups, blockTypes } from '../../../config';
import config from './config';
import { EMPTY_BLOCK_STYLES } from '../../../../data/styles/defaults';
import { headingDefaultProps } from './props';

const dataBlock = () => ({
  key: getBlockUniqueId(),
  groupKey: blockGroups.Basic,
  blockKey: config.key,
  blockType: blockTypes.module,
  label: 'Heading',
  props: {
    element: headingDefaultProps.element,
    text: 'Enter your text here',
  },
  propsConfig: {
    text: {
      label: 'Text',
      type: 'string',
    },
  },
  blockChildrenKeys: [],
  isParentModule: false,
  rawStyles: {
    ...EMPTY_BLOCK_STYLES,
  },
});

export default dataBlock;
