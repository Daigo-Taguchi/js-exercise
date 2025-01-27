import { closeIssue, createIssue, listIssues } from '.';
import { jest } from '@jest/globals';

describe('Github Issue Tests', () => {
  const mockFetch = jest.fn();

  const repo = 'owner/repo';
  const title = 'Test Issue';
  const body = 'This is a test issue';

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  beforeEach(() => {
    mockFetch.mockClear(); // 各テストの前にモックをクリア
  });

  test('createIssue test', async () => {
    const mockResponseData = {
      html_url: 'https://github.com/owner/repo/issues/1',
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponseData),
    });

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await createIssue(repo, title, body);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/owner/repo/issues',
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer your-token`,
          'X-Github-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({ title, body }),
      }
    );

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Issue created: ${mockResponseData.html_url}`
    );

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test('closeIssue test', async () => {
    const mockResponseData = {
      html_url: 'https://github.com/owner/repo/issues/1',
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponseData),
    });

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await closeIssue(repo, 1);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/owner/repo/issues/1',
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer your-token`,
          'X-Github-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({ state: 'closed' }),
      }
    );

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Issue closed: ${mockResponseData.html_url}`
    );

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test('listIssues test', async () => {
    const mockResponseData = [
      { number: 1, title: 'title1' },
      { number: 2, title: 'title2' },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponseData),
    });

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await listIssues(repo);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/owner/repo/issues?state=open',
      {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer your-token`,
          'X-Github-Api-Version': '2022-11-28',
        },
      }
    );

    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'Open Issues:');
    expect(consoleLogSpy).toHaveBeenNthCalledWith(2, '- (#1): title1');
    expect(consoleLogSpy).toHaveBeenNthCalledWith(3, '- (#2): title2');

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
