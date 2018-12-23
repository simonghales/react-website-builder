// @flow
import React, { Component } from 'react';
import type { RepeaterProps } from './props';
import { BLOCK_REPEATER_DATA_CHILDREN } from '../../../props';

class RepeaterComponent extends Component<RepeaterProps> {
  render() {
    const children = this.props[BLOCK_REPEATER_DATA_CHILDREN];
    return <React.Fragment>{children}</React.Fragment>;
  }
}

export default RepeaterComponent;
