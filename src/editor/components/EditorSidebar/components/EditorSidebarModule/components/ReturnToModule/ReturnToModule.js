// @flow
import React, { Component } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './styles';
import type { ReduxState } from '../../../../../../../state/redux/store';
import {
  getParentModules,
  getPreviousModule,
  getPreviousModulesKeys,
} from '../../../../../../../state/redux/editor/selector';
import type { DataModule } from '../../../../../../../data/modules/models';
import { goToModule } from '../../../../../../routing';
import type { EditorRoutingMatch } from '../../../../../../routing';

type Props = {
  parentModules: Array<DataModule>,
  previousModulesKeys: Array<string>,
  previousModule: DataModule | null,
  history: any,
  match: EditorRoutingMatch,
};

class ReturnToModule extends Component<Props> {
  getParentModule(): DataModule | null {
    const { parentModules } = this.props;
    if (parentModules.length === 1) return parentModules[0];
    if (parentModules.length > 1) {
      // todo - display something else
    }
    return null;
  }

  getReturnModule(): DataModule | null {
    const { previousModule } = this.props;
    if (previousModule) return previousModule;
    return this.getParentModule();
  }

  getReturnModuleKeys(): [string, string] {
    const { previousModule, previousModulesKeys } = this.props;
    const parentModule = this.getParentModule();
    let moduleKey = '';
    let previousModuleKey = '';
    if (previousModule) {
      moduleKey = previousModule.key;
      previousModuleKey =
        previousModulesKeys.length > 1 ? previousModulesKeys[previousModulesKeys.length - 2] : '';
    } else if (parentModule) {
      moduleKey = parentModule.key;
    }
    return [moduleKey, previousModuleKey];
  }

  handleReturnToPreviousModule = () => {
    const { previousModule } = this.props;
    const { history, match } = this.props;
    if (previousModule) {
      history.goBack();
    }
    const returnModule = this.getReturnModule();
    if (!returnModule) {
      return;
    }
    const [moduleKey, previousModuleKey] = this.getReturnModuleKeys();
    goToModule(moduleKey, previousModuleKey, match, history);
  };

  render() {
    const returnModule = this.getReturnModule();
    if (!returnModule) return null;
    return (
      <div className={styles.containerClass} onClick={this.handleReturnToPreviousModule}>
        <MdKeyboardBackspace size={18} />
        <div>{returnModule.name}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  parentModules: getParentModules(state),
  previousModule: getPreviousModule(state),
  previousModulesKeys: getPreviousModulesKeys(state),
});

export default withRouter(connect(mapStateToProps)(ReturnToModule));
