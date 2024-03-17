export function adder(init: number) {
  return (x: number) => init + x;
}

export const appVersion = "appVersion{{ n2v:app.version }}"