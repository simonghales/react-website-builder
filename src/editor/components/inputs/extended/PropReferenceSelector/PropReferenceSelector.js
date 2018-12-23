// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import SelectInput from '../../SelectInput/SelectInput';
import type { SelectGroup, SelectOption } from '../../SelectInput/SelectInput';
import type { FieldProps } from '../../../EditorContent/components/EditorFields/components/EditorField/EditorField';
import type { ReduxState } from '../../../../../state/redux/store';
import {
  getDataBlockAllAvailablePropsDetailsSelector,
  getModuleBlockPropsDetails,
} from '../../../../../state/redux/editor/selector';
import type {
  AvailableDataBlockPropsDetails,
  DataBlockPropsDetails,
  DataBlockPropsDetailsGroup,
} from '../../../../../data/blocks/state';
import { getPropDisplayValueFromAllPropsDetails } from '../../../../../data/blocks/state';

const getOptions = (propsDetails: DataBlockPropsDetails, inputType: string): Array<SelectOption> =>
  Object.keys(propsDetails)
    .filter(propKey => propsDetails[propKey].type === inputType)
    .map(propKey => ({
      value: propKey,
      label: propsDetails[propKey].label,
    }));

const getGroupedOptions = (
  allPropsDetails: AvailableDataBlockPropsDetails,
  inputType: string
): Array<SelectGroup> =>
  Object.keys(allPropsDetails).map((dataBlockKey: string) => {
    const dataBlockPropsGroup: DataBlockPropsDetailsGroup = allPropsDetails[dataBlockKey];
    return {
      key: dataBlockKey,
      label: dataBlockPropsGroup.label,
      options: getOptions(dataBlockPropsGroup.props, inputType),
    };
  });

type Props = FieldProps & {
  allAvailablePropsDetails: AvailableDataBlockPropsDetails,
  inputType: string,
};

class PropReferenceSelector extends Component<Props> {
  render() {
    const { allAvailablePropsDetails, value, inheritedValue, onChange, inputType } = this.props;
    const groupOptions = getGroupedOptions(allAvailablePropsDetails, inputType);
    return (
      <SelectInput
        isCreatable={false}
        isMulti={false}
        noOptionsMessage=""
        options={groupOptions}
        styleValue={getPropDisplayValueFromAllPropsDetails(allAvailablePropsDetails, value)}
        inheritedValue={inheritedValue}
        updateStyle={onChange}
      />
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const allAvailablePropsDetails = getDataBlockAllAvailablePropsDetailsSelector(state);
  return {
    allAvailablePropsDetails,
  };
};

export default connect(mapStateToProps)(PropReferenceSelector);
