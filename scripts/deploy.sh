#!/usr/bin/env bash

#codeclimate-test-reporter < build/coverage/lcov.info
#cat build/coverage/lcov.info | node_modules/.bin/codecov

set -e;

bash ./scripts/build.sh;

cd build/documentation;
git init;

git config user.name "SkelwareBOT";
git config user.email "bot@skelware.com";

git add .;
git commit -m "Deploy ${TRAVIS_TAG}";

git push --force --quiet "https://${GITHUB_TOKEN}@${MY_REPO_HOST}${MY_REPO_SLUG}" master:gh-pages > /dev/null 2>&1;
