// @flow
import { kebabCase } from 'lodash';

export function getNameSlug(name: string): string {
  return kebabCase(name);
}
