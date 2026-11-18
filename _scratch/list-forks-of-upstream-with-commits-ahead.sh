#!/usr/bin/env bash
# Lists every fork of an upstream GitHub repository and, for each, how many commits it has beyond the upstream's
# default branch (on the fork's own default branch), plus its last push time, stars and description.
# Usage: _scratch/list-forks-of-upstream-with-commits-ahead.sh [owner/repo]   (default Noniv/abyssal-garden)
set -euo pipefail
UPSTREAM_REPO="${1:-Noniv/abyssal-garden}"
UPSTREAM_BRANCH=$(gh api "repos/$UPSTREAM_REPO" -q .default_branch)
echo "upstream $UPSTREAM_REPO ($UPSTREAM_BRANCH)"
gh api --paginate "repos/$UPSTREAM_REPO/forks?per_page=100" \
  -q '.[] | [.full_name, .default_branch, .pushed_at, .stargazers_count, (.description // "")] | @tsv' |
while IFS=$'\t' read -r FORK_NAME FORK_BRANCH PUSHED STARS DESCRIPTION; do
  FORK_OWNER="${FORK_NAME%%/*}"
  COMPARE=$(gh api "repos/$UPSTREAM_REPO/compare/$UPSTREAM_BRANCH...$FORK_OWNER:$FORK_BRANCH" \
    -q '"\(.ahead_by) ahead, \(.behind_by) behind"' 2>/dev/null || echo "compare failed")
  printf '%s\t%s\t%s\tstars %s\t%s\n' "$FORK_NAME" "$COMPARE" "$PUSHED" "$STARS" "$DESCRIPTION"
done
