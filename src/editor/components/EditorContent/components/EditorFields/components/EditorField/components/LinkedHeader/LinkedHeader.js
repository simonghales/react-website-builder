// @flow
import React, { Component } from 'react';
import { cx } from 'emotion';
import { MdLink } from 'react-icons/md';
import { connect } from 'react-redux';
import styles from '../../styles';
import type { ReduxState } from '../../../../../../../../../state/redux/store';
import { getModuleBlockPropsDetails } from '../../../../../../../../../state/redux/editor/selector';
import { getPropLabelFromDataBlocksPropsDetails } from '../../../../../../../../../data/blocks/state';

type Props = {
  isLinked: boolean,
  linkedPropKey?: string,
  linkedPropLabel: string,
};

class LinkedHeader extends Component<Props> {
  handleOnClick = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    this.handleToggleLinked();
    return false;
  };

  handleToggleLinked = () => {
    const { isLinked } = this.props;
    if (isLinked) {
      console.log('unlink!');
    } else {
      console.log('show linked options');
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

export default connect(mapStateToProps)(LinkedHeader);
