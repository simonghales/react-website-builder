// @flow
import React from 'react';
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
} from 'react-icons/md';
import RadioSelector from '../../RadioSelector/RadioSelector';
import type { FieldProps } from '../../../EditorContent/components/EditorFields/components/EditorField/EditorField';

const options = [
  {
    key: 'left',
    value: 'left',
    icon: <MdFormatAlignLeft />,
  },
  {
    key: 'center',
    value: 'center',
    icon: <MdFormatAlignCenter />,
  },
  {
    key: 'right',
    value: 'right',
    icon: <MdFormatAlignRight />,
  },
  {
    key: 'justify',
    value: 'justify',
    icon: <MdFormatAlignJustify />,
  },
];

type Props = FieldProps;

const TextAlignSelector = (props: Props) => <RadioSelector {...props} options={options} />;

export default TextAlignSelector;
