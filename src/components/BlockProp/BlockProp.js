// @flow
import React from 'react';
import styles from './styles';
import Input, { inputStyleTypes } from '../StyleProp/components/Input/Input';
import { blockPropsConfigTypes } from '../../blocks/props';
import HTMLSelector, { htmlSelectorOptions } from '../../editor/components/inputs/extended/HTMLSelector/HTMLSelector';
import { elementDefaultProps } from '../../blocks/groups/html/Element/props';
import { containerDefaultProps } from '../../blocks/groups/basic/Container/props';
import { headingDefaultProps } from '../../blocks/groups/basic/Heading/props';

const propInputComponents = {
  [blockPropsConfigTypes.string]: props => <Input styleType={inputStyleTypes.dark} {...props} />,
  [blockPropsConfigTypes.blocks]: () => null,
  [blockPropsConfigTypes.module]: () => null,
  [blockPropsConfigTypes.html]: props => (
    <HTMLSelector
      options={htmlSelectorOptions.all}
      defaultHtmlElement={elementDefaultProps.element}
      {...props}
    />
  ),
};

function getPropInputComponent(type: string) {
  const component = propInputComponents[type];
  if (!component) {
    throw new Error(`No component matched for "${type}"`);
  }
  return component;
}

type Props = {
  label: string,
  value: any,
  propType: string,
  onUpdate: (value: any) => void,
};

const BlockProp = ({ label, value, propType, onUpdate }: Props) => {
  const inputComponent = getPropInputComponent(propType);
  return (
    <div className={styles.containerClass}>
      <div className={styles.labelClass}>{label}:</div>
      <div className={styles.valueClass}>
        {inputComponent({
          value,
          onChange: onUpdate,
        })}
      </div>
    </div>
  );
};

export default BlockProp;
