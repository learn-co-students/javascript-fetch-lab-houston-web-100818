const TOKEN = `token d8be765b071b671d6466eb594a81c5271f00ff41`

const masterOwner = 'learn-co-curriculum'
const repoName = '/javascript-fetch-lab'
const masterRepo = `${masterOwner}${repoName}`
const forkURL = `https://api.github.com/repos/${masterRepo}/forks`
let forkedRepoURL
let forkedRepoAPIURL
const repoDiv = document.querySelector('#results')
const issuesDiv = document.querySelector('#issues')

function getIssues() {
  const issuesAPIURL = `${forkedRepoAPIURL}/issues`
  fetch(issuesAPIURL)
    .then(function(response) {
      return response.json()
    })
    .then(function(issues) {
      showIssues(issues)
    })
}

function showIssues(issues) {
  const issuesURL = `${forkedRepoURL}/issues`
  issues = Array.prototype.slice.call(issues)
  issuesDiv.innerHTML = ''
  issues.forEach(function(issue) {
    const issueItem = issuesDiv.appendChild(document.createElement('p'))
    issueItem.innerHTML = `
      <a target="_blank" href="${issuesURL}/${issue.id}">${issue.title}</a>
    `
  })
}

function createIssue() {
  const title = document.querySelector('#title').value
  document.querySelector('#title').value = ''
  const description = document.querySelector('#body').value
  document.querySelector('#body').value = ''
  const issuesAPIURL = `${forkedRepoAPIURL}/issues`
  fetch(issuesAPIURL, {
    method: 'POST',
    headers: {
      Authorization: `${TOKEN}`,
      'Accept':'application/vnd.github.symmetra-preview+json'
    },
    body: JSON.stringify({
      title: title,
      body: description
    })
  }).then(getIssues)
}

function showResults(forkedRepo) {
  repoDiv.innerHTML = `
    <h1>Repo: <a target="_blank" href="${forkedRepoURL}">${forkedRepo.name}</a></h1>
    <p id="fork-owner">Owner: ${forkedRepo.owner.login}</p>
    <p id="num-forks">Forks: ${forkedRepo.forks_count}</p>
    <p id="repo-desc">${forkedRepo.description}</p>
  `
}

function forkRepo() {
  fetch(forkURL, {
    method: 'POST',
    headers: {
      Authorization: `${TOKEN}`
    }
  })
    .then(res => res.json())
    .then(function(forkedRepo) {
      forkedRepoURL = `https://github.com/${forkedRepo.owner.login}${repoName}`
      forkedRepoAPIURL = `https://api.github.com/repos/${forkedRepo.owner.login}${repoName}`
      showResults(forkedRepo)
      getIssues()
    })
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ''
}
