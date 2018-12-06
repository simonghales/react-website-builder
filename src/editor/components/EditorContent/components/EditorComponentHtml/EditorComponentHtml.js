// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditorLayout from '../EditorLayout/EditorLayout';
import EditorLayoutColumn from '../EditorLayout/components/EditorLayoutColumn';
import type { ReduxState } from '../../../../../state/redux/store';
import { getSelectedBlockBlock } from '../../../../../state/redux/editor/selector';
import type { BlockModel } from '../../../../../blocks/models';
import { getHtmlPropsFields } from '../EditorFields/state';
import type { DataBlockModel } from '../../../../../data/blocks/models';
import EditorFieldGroupFields from '../EditorFields/components/EditorFieldGroupFields/EditorFieldGroupFields';
import EditorFieldGroup from '../EditorFields/components/EditorFieldGroup/EditorFieldGroup';
import EditorHtmlAttributes from './component/EditorHtmlAttributes/EditorHtmlAttributes';
import { setBlockPropValue } from '../../../../../state/redux/editor/reducer';
import DisabledMessage from '../DisabledMessage/DisabledMessage';

type Props = {
  block: BlockModel,
  // eslint-disable-next-line react/no-unused-prop-types
  dataBlock: DataBlockModel,
  updateProp: (blockKey: string, propKey: string, value: string) => void,
  disabled: boolean,
};

class EditorComponentHtml extends Component<Props> {
  updateProp = (propKey: string, value: string) => {
    const { dataBlock } = this.props;
    const { updateProp } = this.props;
    return updateProp(dataBlock.key, propKey, value);
  };

  getHtmlPropsFields() {
    const { block, dataBlock } = this.props;
    return getHtmlPropsFields(block, dataBlock, this.updateProp);
  }

  render() {
    const { block, dataBlock, disabled } = this.props;
    if (disabled) {
      return <DisabledMessage message="HTML cannot be modified for this block." />;
    }
    const htmlPropsFields = this.getHtmlPropsFields();
    return (
      <EditorLayout>
        <EditorLayoutColumn columns={8}>
          <EditorFieldGroup label="HTML">
            <EditorFieldGroupFields
              fields={htmlPropsFields}
              block={block}
              blockKey={dataBlock.key}
            />
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

const mapStateToProps = (state: ReduxState) => {
  const block = getSelectedBlockBlock(state);
  return {
    block,
  };
};

const mapDispatchToProps = {
  updateProp: (blockKey: string, propKey: string, value: string) =>
    setBlockPropValue(blockKey, propKey, value),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorComponentHtml);
