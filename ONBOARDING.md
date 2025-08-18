## Onboarding: Local Dev + Git (Exhausted Rocket)

Use this as a quick copy/paste to run the site locally and push changes to GitHub.

### Prerequisites
- **Node**: 18.18+ (Node 20 LTS recommended)
- **npm**: 9+ (npm 10 recommended)
- **Git** installed and repo clone available

### Quick start (local dev)
```bash
# Go to the project
cd /Users/sharonchung/exhausted

# Install deps (first time or after updates)
npm install --no-fund --no-audit

# Start dev server (http://localhost:3000)
npm run dev
```

Open in browser:
```bash
open http://localhost:3000
```

Run a specific static game (example):
```bash
# Learn Cantonese game
open http://localhost:3000/games/learn-cantonese.html

# Toddler Types game
open http://localhost:3000/games/toddler-types.html
```

### Typical Git workflow (feature branch + PR)
```bash
cd /Users/sharonchung/exhausted

# Create a feature branch
git checkout -b feature/short-desc

# Stage and commit all changes
git add -A
git commit -m "<clear message>"

# Push to GitHub and set upstream
git push -u origin feature/short-desc
```

Then open a Pull Request on GitHub (replace placeholders):
`https://github.com/<owner>/<repo>/compare/feature/short-desc?expand=1`

If you prefer pushing directly to main (not recommended unless necessary):
```bash
git checkout main
git pull
git add -A
git commit -m "<clear message>"
git push
```

Check current remote settings:
```bash
git remote -v
# If you need to set the remote:
# git remote add origin git@github.com:<owner>/<repo>.git
```

### Production-like build (optional)
```bash
cd /Users/sharonchung/exhausted
npm run build
npm start  # serves the production build
```

### Notes
- Static games live in `public/games/`. Any `.html` placed there is served at `/games/<file>.html`.
- If the browser blocks audio/speech, interact with the page once (click/tap) and try again.
- If dependencies get out of sync, try a clean install: `rm -rf node_modules && npm install`.


