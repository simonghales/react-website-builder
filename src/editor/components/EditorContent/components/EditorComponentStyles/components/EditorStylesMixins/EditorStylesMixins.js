// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdAdd, MdClose } from 'react-icons/md';
import type { ReduxState } from '../../../../../../../state/redux/store';
import { getSelectedModuleSelectedBlockMappedMixins } from '../../../../../../../state/redux/editor/state';
import type { DataBlockMappedMixinsModel } from '../../../../../../../data/blocks/models';
import {
  removeBlockStylesMixin,
  updateBlockStylesMixinsOrder,
} from '../../../../../../../state/redux/editor/reducer';
import MixinList from './components/MixinList/MixinList';
import AddMixinDropdown from './components/AddMixinDropdown/AddMixinDropdown';
import EditorFieldGroup from '../../../EditorFields/components/EditorFieldGroup/EditorFieldGroup';
import IconButton from '../../../../../../../components/IconButton/IconButton';
import { getCurrentModuleKey } from '../../../../../../../state/redux/editor/selector';

type Props = {
  blockKey: string,
  mixins: DataBlockMappedMixinsModel,
  removeMixin: (blockKey: string, mixinKey: string) => void,
  updateMixinsOrder: (blockKey: string, mixinKeys: Array<string>) => void,
};

type State = {
  addingMixin: boolean,
};

const AddButton = ({
  isAdding,
  onClick,
  tooltip,
}: {
  isAdding: boolean,
  onClick: () => void,
  tooltip: string,
}) => (
  <IconButton
    tooltip={tooltip}
    onClick={onClick}
    icon={isAdding ? <MdClose size={18} /> : <MdAdd size={18} />}
  />
);

class EditorStylesMixins extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addingMixin: false,
    };
  }

  toggleAddMixin = () => {
    this.setState((state: State) => ({
      addingMixin: !state.addingMixin,
    }));
  };

  closeAddMixin = () => {
    this.setState({
      addingMixin: false,
    });
  };

  render() {
    const { blockKey, mixins, removeMixin, updateMixinsOrder } = this.props;
    const { addingMixin } = this.state;
    return (
      <EditorFieldGroup
        label="Mixins"
        grid={false}
        marginOffset={false}
        headerIcon={
          <AddButton
            isAdding={addingMixin}
            onClick={this.toggleAddMixin}
            tooltip={addingMixin ? 'Close' : 'Add mixin'}
          />
        }
      >
        <MixinList
          mixins={mixins}
          removeMixin={(mixinKey: string) => removeMixin(blockKey, mixinKey)}
          onChange={(mixinKeys: Array<string>) => {
            updateMixinsOrder(blockKey, mixinKeys);
          }}
        />
        {addingMixin && <AddMixinDropdown close={this.closeAddMixin} />}
      </EditorFieldGroup>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  mixins: getSelectedModuleSelectedBlockMappedMixins(state),
  moduleKey: getCurrentModuleKey(state),
});

const mapDispatchToProps = {
  dispatchUpdateMixinsOrder: (blockKey: string, mixinKeys: Array<string>, moduleKey: string) =>
    updateBlockStylesMixinsOrder(blockKey, mixinKeys, moduleKey),
  dispatchRemoveMixin: (blockKey: string, mixinKey: string, moduleKey: string) =>
    removeBlockStylesMixin(blockKey, mixinKey, moduleKey),
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  updateMixinsOrder: (blockKey: string, mixinKeys: Array<string>) =>
    dispatchProps.dispatchUpdateMixinsOrder(blockKey, mixinKeys, stateProps.moduleKey),
  removeMixin: (blockKey: string, mixinKey: string) =>
    dispatchProps.dispatchRemoveMixin(blockKey, mixinKey, stateProps.moduleKey),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorStylesMixins);
