interface UrlObj {
  base: string;
  addQuery?: string[][];
  path?: string;
}

export function modifyUrl(urlObj: UrlObj): string {
  const { base, addQuery, path } = urlObj;
  const url = new URL(base);

  if (addQuery) {
    for (let i = 0; i < addQuery.length; i++) {
      url.searchParams.set(addQuery[i][0], addQuery[i][1]);
    }
  }
  if (path) {
    url.pathname = path;
  }
  return url.toString();
}
