// @flow
import voidHtmlTags from 'html-tags/void';

export function isHtmlElementVoid(element: string): boolean {
  return voidHtmlTags.includes(element);
}
