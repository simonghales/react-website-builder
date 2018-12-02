// @flow
import React, { Component } from 'react';
import { cx } from 'emotion';
import { MdLink } from 'react-icons/md';
import { connect } from 'react-redux';
import styles from '../../styles';
import type { ReduxState } from '../../../../../../../../../state/redux/store';
import { getModuleBlockPropsDetails } from '../../../../../../../../../state/redux/editor/selector';
import { getPropLabelFromDataBlocksPropsDetails } from '../../../../../../../../../data/blocks/state';
import { setPropLinkedReference } from '../../../../../../../../../state/redux/editor/reducer';

type Props = {
  propKey: string,
  isLinked: boolean,
  linkedPropKey?: string,
  linkedPropLabel: string,
  setLinked: (propKey: string, isLinked: boolean) => void,
};

class LinkedHeader extends Component<Props> {
  handleOnClick = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    this.handleToggleLinked();
    return false;
  };

  handleToggleLinked = () => {
    const { propKey, isLinked, setLinked } = this.props;
    if (isLinked) {
      setLinked(propKey, false);
    } else {
      setLinked(propKey, true);
    }
  };

  render() {
    const { isLinked, linkedPropLabel } = this.props;
    return (
      <div
        className={cx(styles.linkedHeaderClass, {
          [styles.linkedHeaderActiveClass]: isLinked,
        })}
        onClick={this.handleOnClick}
      >
        <div
          className={cx(styles.linkedHeaderIconClass, {
            [styles.linkedHeaderIconActiveClass]: isLinked,
          })}
          data-tip={isLinked ? 'Unlink from prop' : 'Link to a prop'}
        >
          <MdLink />
        </div>
        {isLinked && <div>{linkedPropLabel}</div>}
      </div>
    );
  }
}

LinkedHeader.defaultProps = {
  linkedPropKey: '',
  linkedPropLabel: '',
};

const mapStateToProps = (state: ReduxState, { linkedPropKey }: Props) => {
  const rootBlockPropsList = getModuleBlockPropsDetails(state);
  return {
    linkedPropLabel: getPropLabelFromDataBlocksPropsDetails(linkedPropKey, rootBlockPropsList),
  };
};

const mapDispatchToProps = {
  setLinked: (propKey: string, isLinked: boolean) => setPropLinkedReference(propKey, isLinked),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedHeader);
