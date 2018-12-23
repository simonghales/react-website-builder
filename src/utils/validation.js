// @flow
import { isArray } from 'lodash';

export function isValueDefined(value: any): boolean {
  return typeof value !== 'undefined';
}

export function isValueArray(value: any): boolean {
  return isArray(value);
}
