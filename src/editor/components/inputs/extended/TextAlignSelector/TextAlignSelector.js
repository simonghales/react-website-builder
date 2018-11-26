// @flow
import React from 'react';
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
} from 'react-icons/md';
import RadioSelector from '../../RadioSelector/RadioSelector';

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

const TextAlignSelector = () => <RadioSelector options={options} />;

export default TextAlignSelector;
