// @flow

export function buttonize(handlerFn: () => {}) {
  return {
    role: 'button',
    onClick: handlerFn,
    onKeyPress: handlerFn,
  };
}
