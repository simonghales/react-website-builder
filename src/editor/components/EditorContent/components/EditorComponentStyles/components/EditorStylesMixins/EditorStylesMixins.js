// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdAdd, MdClose } from 'react-icons/md';
import StyleSection from '../StyleSection/StyleSection';
import type { ReduxState } from '../../../../../../../state/redux/store';
import { getSelectedModuleSelectedBlockMappedMixins } from '../../../../../../../state/redux/editor/state';
import type { DataBlockMappedMixinsModel } from '../../../../../../../data/blocks/models';
import {
  removeBlockStylesMixin,
  updateBlockStylesMixinsOrder,
} from '../../../../../../../state/redux/editor/reducer';
import MixinList from './components/MixinList/MixinList';
import AddMixinDropdown from './components/AddMixinDropdown/AddMixinDropdown';
import styles from './styles';

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
  <div className={styles.addButtonClass} data-tip={tooltip} onClick={onClick}>
    {isAdding ? <MdClose size={18} /> : <MdAdd size={18} />}
  </div>
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
      <StyleSection
        title="Mixins"
        gridBody={false}
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
      </StyleSection>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  mixins: getSelectedModuleSelectedBlockMappedMixins(state.editor),
});

const mapDispatchToProps = {
  updateMixinsOrder: (blockKey: string, mixinKeys: Array<string>) =>
    updateBlockStylesMixinsOrder(blockKey, mixinKeys),
  removeMixin: (blockKey: string, mixinKey: string) => removeBlockStylesMixin(blockKey, mixinKey),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorStylesMixins);
