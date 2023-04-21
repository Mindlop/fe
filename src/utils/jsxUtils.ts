export function stopPropagation<T>(
  e: MouseEvent & {
    currentTarget: T;
    target: Element;
  }
) {
  e.stopPropagation();
}
