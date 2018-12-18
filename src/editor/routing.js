// @flow

import type { PageDataModel } from '../data/pages/models';
import { getNameSlug } from '../utils/slugs';

export const editorPathname = '/editor';

export function getEditorPageNameSlug(name: string): string {
  return getNameSlug(name);
}

export type EditorRoutingMatch = {
  params: {
    pageNameSlug: string,
    moduleKey?: string,
    previousModuleKey?: string,
  },
};

export function getEditorRoutingMatchParam(
  paramName: string,
  match: EditorRoutingMatch
): string | undefined {
  return match.params[paramName];
}

export function goToPageModulesEditor(
  page: PageDataModel,
  match: EditorRoutingMatch,
  history: any
) {
  const pageNameSlug = getEditorPageNameSlug(page.name);
  const { moduleKey } = page;
  history.push({
    pathname: `${editorPathname}/${pageNameSlug}/${moduleKey}`,
    state: {},
  });
}

export function goToModule(
  moduleKey: string,
  previousModuleKey: string,
  match: EditorRoutingMatch,
  history: any
): void {
  const { pageNameSlug } = match.params;
  if (previousModuleKey) {
    history.push(`/editor/${pageNameSlug}/${moduleKey}/${previousModuleKey}`);
  } else {
    history.push(`/editor/${pageNameSlug}/${moduleKey}`);
  }
}

export function goToPage(pageNameSlug: string, match: EditorRoutingMatch, history: any): void {
  const { moduleKey = '', previousModuleKey = '' } = match;
  console.log(`goToPage: ${pageNameSlug}`);
  if (moduleKey) {
    if (previousModuleKey) {
      history.push(`/editor/${pageNameSlug}/${moduleKey}/${previousModuleKey}`);
      return;
    }
    history.push(`/editor/${pageNameSlug}/${moduleKey}}`);
    return;
  }
  history.push(`/editor/${pageNameSlug}`);
}

export const editorRoutes = {
  optionalPage: `/editor/:pageNameSlug?/:moduleKey?/:previousModuleKey?`,
  page: `/editor/:pageNameSlug`,
  pageWithModule: `/editor/:pageNameSlug/:moduleKey/:previousModuleKey?`,
};
