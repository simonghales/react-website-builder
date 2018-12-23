// @flow

import arrayMove from 'array-move';
import type {
  BlockModelPropsConfig,
  RepeaterDataModel,
  RepeaterDataModelField,
} from '../../../models';
import {
  getBlockUniqueId,
  getRepeaterDataModelFieldUniqueId,
  getRepeaterDataUniqueId,
} from '../../../utils';
import { blockPropsConfigTypes } from '../../../props';

export type RepeaterDataFields = {
  [string]: any,
};

export type RepeaterDataValue = {
  key: string,
  order: number,
  fields: RepeaterDataFields,
};

export type RepeaterDataItems = {
  [string]: RepeaterDataValue,
};

export type RepeaterData = {
  items: RepeaterDataItems,
};

export function getRepeaterDataItemFields(item: RepeaterDataValue): RepeaterDataFields {
  const { fields = {} } = item;
  return fields;
}

export function updateRepeaterDataItemValue(
  itemKey: string,
  propKey: string,
  propValue: string,
  data: RepeaterData
): RepeaterData {
  return {
    ...data,
    items: {
      ...data.items,
      [itemKey]: {
        ...data.items[itemKey],
        fields: {
          ...data.items[itemKey].fields,
          [propKey]: propValue,
        },
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
    return itemA.order - itemB.order;
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
      order: index,
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
      order: index,
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
    key: getRepeaterDataUniqueId(),
    order: index,
    fields: {
      ...dataFields,
    },
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
  const newItemKey = newItem.key;
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
      order: itemIndex,
    };
  });
  return {
    ...data,
    items: updatedItems,
  };
}

export function generateRepeaterDataModelField(): RepeaterDataModelField {
  return {
    key: getRepeaterDataModelFieldUniqueId(),
    label: '',
    type: blockPropsConfigTypes.string,
  };
}

export function addNewFieldToRepeaterDataModel(
  repeaterDataModel: RepeaterDataModel
): RepeaterDataModel {
  const newField = generateRepeaterDataModelField();
  return {
    ...repeaterDataModel,
    [newField.key]: newField,
  };
}

export function updateFieldInRepeaterDataModel(
  repeaterDataModel: RepeaterDataModel,
  fieldKey: string,
  fieldLabel: string
): RepeaterDataModel {
  return {
    ...repeaterDataModel,
    [fieldKey]: {
      ...repeaterDataModel[fieldKey],
      label: fieldLabel,
    },
  };
}

export function removeFieldFromRepeaterDataModel(
  repeaterDataModel: RepeaterDataModel,
  fieldKey: string
): RepeaterDataModel {
  const updatedRepeaterDataModel = {
    ...repeaterDataModel,
  };
  delete updatedRepeaterDataModel[fieldKey];
  return updatedRepeaterDataModel;
}

export function removeFieldDataFromRepeaterData(
  data: RepeaterData,
  fieldKey: string
): RepeaterData {
  const items = getRepeaterDataItems(data);
  const updatedItems = {};
  Object.keys(items).forEach((itemKey: string) => {
    const item = items[itemKey];
    const fields = getRepeaterDataItemFields(item);
    const updatedFields = {
      ...fields,
    };
    if (updatedFields[fieldKey]) {
      delete updatedFields[fieldKey];
    }
    updatedItems[itemKey] = {
      ...item,
      fields: updatedFields,
    };
  });
  return {
    ...data,
    items: updatedItems,
  };
}
