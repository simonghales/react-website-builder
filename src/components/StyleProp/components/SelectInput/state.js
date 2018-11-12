// @flow

export function parseSelectInputStyleValue(
  styleValue: string = ''
): Array<{
  value: string,
  label: string,
}> {
  return styleValue.split(',').map((value: string) => ({
    value,
    label: value,
  }));
}
