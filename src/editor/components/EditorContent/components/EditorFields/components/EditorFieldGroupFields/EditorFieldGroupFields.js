// @flow
import React from 'react';
import type { EditorFieldModel } from '../../model';
import styles from './styles';
import EditorField from '../EditorField/EditorField';
import type { BlockModel } from '../../../../../../../blocks/models';

type Props = {
  fields: Array<EditorFieldModel>,
  blockKey: string,
  block?: BlockModel,
  isContent?: boolean,
};

const EditorFieldGroupFields = ({ fields, block, blockKey, isContent }: Props) => (
  <React.Fragment>
    {fields.map((field: EditorFieldModel) => (
      <div
        className={styles.fieldContainerClass}
        key={field.key}
        style={{ gridColumnEnd: `span ${field.columns}` }}
      >
        <EditorField
          propKey={field.key}
          blockKey={blockKey}
          key={field.key}
          label={field.label}
          value={field.value}
          inheritedValue={field.inheritedValue}
          onChange={field.onChange}
          inputType={field.inputType}
          noLabelWrapper={field.noLabelWrapper}
          block={block}
          linkedPropEnabled={isContent}
          isPropReference={field.isPropReference}
          linkedPropKey={field.linkedPropKey}
        />
      </div>
    ))}
  </React.Fragment>
);

EditorFieldGroupFields.defaultProps = {
  isContent: false,
};

export default EditorFieldGroupFields;
