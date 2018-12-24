// @flow
import React, { Component } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import type { DataBlockMappedMixinsModel } from '../../../../../../../data/blocks/models';
import MixinList from './components/MixinList/MixinList';
import AddMixinDropdown from './components/AddMixinDropdown/AddMixinDropdown';
import EditorFieldGroup from '../../../EditorFields/components/EditorFieldGroup/EditorFieldGroup';
import IconButton from '../../../../../../../components/IconButton/IconButton';
import Button from '../../../../../../../components/Button/Button';
import styles from './styles';

type Props = {
  blockKey: string,
  mixins: DataBlockMappedMixinsModel,
  createMixinEnabled?: boolean,
  AddMixinsDropdown: any,
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
  static defaultProps = {
    createMixinEnabled: false,
  };

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
    const {
      blockKey,
      mixins,
      removeMixin,
      updateMixinsOrder,
      createMixinEnabled,
      AddMixinsDropdown,
    } = this.props;
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
        {createMixinEnabled && (
          <div className={styles.createMixinContainerClass}>
            <Button onClick={() => {}}>Create mixin</Button>
          </div>
        )}
        <MixinList
          mixins={mixins}
          removeMixin={(mixinKey: string) => removeMixin(blockKey, mixinKey)}
          onChange={(mixinKeys: Array<string>) => {
            updateMixinsOrder(blockKey, mixinKeys);
          }}
        />
        {addingMixin && <AddMixinsDropdown close={this.closeAddMixin} addedMixins={mixins} />}
      </EditorFieldGroup>
    );
  }
}

export default EditorStylesMixins;
