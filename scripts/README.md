# Node File Parser Scripts

## Table of contents
* Node File Parser Scripts
 * [Build](#build)
 * [Deploy](#deploy)

## Build
All building is done by Grunt, the bash script acts as a wrapper.

Builds are only started when all of the following conditions are met:
* The commit contains a tag;
* The current branch is the master branch;
* The current repository is not a fork of the main repository.

## Deploy
After a successful build, a new git repository is created with a bot user. The files that were built are then committed and pushed by the bot to the gh-pages branch.
