import { Octokit } from "@octokit/rest";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const GITHUB_TOKEN = "your-github-token"; // GitHub トークンを設定

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

// verbose オプションでログを出力する
function logVerbose(verbose, message) {
  if (verbose) {
    console.log(message);
  }
}

async function createIssue(repo, title, body, verbose = false) {
  const [owner, repoName] = repo.split("/");
  try {
    const response = await octokit.request(
      `POST /repos/${owner}/${repoName}/issues`,
      {
        owner,
        repo: repoName,
        title,
        body,
      }
    );

    logVerbose(
      verbose,
      `Request: Create Issue\nResponse: ${JSON.stringify(
        response.data,
        null,
        2
      )}`
    );
    console.log(`Issue created: ${response.data.html_url}`);
  } catch (error) {
    console.error(`Error creating issue: ${error.message}`);
  }
}

async function closeIssue(repo, issueNumber, verbose = false) {
  const [owner, repoName] = repo.split("/");
  try {
    const response = await octokit.request(
      `PATCH /repos/${owner}/${repoName}/issues/${issueNumber}`,
      {
        owner,
        repo: repoName,
        issue_number: issueNumber,
        state: "closed",
      }
    );

    logVerbose(
      verbose,
      `Request: Close Issue\nResponse: ${JSON.stringify(
        response.data,
        null,
        2
      )}`
    );
    console.log(`Issue closed: ${response.data.html_url}`);
  } catch (error) {
    console.error(`Error closing issue: ${error.message}`);
  }
}

async function listIssues(repo, verbose = false) {
  const [owner, repoName] = repo.split("/");
  try {
    const response = await octokit.request(
      `GET /repos/${owner}/${repoName}/issues`,
      {
        owner,
        repo: repoName,
        state: "open",
      }
    );

    logVerbose(
      verbose,
      `Request: List Issues\nResponse: ${JSON.stringify(
        response.data,
        null,
        2
      )}`
    );
    console.log("Open Issues:");
    response.data.forEach((issue) => {
      console.log(`- (#${issue.number}): ${issue.title}`);
    });
  } catch (error) {
    console.error(`Error listing issues: ${error.message}`);
  }
}

// yargs ライブラリを使用してコマンドライン引数を処理
yargs(hideBin(process.argv))
  .command(
    "create <repo> <title> <body>",
    "Create a new issue",
    (yargs) => {
      yargs
        .positional("repo", {
          describe: "Repository in owner/repo format",
          type: "string",
        })
        .positional("title", { describe: "Title of the issue", type: "string" })
        .positional("body", { describe: "Body of the issue", type: "string" });
    },
    (argv) => {
      createIssue(argv.repo, argv.title, argv.body, argv.verbose);
    }
  )
  .command(
    "close <repo> <issueNumber>",
    "Close an issue",
    (yargs) => {
      yargs
        .positional("repo", {
          describe: "Repository in owner/repo format",
          type: "string",
        })
        .positional("issueNumber", {
          describe: "Issue number to close",
          type: "number",
        });
    },
    (argv) => {
      closeIssue(argv.repo, argv.issueNumber, argv.verbose);
    }
  )
  .command(
    "list <repo>",
    "List open issues",
    (yargs) => {
      yargs.positional("repo", {
        describe: "Repository in owner/repo format",
        type: "string",
      });
    },
    (argv) => {
      listIssues(argv.repo, argv.verbose);
    }
  )
  .option("v", {
    alias: "verbose",
    type: "boolean",
    description: "Enable verbose logging",
  })
  .option("h", {
    alias: "help",
    type: "boolean",
    description: "Show help",
  })
  .help()
  .strict().argv;
