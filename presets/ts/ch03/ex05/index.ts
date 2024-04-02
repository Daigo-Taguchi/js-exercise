export function convertEOL(str: string, type: "LF" | "CRLF"): string {
  if (type === "LF") {
    return str.replace(/\r\n/g, `\n`);
  } else {
    return str.replace(/\r\n|\n/g, `\r\n`);
  }
}
