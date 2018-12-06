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
} from '../../../../../../../../../state/redux/editor/state';
import type { AddMixinGroupsModel } from '../../../../../../../../../data/mixins/models';
import type { SelectListGroupModel } from '../../../../../../../SelectList/models';
import { addMixinToBlock } from '../../../../../../../../../state/redux/editor/reducer';
import {
  getCurrentModuleKey,
  getSelectedBlockKey,
} from '../../../../../../../../../state/redux/editor/selector';

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
  const addedMixins = getCurrentBlockAddedMixins(state);
  const addMixinGroups = getAddMixinGroups(mixins, addedMixins);
  const blockKey = getSelectedBlockKey(state);
  return {
    addMixinGroups,
    blockKey,
    moduleKey: getCurrentModuleKey(state),
  };
};

const mapDispatchToProps = {
  dispatchAddMixin: (blockKey: string, mixinKey: string, moduleKey: string) =>
    addMixinToBlock(blockKey, mixinKey, moduleKey),
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  addMixin: (blockKey: string, mixinKey: string) =>
    dispatchProps.dispatchAddMixin(blockKey, mixinKey, stateProps.moduleKey),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(enhanceWithClickOutside(AddMixinDropdown));
