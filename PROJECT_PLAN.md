# DevOps Mini-Project Plan

## Workflow

`branch -> commit -> push -> pull request -> review -> merge`

No direct pushes to `main`. Use Conventional Commits: `feat:`, `fix:`, `ci:`, `docs:`, `chore:`.

## Lab 1 execution checklist

### Part A — Individual fork and PR

1. Fork `longndt/devops-project` and clone the personal fork.
2. Add `upstream` pointing to `https://github.com/longndt/devops-project.git`.
3. Create `feature/add-your-name`, edit `CONTRIBUTORS.md`, then commit and push.
4. Open the PR against `longndt/devops-project:main`.
5. Review and approve a real classmate PR (A.8); wait for the lecturer/maintainer
   to merge your PR (A.9). Do not count an open PR as merged work.

### Part B — Central group repository

1. The Leader forks the base project and everyone clones the Leader's repo; members
   do not fork the Leader's repo.
2. Add each teammate and the lecturer as collaborators, then enable protection on
   `main` (pull request, one approval, and the CI `test` check).
3. Each member creates a personal feature branch, edits `README.md`, commits with
   a Conventional Commit, pushes, and opens a PR into the group's `main`.
4. A different member reviews and approves the PR. The Leader tests it and merges
   only after the required checks are green.

### Part C — Local verification

```bash
cd backend && npm ci && npm test
cd ../frontend && npm ci && CI=true npm test -- --runInBand
cd .. && docker compose config
docker compose up --build -d
curl http://localhost:8080/health
docker compose down
```

Record the test output, health response, Compose service status, and any setup
issue in the report. Never commit `.env`, credentials, or `node_modules`.

### Project delivery gates

- **Leader:** collaborator access, branch protection, reviews, integration, secrets,
  deployment, report and demo evidence.
- **Developer:** own branch and PR history for implementation work; the report must
  describe only work that member actually contributed.
- **External gates:** classmate review, lecturer acceptance/merge, GitHub Actions
  activation, Docker Hub/Render secrets, and a real deployment run.

## Phases

1. **Repository setup** — Leader manages collaborators, branch protection and PR review.
2. **Backend** — Tuan fixes the six intentional bugs and gets `npm test` to 7/7.
3. **Containerization** — Tuan completes both multi-stage Dockerfiles, `.dockerignore` files and `docker-compose.yml`.
4. **CI/CD** — Tuan completes frontend CI and the Docker build/push workflow; Leader configures secrets and deployment.
5. **Integration** — Leader reviews each PR, runs the full stack, resolves conflicts and merges only green changes.
6. **Submission** — Both members record their real work for the report, slides and live demo.

## Definition of done

- Backend tests: 7/7 passing.
- Frontend tests: 7/7 passing.
- `docker compose up --build -d` starts PostgreSQL, backend and frontend.
- `/health` returns HTTP 200.
- CI passes on the final PR.
- CD builds/pushes images and deployment is observable after merge to `main`.
- Every merged change has a PR and at least one approval.
