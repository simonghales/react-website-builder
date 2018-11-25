// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { cx } from 'emotion';
import styles from './styles';
import EditorSidebar from '../../components/EditorSidebar/EditorSidebar';
import EditorBlockView from '../EditorBlockView/EditorBlockView';
import type { ReduxState } from '../../../state/redux/store';
import { getAddingBlock } from '../../../state/redux/ui/state';
import { setAddingBlock } from '../../../state/redux/ui/reducer';
import Tooltip from '../../../components/Tooltip/Tooltip';
import { setInitialModuleHistory, setSelectedModule } from '../../../state/redux/editor/reducer';

type Props = {
  addingBlock: boolean,
  completeAddingBlock: () => void,
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

class EditorView extends Component<Props> {
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
    const { addingBlock, completeAddingBlock } = this.props;
    return (
      <div className={styles.containerClass}>
        <Tooltip />
        <header className={styles.headerClass}>header..</header>
        <main className={styles.mainClass}>
          <div className={styles.editorClass}>
            <EditorSidebar />
          </div>
          <div className={styles.previewClass}>
            <div
              className={cx(styles.previewContentClass, {
                [styles.previewContentDisabledClass]: addingBlock,
              })}
            >
              <EditorBlockView />
            </div>
            {addingBlock && (
              <div className={styles.previewBlockerClass} onClick={completeAddingBlock} />
            )}
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  addingBlock: getAddingBlock(state.ui),
});

const mapDispatchToProps = {
  setInitialHistory: (moduleKey: string, previousModuleKey: string) =>
    setInitialModuleHistory(moduleKey, previousModuleKey),
  completeAddingBlock: () => setAddingBlock(false),
  setModule: (moduleKey: string, previousModuleKey: string) =>
    setSelectedModule(moduleKey, previousModuleKey),
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditorView)
);
