// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectInput from '../../SelectInput/SelectInput';
import type { SelectOption } from '../../SelectInput/SelectInput';
import type { FieldProps } from '../../../EditorContent/components/EditorFields/components/EditorField/EditorField';
import type { ReduxState } from '../../../../../state/redux/store';
import { getModuleBlockPropsDetails } from '../../../../../state/redux/editor/selector';
import type { DataBlockPropsDetails } from '../../../../../data/blocks/state';

const getDisplayValue = (propsDetails: DataBlockPropsDetails, propKey: string): string =>
  propsDetails[propKey] ? propsDetails[propKey].label : '';

const getOptions = (propsDetails: DataBlockPropsDetails, inputType: string): Array<SelectOption> =>
  Object.keys(propsDetails)
    .filter(propKey => propsDetails[propKey].type === inputType)
    .map(propKey => ({
      value: propKey,
      label: propsDetails[propKey].label,
    }));

type Props = FieldProps & {
  propsDetails: DataBlockPropsDetails,
  inputType: string,
};

class PropReferenceSelector extends Component<Props> {
  render() {
    const { value, inheritedValue, onChange, propsDetails, inputType } = this.props;
    return (
      <SelectInput
        isCreatable={false}
        isMulti={false}
        noOptionsMessage=""
        options={getOptions(propsDetails, inputType)}
        styleValue={getDisplayValue(propsDetails, value)}
        inheritedValue={inheritedValue}
        updateStyle={onChange}
      />
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const propsDetails = getModuleBlockPropsDetails(state);
  return {
    propsDetails,
  };
};

export default connect(mapStateToProps)(PropReferenceSelector);
