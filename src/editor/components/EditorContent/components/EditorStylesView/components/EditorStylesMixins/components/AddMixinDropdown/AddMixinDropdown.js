// @flow
import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import styles from './styles';
import SelectList from '../../../../../../../SelectList/SelectList';
import type { AddMixinGroupsModel } from '../../../../../../../../../data/mixins/models';
import type { SelectListGroupModel } from '../../../../../../../SelectList/models';

type Props = {
  addMixinGroups: AddMixinGroupsModel,
  blockKey: string,
  addMixin: (blockKey: string, mixinKey: string) => void,
  close: () => void,
};

class AddMixinDropdown extends Component<Props> {
  handleClose = () => {
    const { close } = this.props;
    close();
  };

  handleClickOutside = () => {
    this.handleClose();
  };

  handleAddMixin = (mixinKey: string) => {
    const { addMixin, blockKey } = this.props;
    addMixin(blockKey, mixinKey);
    this.handleClose();
  };

  getListGroups(): Array<SelectListGroupModel> {
    const { addMixinGroups } = this.props;
    return Object.keys(addMixinGroups).map(groupKey => {
      const group = addMixinGroups[groupKey];
      return {
        key: groupKey,
        name: group.name,
        items: group.mixins.map(mixin => ({
          key: mixin.key,
          name: mixin.name,
          disabled: mixin.disabled,
          onClick: () => {
            if (mixin.disabled) return;
            this.handleAddMixin(mixin.key);
          },
        })),
      };
    });
  }

  render() {
    return (
      <div className={styles.containerClass}>
        <div className={styles.contentClass}>
          <SelectList heading="Add a mixin" groups={this.getListGroups()} />
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(AddMixinDropdown);
