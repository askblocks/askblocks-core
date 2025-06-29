#!/bin/bash

set -e

echo "🌀 Fetching upstream..."
git fetch upstream

echo "🔄 Rebasing on top of upstream/main..."
git rebase upstream/main

echo "✅ Fork is now up to date with upstream."
