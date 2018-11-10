// @flow
import { uniqueId } from 'lodash';

export function getBlockUniqueId(): string {
  return uniqueId('block_');
}
