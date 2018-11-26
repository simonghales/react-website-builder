// @flow
import React from 'react';
import styles from './styles';

type Props = {
  children: any,
}

const EditorLayout = ({children}: Props) => (
  <div className={styles.gridClass}>
    {children}
  </div>
)

export default EditorLayout;
