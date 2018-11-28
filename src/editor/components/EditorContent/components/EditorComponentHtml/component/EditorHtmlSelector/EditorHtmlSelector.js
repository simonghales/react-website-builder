// @flow
import React from 'react';
import EditorFieldGroup from '../../../EditorFields/components/EditorFieldGroup/EditorFieldGroup';
import EditorField, {
  editorInputTypes,
} from '../../../EditorFields/components/EditorField/EditorField';
import type { BlockModel } from '../../../../../../../blocks/models';

type Props = {
  block: BlockModel,
};

const EditorHtmlSelector = ({ block }: Props) => (
  <EditorFieldGroup label="HTML">
    <EditorField
      label="Element"
      value=""
      onChange={() => {}}
      inheritedValue=""
      noLabelWrapper={false}
      inputType={editorInputTypes.htmlSelector}
      block={block}
    />
  </EditorFieldGroup>
);

export default EditorHtmlSelector;
