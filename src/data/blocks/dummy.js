// @flow
import { getBlockUniqueId } from '../../blocks/utils';
import Element from '../../blocks/groups/html/Element/Element';
import { blockGroups, blockTypes } from '../../blocks/config';
import Module from '../../blocks/groups/module/Module/Module';
import ModuleImport from '../../blocks/groups/module/ModuleImport/ModuleImport';
import Heading from '../../blocks/groups/basic/Heading/Heading';
import Container from '../../blocks/groups/basic/Container/Container';
import { DUMMY_STYLE_EMPTY, DUMMY_STYLE_TEST } from '../styles/dummy';
import type { DataBlockModel } from './models';
import { DUMMY_INTRO_MODULE } from '../modules/dummy';

const DUMMY_BLOCK_HEADING: DataBlockModel = {
  key: 'N7vqq3r2ykL',
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
  key: 'R1RLqJMMBkR',
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

export const DUMMY_BLOCK_PARAGRAPH: DataBlockModel = {
  key: 'x7JB7l5ogG3',
  groupKey: blockGroups.HTML,
  blockKey: Element.key,
  blockType: blockTypes.html,
  label: 'Site Description',
  props: {
    element: 'p',
    content: 'Hello Chiao',
  },
  propsConfig: {},
  blockChildrenKeys: [],
  isParentModule: false,
  rawStyles: DUMMY_STYLE_EMPTY,
};

const DUMMY_BLOCK_CONTAINER: DataBlockModel = {
  key: 'y9mP23n8XOz',
  groupKey: blockGroups.Basic,
  blockKey: Container.key,
  blockType: blockTypes.module,
  label: 'Container',
  props: {
    children: null,
  },
  propsConfig: {},
  blockChildrenKeys: [DUMMY_BLOCK_PARAGRAPH.key],
  isParentModule: false,
  rawStyles: DUMMY_STYLE_EMPTY,
};

export const DUMMY_BLOCK_MODULE_SUB: DataBlockModel = {
  key: 'gJ09lMVPDKY',
  groupKey: blockGroups.Module,
  blockKey: ModuleImport.key,
  blockType: blockTypes.module,
  label: 'Module Sub',
  props: {
    children: null,
  },
  propsConfig: {},
  blockChildrenKeys: [],
  moduleKey: 'DUMMY_SUB_MODULE',
  isParentModule: false,
  rawStyles: DUMMY_STYLE_EMPTY,
};

export const DUMMY_BLOCK_MODULE: DataBlockModel = {
  key: '7n7Q1N5KQxj',
  groupKey: blockGroups.Module,
  blockKey: Module.key,
  blockType: blockTypes.module,
  label: 'Site Intro',
  props: {
    children: null,
  },
  propsConfig: {},
  blockChildrenKeys: [
    DUMMY_BLOCK_HEADING.key,
    DUMMY_BLOCK_SUBHEADING.key,
    DUMMY_BLOCK_CONTAINER.key,
    DUMMY_BLOCK_MODULE_SUB.key,
  ],
  isParentModule: true,
  rawStyles: DUMMY_STYLE_EMPTY,
};

export const DUMMY_BLOCKS = {
  [DUMMY_BLOCK_HEADING.key]: DUMMY_BLOCK_HEADING,
  [DUMMY_BLOCK_SUBHEADING.key]: DUMMY_BLOCK_SUBHEADING,
  [DUMMY_BLOCK_CONTAINER.key]: DUMMY_BLOCK_CONTAINER,
  [DUMMY_BLOCK_PARAGRAPH.key]: DUMMY_BLOCK_PARAGRAPH,
  [DUMMY_BLOCK_MODULE_SUB.key]: DUMMY_BLOCK_MODULE_SUB,
  [DUMMY_BLOCK_MODULE.key]: DUMMY_BLOCK_MODULE,
};

export const DUMMY_BLOCK_PAGE_INTRO_MODULE: DataBlockModel = {
  key: 'k5O5gJK11JE',
  groupKey: blockGroups.Module,
  blockKey: ModuleImport.key,
  blockType: blockTypes.module,
  label: 'Site Intro',
  props: {
    children: null,
  },
  propsConfig: {},
  blockChildrenKeys: [],
  moduleKey: 'DUMMY_INTRO_MODULE',
  isParentModule: false,
  rawStyles: DUMMY_STYLE_EMPTY,
};

export const DUMMY_BLOCK_PAGE_PARAGRAPH: DataBlockModel = {
  key: 'z7ykJn5ym2',
  groupKey: blockGroups.HTML,
  blockKey: Element.key,
  blockType: blockTypes.html,
  label: 'Site Description',
  props: {
    element: 'p',
    content: 'Testing',
  },
  propsConfig: {},
  blockChildrenKeys: [],
  isParentModule: false,
  rawStyles: DUMMY_STYLE_EMPTY, // DUMMY_STYLE_TEST
  mixinStyles: [
    {
      key: 'DUMMY_MIXIN_CENTERED',
      disabledModifiers: {},
    },
    {
      key: 'DUMMY_MIXIN_HEADING',
      disabledModifiers: {},
    },
  ],
};

export const DUMMY_BLOCK_PAGE_MODULE: DataBlockModel = {
  key: 'E1PNmVBg5EK',
  groupKey: blockGroups.Module,
  blockKey: Module.key,
  blockType: blockTypes.module,
  label: 'Home Page',
  props: {
    children: null,
  },
  propsConfig: {
    children: {
      label: 'Content',
      type: 'blocks',
    },
  },
  blockChildrenKeys: [DUMMY_BLOCK_PAGE_INTRO_MODULE.key, DUMMY_BLOCK_PAGE_PARAGRAPH.key],
  isParentModule: true,
  rawStyles: DUMMY_STYLE_EMPTY,
};

export const DUMMY_BLOCK_SUB_MODULE: DataBlockModel = {
  key: 'qpjPDjW9DnG',
  groupKey: blockGroups.Module,
  blockKey: Module.key,
  blockType: blockTypes.module,
  label: 'Sub Module',
  props: {
    children: null,
  },
  propsConfig: {
    children: {
      label: 'Content',
      type: 'blocks',
    },
  },
  blockChildrenKeys: [],
  isParentModule: true,
  rawStyles: DUMMY_STYLE_EMPTY,
};
