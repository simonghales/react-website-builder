// @flow

export function transitionEnter(transition: string): string {
  return `${transition}-enter`;
}

export function transitionEnterActive(transition: string): string {
  return `${transition}-enter-active`;
}

export function transitionExit(transition: string): string {
  return `${transition}-exit`;
}

export function transitionExitActive(transition: string): string {
  return `${transition}-exit-active`;
}
