# Security Rotation Runbook

**Summary:** This runbook lists the sensitive items found and the recommended rotation steps. Perform revocation first, then create new keys, then update deployed secrets and CI.

## Findings (detected in repo)
- backend/.env contains:
  - DATABASE_URL (Neon connection string)
  - JWT_SECRET
  - ADMIN_USERNAME / ADMIN_PASSWORD
  - OPENAI_API_KEY
  - SENDGRID_API_KEY
- `complete_setup.py` included example admin password for tests/curl usage (now replaced to use env var).
- `backend/.env.example` has been sanitized and contains placeholders.

## Urgent steps (do immediately)
1. Revoke the compromised keys in provider consoles:
   - OpenAI: Revoke the exposed API key
   - SendGrid: Delete/Revoke the API key
   - Neon/Postgres: Rotate DB credentials and rotate connection string
   - Any other provider keys referenced in the repo or logs
2. Rotate the `JWT_SECRET` value and update runtime environment variables.
3. Change the admin password in production systems and any service accounts.

## Update deployments & CI
1. Update GitHub repository secrets (`SENDGRID_API_KEY`, `OPENAI_API_KEY`, `DATABASE_URL`, `JWT_SECRET`, `ADMIN_PASSWORD`) via GitHub settings or CLI.
2. Update Vercel/Render/Other hosting environment variables to new secrets.
3. Restart/redeploy services to pick up new secrets.

## Repo hygiene performed
- Created branch: `security/rotate-secrets-2026-02-02` with code edits to remove hardcoded admin defaults.
- Removed `backend/.env` from tracked history (if present in earlier commits) and added sanitized `backend/.env.example`.
- Created this runbook to document actions.

## Verification
1. After rotation, confirm no old keys grant access.
2. Run a smoke test of the application (health/login/chat endpoints).
3. Re-run a repo search for secrets to confirm none remain (I can run this for you).

## Next steps I can take for you
- Re-run a comprehensive secret scan and clean history of any additional leaked files. (Reply: `scan-clean`)
- Open a PR with these changes and the rotation runbook. (Reply: `open-pr`)
- Provide step-by-step CLI commands for GitHub/Vercel to update secrets. (Reply: `update-ci`)

**If you want me to continue, please pick one of the actions above.**
