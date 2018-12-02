// @flow
import React from 'react';
import styled from 'react-emotion';
import styles from './styles';

const Column = styled('div')`
  ${({ columns }) => `grid-column: span ${columns};`};
`;

type Props = {
  children: any,
  columns: number,
};

const EditorLayoutColumn = ({ children, columns }: Props) => (
  <Column className={styles.columnClass} columns={columns}>
    {children}
  </Column>
);

export default EditorLayoutColumn;
