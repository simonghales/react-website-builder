// @flow

import arrayMove from 'array-move';
import type { BlockModelPropsConfig, RepeaterDataModel } from '../../../models';
import { getBlockUniqueId, getRepeaterDataUniqueId } from '../../../utils';

export type RepeaterDataValue = {
  _key: string,
  _order: number,
  [string]: any,
};

export type RepeaterDataItems = {
  [string]: RepeaterDataValue,
};

export type RepeaterData = {
  items: RepeaterDataItems,
};

export function updateRepeaterDataItemValue(
  itemKey: string,
  propKey: string,
  propValue: string,
  data: RepeaterData
): RepeaterData {
  console.log('update', itemKey, propKey, propValue);
  return {
    ...data,
    items: {
      ...data.items,
      [itemKey]: {
        ...data.items[itemKey],
        [propKey]: propValue,
      },
    },
  };
}

export function getRepeaterDataItems(data: RepeaterData): RepeaterDataItems {
  const { items = {} } = data;
  return items;
}

export function getSortedRepeaterDataItems(items: RepeaterDataItems): Array<string> {
  return Object.keys(items).sort((itemKeyA, itemKeyB) => {
    const itemA = items[itemKeyA];
    const itemB = items[itemKeyB];
    // eslint-disable-next-line no-underscore-dangle
    return itemA._order - itemB._order;
  });
}

export function removeItemFromRepeaterData(itemKey: string, data: RepeaterData): RepeaterData {
  const items = getRepeaterDataItems(data);
  delete items[itemKey];
  const sortedItems = getSortedRepeaterDataItems(items);
  const updatedItems = {};
  sortedItems.forEach((sortedItemKey: string, index: number) => {
    updatedItems[sortedItemKey] = {
      ...items[sortedItemKey],
      _order: index,
    };
  });
  return {
    ...data,
    items: updatedItems,
  };
}

export function changeItemOrderInRepeaterData(
  itemKey: string,
  newIndex: number,
  data: RepeaterData
): RepeaterData {
  const items = getRepeaterDataItems(data);
  const sortedItems = getSortedRepeaterDataItems(items);
  const currentIndex = sortedItems.indexOf(itemKey);
  const updatedItemsOrder: Array<string> = arrayMove(sortedItems, currentIndex, newIndex);
  const updatedItems = {};
  updatedItemsOrder.forEach((updatedItemKey: string, index: number) => {
    updatedItems[updatedItemKey] = {
      ...items[updatedItemKey],
      _order: index,
    };
  });
  return {
    ...data,
    items: updatedItems,
  };
}

export function getRepeaterDataModelFromPropConfig(
  propConfig: BlockModelPropsConfig
): RepeaterDataModel {
  const { repeaterDataModel = {} } = propConfig;
  return repeaterDataModel;
}

export function generateNewRepeaterDataItem(propConfig: BlockModelPropsConfig, index: number) {
  const dataModel = getRepeaterDataModelFromPropConfig(propConfig);
  const dataFields = {};
  Object.keys(dataModel).forEach((fieldKey: string) => {
    dataFields[fieldKey] = '';
  });
  return {
    _key: getRepeaterDataUniqueId(),
    _order: index,
    ...dataFields,
  };
}

export function addNewItemToRepeaterData(
  index: number,
  data: RepeaterData,
  propConfig: BlockModelPropsConfig
): RepeaterData {
  const items = getRepeaterDataItems(data);
  const newItem = generateNewRepeaterDataItem(propConfig, index);
  // eslint-disable-next-line no-underscore-dangle
  const newItemKey = newItem._key;
  const sortedItems = getSortedRepeaterDataItems(items);
  const updatedItemsOrder = sortedItems.slice();
  updatedItemsOrder.splice(index, 0, newItemKey);
  const allItems = {
    ...items,
    [newItemKey]: newItem,
  };
  const updatedItems = {};
  updatedItemsOrder.forEach((updatedItemKey: string, itemIndex: number) => {
    updatedItems[updatedItemKey] = {
      ...allItems[updatedItemKey],
      _order: itemIndex,
    };
  });
  return {
    ...data,
    items: updatedItems,
  };
}
