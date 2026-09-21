# DevOps Mini-Project Plan

## Workflow

`branch -> commit -> push -> pull request -> review -> merge`

No direct pushes to `main`. Use Conventional Commits: `feat:`, `fix:`, `ci:`, `docs:`, `chore:`.

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
