#!/usr/bin/env bash

set -e;

if [ "$TRAVIS_REPO_SLUG" == "$MY_REPO_SLUG" ] && [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_TAG" ];
    then
        echo "Deploying v${TRAVIS_TAG}!";
    else
        echo "This build does not require deployment.";
        exit 0;
fi;

bash ./scripts/build.sh;

cd build/documentation;
git init;

git config user.name "SkelwareBOT";
git config user.email "bot@skelware.com";

git add .;
git commit -m "Deploy ${TRAVIS_TAG}";

git push --force --quiet "https://${GITHUB_TOKEN}@${MY_REPO_HOST}${MY_REPO_SLUG}" master:gh-pages > /dev/null 2>&1;
