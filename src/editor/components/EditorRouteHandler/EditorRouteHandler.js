// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import EditorBlockView from '../../views/EditorBlockView/EditorBlockView';
import type { ReduxState } from '../../../state/redux/store';
import {
  setInitialSelectedModuleHistory,
  setSelectedModuleKey,
} from '../../../state/redux/ui/reducer';
import EditorModuleHandler from '../EditorModuleHandler/EditorModuleHandler';

type Props = {
  setInitialHistory: (moduleKey: string, previousModuleKey: string) => void,
  setModule: (moduleKey: string, previousModuleKey: string) => void,
  match: {
    params: {
      moduleKey?: string,
      previousModuleKey?: string,
    },
  },
};

const getParamModuleKey = (props: Props): string => {
  const { match } = props;
  const { params } = match;
  const { moduleKey = '' } = params;
  return moduleKey;
};

const getParamPreviousModuleKey = (props: Props): string => {
  const { match } = props;
  const { params } = match;
  const { previousModuleKey = '' } = params;
  return previousModuleKey;
};

class EditorRouteHandler extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.checkUrlParams(props);
  }

  checkUrlParams(props: Props = this.props) {
    const { match } = props;
    const { params } = match;
    const { previousModuleKey = '' } = params;
    const moduleKey = getParamModuleKey(props);
    if (moduleKey) {
      const { setInitialHistory } = this.props;
      setInitialHistory(moduleKey, previousModuleKey);
      console.log('setModule');
    }
  }

  componentWillReceiveProps(nextProps: Props): void {
    this.checkUpdatedUrlParams(nextProps);
  }

  checkUpdatedUrlParams(nextProps: Props) {
    const moduleKey = getParamModuleKey(nextProps);
    const previousModuleKey = getParamModuleKey(this.props);
    const newPreviousModuleKey = getParamPreviousModuleKey(nextProps);
    if (moduleKey !== previousModuleKey) {
      const { setModule } = this.props;
      setModule(moduleKey, newPreviousModuleKey);
    }
  }

  render() {
    return (
      <EditorModuleHandler redirectOnError>
        <EditorBlockView />
      </EditorModuleHandler>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  setInitialHistory: (moduleKey: string, previousModuleKey: string) =>
    dispatch(setInitialSelectedModuleHistory(moduleKey, previousModuleKey)),
  setModule: (moduleKey: string, previousModuleKey: string) =>
    dispatch(setSelectedModuleKey(moduleKey, previousModuleKey)),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditorRouteHandler)
);
