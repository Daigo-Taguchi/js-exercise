import { createIssue } from './index';
import { jest } from '@jest/globals';
import { Polly } from '@pollyjs/core';
// import { setupPolly } from 'setup-polly-jest';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('polly test', () => {
  // setupPolly({
  //   adapters: ['node-http'],
  //   persister: 'fs',
  //   persisterOptions: {
  //     fs: {
  //       recordingsDir: './__recordings__',
  //     },
  //   },
  //   recordIfMissing: true,
  // });

  const polly = new Polly('createIssue', {
    adapters: ['node-http'],
    persister: 'fs',
    recordIfMissing: true,
  });

  test('create issue test', async () => {
    polly.configure({
      persisterOptions: {
        fs: {
          recordingsDir: './__recordings__',
        },
      },
    });

    const repo = 'Daigo-Taguchi/js-exercise';
    const title = 'Test Issue';
    const body = 'This is a test issue';

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await createIssue(repo, title, body, true);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Issue created: https://')
    );
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});

// 録画データが作成されない理由がわからない
// setupPolly を使う例が公式ページに記載されていたので使ってみたら
// SyntaxError: The requested module 'setup-polly-jest' does not provide an export named 'setupPolly'
// というエラーが発生して利用できない (ESModule で利用することが原因？)
