// @flow

import type { PageDataModel, PagesDataModel } from './models';
import { getNameSlug } from '../../utils/slugs';

export function getPageFromPages(pageKey: string, pages: PagesDataModel): PageDataModel {
  const page = pages[pageKey];
  if (!page) {
    throw new Error(`Page key "${pageKey}" not found within pages.`);
  }
  return page;
}

export function matchPageKeyViaNameSlug(pageNameSlug: string, pages: PagesDataModel): string {
  const matchedPageKey = Object.keys(pages).find((pageKey: string) => {
    const page = pages[pageKey];
    return pageNameSlug === getNameSlug(page.name);
  });
  return matchedPageKey;
}

export function getPageModuleKey(page: PageDataModel): string {
  return page.moduleKey;
}
