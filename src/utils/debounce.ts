function debounce<T extends (productId: string, value: string) => void>(
  func: T,
  threshold = 400,
): T {
  let timeout: number;

  return function wait(this: unknown, ...args: unknown[]) {
    clearTimeout(timeout);
    timeout = setTimeout(func.bind(this, ...args), threshold);
  } as unknown as T;
}

export default debounce;
