const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('token');
    const octokit = new Octokit({ auth: `token ${token}` });
    const context = github.context;

    const { owner, repo } = context.repo;
    const number = context.payload.pull_request.number;

    const body = core.getInput('comment');

    await octokit.pulls.createReview({
      owner,
      repo,
      pull_number: number,
      event: 'APPROVE',
      body,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
