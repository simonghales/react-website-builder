// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditorLayout from '../EditorLayout/EditorLayout';
import EditorLayoutColumn from '../EditorLayout/components/EditorLayoutColumn';
import type { ReduxState } from '../../../../../state/redux/store';
import EditorHtmlSelector from './component/EditorHtmlSelector/EditorHtmlSelector';
import { getSelectedBlockBlock } from '../../../../../state/redux/editor/selector';
import type { BlockModel } from '../../../../../blocks/models';

type Props = {
  block: BlockModel,
};

class EditorComponentHtml extends Component<Props> {
  render() {
    const { block } = this.props;
    return (
      <EditorLayout>
        <EditorLayoutColumn columns={6}>
          <EditorHtmlSelector block={block} />
        </EditorLayoutColumn>
      </EditorLayout>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  block: getSelectedBlockBlock(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorComponentHtml);
