// @flow
import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { connect } from 'react-redux';
import styles from './styles';
import SelectList from '../../../../../../../SelectList/SelectList';
import type { ReduxState } from '../../../../../../../../../state/redux/store';
import { getAddMixinGroups } from '../../../../../../../../../data/mixins/models';
import {
  getCurrentBlockAddedMixins,
  getMixinsFromState,
  getSelectedModuleSelectedBlockKey,
} from '../../../../../../../../../state/redux/editor/state';
import type { AddMixinGroupsModel } from '../../../../../../../../../data/mixins/models';
import type { SelectListGroupModel } from '../../../../../../../SelectList/models';
import { addMixinToBlock } from '../../../../../../../../../state/redux/editor/reducer';

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

const mapStateToProps = (state: ReduxState) => {
  const mixins = getMixinsFromState(state.editor);
  const addedMixins = getCurrentBlockAddedMixins(state.editor);
  const addMixinGroups = getAddMixinGroups(mixins, addedMixins);
  const blockKey = getSelectedModuleSelectedBlockKey(state.editor);
  return {
    addMixinGroups,
    blockKey,
  };
};

const mapDispatchToProps = {
  addMixin: (blockKey: string, mixinKey: string) => addMixinToBlock(blockKey, mixinKey),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhanceWithClickOutside(AddMixinDropdown));
