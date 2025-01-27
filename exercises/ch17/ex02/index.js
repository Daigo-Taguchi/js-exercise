import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const GITHUB_TOKEN = 'your-token'; // GitHub トークンを設定

// verbose オプションでログを出力する
function logVerbose(verbose, message) {
  if (verbose) {
    console.log(message);
  }
}

export async function createIssue(repo, title, body, verbose = false) {
  const [owner, repoName] = repo.split('/');
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/issues`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'X-Github-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          title,
          body,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    // レスポンスの JSON を取得
    const responseData = await response.json();

    logVerbose(
      verbose,
      `Request: Create Issue\nResponse: ${JSON.stringify(
        response.data,
        null,
        2
      )}`
    );
    console.log(`Issue created: ${responseData.html_url}`);
  } catch (error) {
    console.error(`Error creating issue: ${error.message}`);
  }
}

export async function closeIssue(repo, issueNumber, verbose = false) {
  const [owner, repoName] = repo.split('/');
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/issues/${issueNumber}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'X-Github-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          state: 'closed',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const responseData = await response.json();

    logVerbose(
      verbose,
      `Request: Close Issue\nResponse: ${JSON.stringify(responseData, null, 2)}`
    );
    console.log(`Issue closed: ${responseData.html_url}`);
  } catch (error) {
    console.error(`Error closing issue: ${error.message}`);
  }
}

export async function listIssues(repo, verbose = false) {
  const [owner, repoName] = repo.split('/');
  try {
    const url = new URL(
      `https://api.github.com/repos/${owner}/${repoName}/issues`
    );
    url.searchParams.append('state', 'open');
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'X-Github-Api-Version': '2022-11-28',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const responseData = await response.json();

    logVerbose(
      verbose,
      `Request: List Issues\nResponse: ${JSON.stringify(responseData, null, 2)}`
    );
    console.log('Open Issues:');
    responseData.forEach((issue) => {
      console.log(`- (#${issue.number}): ${issue.title}`);
    });
  } catch (error) {
    console.error(`Error listing issues: ${error.message}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  // yargs ライブラリを使用してコマンドライン引数を処理
  yargs(hideBin(process.argv))
    .command(
      'create <repo> <title> <body>',
      'Create a new issue',
      (yargs) => {
        yargs
          .positional('repo', {
            describe: 'Repository in owner/repo format',
            type: 'string',
          })
          .positional('title', {
            describe: 'Title of the issue',
            type: 'string',
          })
          .positional('body', {
            describe: 'Body of the issue',
            type: 'string',
          });
      },
      (argv) => {
        createIssue(argv.repo, argv.title, argv.body, argv.verbose);
      }
    )
    .command(
      'close <repo> <issueNumber>',
      'Close an issue',
      (yargs) => {
        yargs
          .positional('repo', {
            describe: 'Repository in owner/repo format',
            type: 'string',
          })
          .positional('issueNumber', {
            describe: 'Issue number to close',
            type: 'number',
          });
      },
      (argv) => {
        closeIssue(argv.repo, argv.issueNumber, argv.verbose);
      }
    )
    .command(
      'list <repo>',
      'List open issues',
      (yargs) => {
        yargs.positional('repo', {
          describe: 'Repository in owner/repo format',
          type: 'string',
        });
      },
      (argv) => {
        listIssues(argv.repo, argv.verbose);
      }
    )
    .option('v', {
      alias: 'verbose',
      type: 'boolean',
      description: 'Enable verbose logging',
    })
    .option('h', {
      alias: 'help',
      type: 'boolean',
      description: 'Show help',
    })
    .help()
    .strict().argv;
}
