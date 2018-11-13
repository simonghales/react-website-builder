// @flow
import { getBlockUniqueId } from '../../blocks/utils';
import type { EditorReduxState } from '../../state/redux/editor/reducer';
import Element from '../../blocks/html/Element/Element';
import { blockGroups, blockTypes } from '../../blocks/blocks';
import Module from '../../blocks/Module/Module';
import Heading from '../../blocks/basic/Heading/Heading';
import Container from '../../blocks/basic/Container/Container';
import { DUMMY_STYLE_EMPTY, DUMMY_STYLE_TEST } from '../styles/dummy';
import type { DataBlockModel } from './models';

const DUMMY_BLOCK_HEADING: DataBlockModel = {
  key: getBlockUniqueId(),
  groupKey: blockGroups.Basic,
  blockKey: Heading.key,
  blockType: blockTypes.module,
  label: 'Site Title',
  props: {
    text: 'Simon Hales',
  },
  propsConfig: {
    text: {
      label: 'Text',
      type: 'string',
    },
  },
  blockChildrenKeys: [],
  isParentModule: false,
  rawStyles: DUMMY_STYLE_EMPTY,
};

const DUMMY_BLOCK_SUBHEADING: DataBlockModel = {
  key: getBlockUniqueId(),
  groupKey: blockGroups.Basic,
  blockKey: Heading.key,
  blockType: blockTypes.module,
  label: 'Site Subheading',
  props: {
    text: 'Web Developer',
  },
  propsConfig: {
    text: {
      label: 'Text',
      type: 'string',
    },
  },
  blockChildrenKeys: [],
  isParentModule: false,
  rawStyles: DUMMY_STYLE_TEST,
};

const DUMMY_BLOCK_PARAGRAPH: DataBlockModel = {
  key: getBlockUniqueId(),
  groupKey: blockGroups.HTML,
  blockKey: Element.key,
  blockType: blockTypes.html,
  label: 'Site Description',
  props: {
    element: 'p',
    children: 'Hello Chiao',
  },
  propsConfig: {
    children: {},
  },
  blockChildrenKeys: [],
  isParentModule: false,
  rawStyles: DUMMY_STYLE_EMPTY,
};

const DUMMY_BLOCK_CONTAINER: DataBlockModel = {
  key: getBlockUniqueId(),
  groupKey: blockGroups.Basic,
  blockKey: Container.key,
  blockType: blockTypes.module,
  label: 'Container',
  props: {
    children: null,
  },
  propsConfig: {
    children: {
      label: 'Content',
      type: 'blocks',
    },
  },
  blockChildrenKeys: [DUMMY_BLOCK_PARAGRAPH.key],
  isParentModule: false,
  rawStyles: DUMMY_STYLE_EMPTY,
};

const DUMMY_BLOCK_MODULE: DataBlockModel = {
  key: getBlockUniqueId(),
  groupKey: blockGroups.Module,
  blockKey: Module.key,
  blockType: blockTypes.module,
  label: 'Site Intro',
  props: {
    children: null,
  },
  propsConfig: {
    children: {
      label: 'Content',
      type: 'blocks',
    },
  },
  blockChildrenKeys: [
    DUMMY_BLOCK_HEADING.key,
    DUMMY_BLOCK_SUBHEADING.key,
    DUMMY_BLOCK_CONTAINER.key,
  ],
  isParentModule: true,
  rawStyles: DUMMY_STYLE_EMPTY,
};

export const DUMMY_PAGE_DATA: EditorReduxState = {
  blocks: {
    [DUMMY_BLOCK_HEADING.key]: DUMMY_BLOCK_HEADING,
    [DUMMY_BLOCK_SUBHEADING.key]: DUMMY_BLOCK_SUBHEADING,
    [DUMMY_BLOCK_CONTAINER.key]: DUMMY_BLOCK_CONTAINER,
    [DUMMY_BLOCK_PARAGRAPH.key]: DUMMY_BLOCK_PARAGRAPH,
    [DUMMY_BLOCK_MODULE.key]: DUMMY_BLOCK_MODULE,
  },
  rootBlocks: [DUMMY_BLOCK_MODULE.key],
  selectedBlock: DUMMY_BLOCK_SUBHEADING.key,
};
