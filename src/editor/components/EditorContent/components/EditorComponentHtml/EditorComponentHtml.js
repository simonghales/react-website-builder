// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditorLayout from '../EditorLayout/EditorLayout';
import EditorLayoutColumn from '../EditorLayout/components/EditorLayoutColumn';
import type { ReduxState } from '../../../../../state/redux/store';
import EditorHtmlSelector from './component/EditorHtmlSelector/EditorHtmlSelector';
import { getSelectedBlockBlock } from '../../../../../state/redux/editor/selector';
import type { BlockModel } from '../../../../../blocks/models';
import type { EditorFieldModel } from '../EditorFields/model';
import { getHtmlPropsFields } from '../EditorFields/state';
import type { DataBlockModel } from '../../../../../data/blocks/models';
import EditorFieldGroupFields from '../EditorFields/components/EditorFieldGroupFields/EditorFieldGroupFields';
import EditorFieldGroup from '../EditorFields/components/EditorFieldGroup/EditorFieldGroup';
import EditorHtmlAttributes from './component/EditorHtmlAttributes/EditorHtmlAttributes';

type Props = {
  block: BlockModel,
  // eslint-disable-next-line react/no-unused-prop-types
  dataBlock: DataBlockModel,
  htmlPropsFields: Array<EditorFieldModel>,
};

class EditorComponentHtml extends Component<Props> {
  render() {
    const { block, htmlPropsFields } = this.props;
    return (
      <EditorLayout>
        <EditorLayoutColumn columns={8}>
          <EditorFieldGroup label="HTML">
            <EditorFieldGroupFields fields={htmlPropsFields} block={block} />
          </EditorFieldGroup>
        </EditorLayoutColumn>
        <EditorLayoutColumn columns={1} />
        <EditorLayoutColumn columns={5}>
          <EditorHtmlAttributes />
        </EditorLayoutColumn>
      </EditorLayout>
    );
  }
}

const mapStateToProps = (state: ReduxState, { dataBlock }: Props) => {
  const block = getSelectedBlockBlock(state);
  const htmlPropsFields = getHtmlPropsFields(block, dataBlock);
  return {
    block,
    htmlPropsFields,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorComponentHtml);
