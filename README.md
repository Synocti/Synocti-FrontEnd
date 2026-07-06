# synocti.ca

### Setup

## Deployment (GitHub Pages via GitHub Actions)

Deployment is fully automated.

1. Push to `main`.
2. GitHub Actions runs [deploy-pages.yml](.github/workflows/deploy-pages.yml).
3. The app is built and deployed to GitHub Pages.

To trigger manually from the GitHub UI, use the `workflow_dispatch` action in the same workflow.

## Local build

```bash
npm install
npm run build -- --configuration production --base-href=/
```

## Notes

- Canonical production domain: `https://synocti.ca/`
- `synocti.com` should remain a 301 redirect to `synocti.ca` at DNS/hosting level.
- The site uses `public/CNAME` for the custom domain.
