// @flow

export function goToModule(moduleKey: string, previousModuleKey: string, history: any): void {
  if (previousModuleKey) {
    history.push(`/editor/${moduleKey}/${previousModuleKey}`);
  } else {
    history.push(`/editor/${moduleKey}`);
  }
}

export const editorRoutes = {
  optionalPage: `/test/:pageKey?`,
  page: `/test/:pageKey`,
  pageWithModule: `/test/:pageKey/:moduleKey`,
};
