// @flow

import { css } from 'emotion';
import colors from '../../../../../../../styles/config/colors';
import fontWeights from '../../../../../../../styles/config/fontWeights';
import {
  blockPreviewColors,
  previewBlockBody,
  previewBlockIcon,
  previewBlockInactiveBorder,
  previewBlockLabel,
  previewBlockSelected,
  previewBlockTitle,
} from '../../../../../../../styles/shared/previewBlock';

const containerClass = css`
  width: 100%;
  height: 100%;
`;

const classNames = {
  block: 'block',
  selectedBlock: 'selectedBlock',
  notSelectedBlock: 'notSelectedBlock',
};

const notSelectedState = `&.${classNames.notSelectedBlock}`;

const blockPreviewClass = css`
  background: ${blockPreviewColors.bg};
  position: relative;
`;

const rootBlockPreviewClass = css``;

const selectedBlockClass = css`
  ${previewBlockSelected};
  .${classNames.block} {
    background: ${blockPreviewColors.activeBg};
  }
`;
const blockPreviewInfoClass = css`
  ${previewBlockBody};

  .nestable-drag-layer .nestable-item-copy &,
  &:hover,
  .${classNames.selectedBlock} > & {
    color: ${colors.light};
  }

  .${classNames.selectedBlock} &,
  .nestItemSelected & {
    ${notSelectedState} {
      background-color: ${blockPreviewColors.inactiveBg};
      box-shadow: inset -1px 0 #0000004d;
    }
  }

  ${notSelectedState} {
    ${previewBlockInactiveBorder};
  }
`;

const blockPreviewTextClass = css`
  flex: 1;
`;

const blockPreviewTypeClass = css`
  ${previewBlockLabel};
`;

const blockPreviewLabelClass = css`
  ${previewBlockTitle};
`;

const blockPreviewEnterClass = css`
  ${previewBlockIcon};
`;

const blockPreviewEnterSelectedClass = css`
  opacity: 1;
`;

const blockPreviewChildrenClass = css`
  //padding-bottom: 5px;
`;

export default {
  containerClass,
  blockPreviewClass,
  rootBlockPreviewClass,
  selectedBlockClass,
  blockPreviewInfoClass,
  blockPreviewTextClass,
  blockPreviewTypeClass,
  blockPreviewLabelClass,
  blockPreviewEnterClass,
  blockPreviewEnterSelectedClass,
  blockPreviewChildrenClass,
  classNames,
};
