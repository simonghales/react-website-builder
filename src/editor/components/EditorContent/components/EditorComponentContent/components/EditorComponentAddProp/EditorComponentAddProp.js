// @flow
import React, { Component } from 'react';
import { cx } from 'emotion';
import { camelCase } from 'lodash';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { blockPropsCustomAllowedTypes } from 'blocks/props';
import { connect } from 'react-redux';
import Button from '../../../../../../../components/Button/Button';
import styles from './styles';
import TextInput from '../../../../../inputs/TextInput/TextInput';
import SelectInput from '../../../../../inputs/SelectInput/SelectInput';
import type { SelectOption } from '../../../../../inputs/SelectInput/SelectInput';
import IconButton, {
  iconButtonStyleTypes,
} from '../../../../../../../components/IconButton/IconButton';
import type { ReduxState } from '../../../../../../../state/redux/store';
import { addNewPropToBlock } from '../../../../../../../state/redux/editor/reducer';
import { getCurrentModuleKey } from '../../../../../../../state/redux/editor/selector';

const selectInputOptions: Array<SelectOption> = blockPropsCustomAllowedTypes.map(
  (type: string) => ({
    value: type,
    label: type,
  })
);

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  blockKey: string,
  moduleProps: Array<string>,
  addingProp: boolean,
  setAdding: (adding: boolean) => void,
  addNewProp: (propKey: string, propLabel: string, propType: string) => void,
};

type State = {
  propName: string,
  propType: string,
};

const defaultPropType = selectInputOptions[0].value;

class EditorComponentAddProp extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      propName: '',
      propType: defaultPropType,
    };
  }

  getRawPropNameKey() {
    const { propName } = this.state;
    return camelCase(`${propName}`);
  }

  getPropNameKey() {
    return camelCase(`custom${this.getRawPropNameKey()}`);
  }

  getPropName() {
    const { propName } = this.state;
    return propName;
  }

  getPropType() {
    const { propType } = this.state;
    return propType;
  }

  isValidName() {
    const rawPropNameKey = this.getRawPropNameKey();
    const { moduleProps } = this.props;
    return rawPropNameKey !== '' && !moduleProps.includes(this.getPropNameKey());
  }

  canCreateProp() {
    return this.isValidName();
  }

  handleSetPropName = (name: string) => {
    this.setState({
      propName: name,
    });
  };

  handleSetPropType = (propType: string) => {
    this.setState({
      propType,
    });
  };

  handleStartAddingProp = () => {
    const { setAdding } = this.props;
    setAdding(true);
  };

  handleCancelAddingProp = () => {
    const { setAdding } = this.props;
    setAdding(false);
  };

  handleFormSubmit = (event: any) => {
    event.preventDefault();
    this.addNewProp();
  };

  addNewProp = () => {
    if (!this.canCreateProp()) return;
    const { addNewProp } = this.props;
    const propKey = this.getPropNameKey();
    const propName = this.getPropName();
    const propType = this.getPropType();
    addNewProp(propKey, propName, propType);
    this.clearForm();
  };

  clearForm() {
    this.setState({
      propName: '',
      propType: defaultPropType,
    });
    const { setAdding } = this.props;
    setAdding(false);
  }

  renderAddContent() {
    return <Button onClick={this.handleStartAddingProp}>Add Prop</Button>;
  }

  renderAddingContent() {
    const { propName, propType } = this.state;
    const validName = this.isValidName();
    const canCreate = this.canCreateProp();
    return (
      <form className={styles.addContainer} onSubmit={this.handleFormSubmit}>
        <div className={cx(styles.columnClass, styles.columnNameClass)}>
          <label>
            <div
              className={cx(styles.columnLabelClass, {
                [styles.columnValidLabelClass]: validName,
                [styles.columnInvalidLabelClass]: !validName && propName !== '',
              })}
            >
              Prop Name
            </div>
            <div>
              <TextInput
                onChange={this.handleSetPropName}
                value={propName}
                valueControlled
                inheritedValue=""
              />
            </div>
          </label>
        </div>
        <div className={cx(styles.columnClass, styles.columnTypeClass)}>
          <label>
            <div className={styles.columnLabelClass}>Prop Type</div>
            <div>
              <SelectInput
                options={selectInputOptions}
                updateStyle={this.handleSetPropType}
                styleValue={propType}
                isMulti={false}
                isCreatable={false}
                inheritedValue={defaultPropType}
              />
            </div>
          </label>
        </div>
        <div className={styles.columnClass}>
          <div className={styles.cancelButtonClass} onClick={this.handleCancelAddingProp}>
            cancel
          </div>
          <div>
            <IconButton
              icon={<MdPlaylistAddCheck size={18} />}
              onClick={this.addNewProp}
              styleType={iconButtonStyleTypes.large}
              highlighted={canCreate}
              disabled={!canCreate}
            />
          </div>
        </div>
      </form>
    );
  }

  render() {
    const { addingProp } = this.props;
    if (addingProp) {
      return this.renderAddingContent();
    }
    return this.renderAddContent();
  }
}

const mapStateToProps = (state: ReduxState) => ({
  moduleKey: getCurrentModuleKey(state),
});

const mapDispatchToProps = {
  dispatchAddNewPropToBlock: (
    propKey: string,
    propLabel: string,
    propType: string,
    moduleKey: string,
    blockKey: string
  ) => addNewPropToBlock(propKey, propLabel, propType, moduleKey, blockKey),
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  addNewProp: (propKey: string, propLabel: string, propType: string) =>
    dispatchProps.dispatchAddNewPropToBlock(
      propKey,
      propLabel,
      propType,
      stateProps.moduleKey,
      ownProps.blockKey
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorComponentAddProp);
