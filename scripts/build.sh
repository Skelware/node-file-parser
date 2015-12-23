#!/usr/bin/env bash

set -e;

if [ "$TRAVIS_REPO_SLUG" == "$MY_REPO_SLUG" ] && [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_TAG" ];
    then
        echo "Deploying v${TRAVIS_TAG}!";
    else
        echo "This build does not require deployment.";
        exit 0;
fi;

grunt build;
