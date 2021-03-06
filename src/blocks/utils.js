// @flow
// import { uniqueId } from 'lodash';
import Hashids from 'hashids';

const hashids = new Hashids();

export function getBlockUniqueId(): string {
  const randomInt = Math.round(Math.random() * 1000);
  const time = Date.now();
  const numberString = `${randomInt.toString()}${time.toString()}`;
  const parsedNumber = parseInt(numberString, 10);
  console.log('getBlockUniqueId parsedNumber', parsedNumber);
  const id = hashids.encode(parsedNumber);
  console.log('getBlockUniqueId', id);
  return id;
  // return uniqueId('block_');
}

export function getModuleUniqueId(): string {
  return getBlockUniqueId(); // todo - use firestore unique key
}

export function getPageUniqueId(): string {
  return getBlockUniqueId(); // todo - use firestore unique key
}

export function getRepeaterDataUniqueId(): string {
  return getBlockUniqueId(); // todo - use firestore unique key
}

export function getRepeaterDataModelFieldUniqueId(): string {
  return getBlockUniqueId(); // todo - use firestore unique key
}


export function getMixinUniqueId(): string {
  return getBlockUniqueId(); // todo - use firestore unique key
}
