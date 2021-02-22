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

    await octokit.pulls.createReview({
      owner,
      repo,
      pull_number: number,
      event: 'APPROVE',
      body: '1234',
    })

    await octokit.pulls.merge({
      owner,
      repo,
      pull_number: number,
      commit_title: `Auto merge ${number}`,
      commit_message: '123455'
    })
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
