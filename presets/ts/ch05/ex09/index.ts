export function parseJson(str: string) {
  try {
    const data = JSON.parse(str);
    return { success: true, data };
  } catch (err) {
    return { success: false, data: err };
  }
}
