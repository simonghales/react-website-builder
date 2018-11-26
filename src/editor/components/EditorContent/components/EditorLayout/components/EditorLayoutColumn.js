// @flow
import React from 'react';
import styled from 'react-emotion';

const Column = styled('div')`
    ${({columns}) => `grid-column: span ${columns};`};
`;

type Props = {
  children: any,
  columns: number,
}

const EditorLayoutColumn = ({children, columns}: Props) => (
  <Column columns={columns}>
    {children}
  </Column>
)

export default EditorLayoutColumn;
