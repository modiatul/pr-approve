const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');
const github = require('@actions/github');

const token = core.getInput('token');
const octokit = new Octokit({ auth: `token ${token}` });
const context = github.context;

async function run() {
  try {
    const { owner, repo } = context.repo;

    const number = context.payload.pull_request.number;

    const comment = core.getInput('comment');
    await octokit.pulls.createReview({
      owner,
      repo,
      pull_number: number,
      event: 'APPROVE',
      body: comment,
    })

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
