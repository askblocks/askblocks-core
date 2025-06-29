#!/bin/bash

set -e

echo "🌀 Fetching upstream..."
git fetch upstream

echo "🔄 Rebasing on top of upstream/main..."
git rebase upstream/main

echo "🚀 Pushing rebased branch to origin..."
git push origin main --force-with-lease

echo "✅ Fork is now up to date with upstream and pushed."
