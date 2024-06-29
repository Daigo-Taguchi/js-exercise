export function withResource<T extends { close: () => void }>(
  resource: T,
  callback: (res: T) => void
): void {
  try {
    callback(resource);
  } finally {
    resource.close();
  }
}
