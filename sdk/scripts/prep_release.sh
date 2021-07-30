#!/usr/bin/env bash
#!/bin/bash
#
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

TAGNAME=js-sdk_v"$PACKAGE_VERSION"

git push
git tag $TAGNAME
git push --tags
echo "Release tag created and pushed: $TAGNAME"

