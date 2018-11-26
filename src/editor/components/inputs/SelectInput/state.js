// @flow

export function parseSelectInputStyleValue(
  styleValue: string = ''
): Array<{
  value: string,
  label: string,
}> | null {
  return styleValue
    ? styleValue.split(',').map((value: string) => ({
        value,
        label: value,
      }))
    : null;
}
