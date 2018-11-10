// @flow

export type ElementProps = {
  element: string,
  children: any,
  [string]: any,
};

export const elementDefaultProps = {
  element: 'div',
  children: undefined,
};

export const elementPropsConfig = {
  children: {
    label: 'Content',
    type: 'string',
  },
};
