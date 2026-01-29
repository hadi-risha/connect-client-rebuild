export function searchByKeys<T>(
  data: T[],
  query: string,
  keys: (keyof T)[]
) {
  if (!query) return data;

  return data.filter((item) =>
    keys.some((key) =>
      String(item[key])
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );
}
