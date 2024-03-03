export function greet(message: string) {
  return `Hello you, ${message}`;
}

export function adder(init: number) {
  return (x: number) => init + x;
}

export function version() {
  return "{{ n2v:app.version }}";
}
