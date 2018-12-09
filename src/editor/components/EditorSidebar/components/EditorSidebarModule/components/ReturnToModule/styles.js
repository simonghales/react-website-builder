// @flow
import { css } from 'emotion';
import { smallHeading } from '../../../../../../../styles/typography';
import colors from '../../../../../../../styles/config/colors';

const containerClass = css`
  display: flex;
  align-items: center;
  ${smallHeading};
  cursor: pointer;

  &:hover {
    color: ${colors.light};
  }

  svg {
    margin-right: 3px;
  }
`;

export default {
  containerClass,
};
