#!/usr/bin/env bash
# For each fork named on the command line (owner/repo), prints the commits it has beyond Noniv/abyssal-garden main
# (title only), the files those commits changed, its homepage / GitHub Pages address if any, and its README's first lines.
# Usage: _scratch/show-commit-messages-of-forks-ahead-of-upstream.sh owner/repo [owner/repo ...]
set -uo pipefail
UPSTREAM_REPO="Noniv/abyssal-garden"
for FORK_NAME in "$@"; do
  FORK_OWNER="${FORK_NAME%%/*}"
  FORK_BRANCH=$(gh api "repos/$FORK_NAME" -q .default_branch)
  echo "=================== $FORK_NAME ($FORK_BRANCH)"
  gh api "repos/$FORK_NAME" -q '"homepage: \(.homepage // "-")  description: \(.description // "-")"'
  gh api "repos/$FORK_NAME/pages" -q '"pages: \(.html_url)"' 2>/dev/null || echo "pages: none"
  gh api "repos/$UPSTREAM_REPO/compare/main...$FORK_OWNER:$FORK_BRANCH" \
    -q '(.commits[] | "  * " + (.commit.message | split("\n")[0])), "  files: " + ([.files[].filename] | join(", "))' 2>/dev/null
done
