#!/bin/bash

# 1. Grab the current branch name automatically
CURRENT_BRANCH=$(git branch --show-current)
TARGET_BRANCH="feature/dev"

# 2. Check if we are already on the target branch to avoid loops
if [ "$CURRENT_BRANCH" == "$TARGET_BRANCH" ]; then
    echo "You are already on $TARGET_BRANCH!"
    exit 1
fi

echo "🚀 Shipping $CURRENT_BRANCH to $TARGET_BRANCH..."

# 3. The execution chain
git checkout $TARGET_BRANCH && \
git pull origin $TARGET_BRANCH && \
git merge $CURRENT_BRANCH && \
git push origin $TARGET_BRANCH && \
git checkout $CURRENT_BRANCH

# 4. Success message
if [ $? -eq 0 ]; then
    echo "✅ Successfully updated $TARGET_BRANCH and returned to $CURRENT_BRANCH."
else
    echo "❌ Something went wrong. Check for merge conflicts."
fi
