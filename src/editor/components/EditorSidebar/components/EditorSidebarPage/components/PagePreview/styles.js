// @flow
import { css } from 'emotion';
import {
  previewBlockBody,
  previewBlockIcon,
  previewBlockInactiveBorder,
  previewBlockLabel,
  previewBlockSelected,
  previewBlockTitle,
} from '../../../../../../../styles/shared/previewBlock';

const containerClass = css`
  ${previewBlockBody};
`;

const notSelectedClass = css`
  ${previewBlockInactiveBorder};
`;

const selectedClass = css`
  ${previewBlockSelected};
`;

const infoClass = css`
  flex: 1;
`;

const labelClass = css`
  ${previewBlockLabel};
`;

const titleClass = css`
  ${previewBlockTitle};
`;

const iconWrapperClass = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const iconClass = css`
  ${previewBlockIcon};
  svg {
    display: block;
  }
`;

export default {
  containerClass,
  notSelectedClass,
  selectedClass,
  infoClass,
  labelClass,
  titleClass,
  iconWrapperClass,
  iconClass,
};
