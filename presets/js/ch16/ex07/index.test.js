// checkEntry.test.mjs
import { checkEntry } from "./index.js";
import { promises as fs } from "fs";

// fs.promises.stat をモック
jest.mock("fs", () => ({
  promises: {
    stat: jest.fn(),
  },
}));

describe("checkEntry", () => {
  it('should return "file" if the path is a file', async () => {
    fs.stat.mockResolvedValue({ isFile: () => true, isDirectory: () => false });

    const result = await checkEntry("some/file/path");
    expect(result).toBe("file");
  });

  it('should return "directory" if the path is a directory', async () => {
    fs.stat.mockResolvedValue({ isFile: () => false, isDirectory: () => true });

    const result = await checkEntry("some/directory/path");
    expect(result).toBe("directory");
  });

  it('should return "unknown" if the path is neither a file nor a directory', async () => {
    fs.stat.mockResolvedValue({
      isFile: () => false,
      isDirectory: () => false,
    });

    const result = await checkEntry("some/unknown/path");
    expect(result).toBe("unknown");
  });

  it("should throw an error if fs.stat throws an error", async () => {
    fs.stat.mockRejectedValue(new Error("File not found"));

    await expect(checkEntry("some/nonexistent/path")).rejects.toThrow(
      "File not found"
    );
  });
});
