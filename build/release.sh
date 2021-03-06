git checkout master
git merge develop

#!/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # build
  npm version $VERSION --no-git-tag-version
  VERSION=$VERSION yarn lib

  # commit
  git tag v$VERSION
  npm run changelog
  git commit -am "release: $VERSION"

  # publish
  git push origin master
  git push origin refs/tags/v$VERSION
  git checkout develop
  git rebase master
  git push origin develop

  echo "Create dist to Musely-doc!"
  yarn publish:docs
fi

echo "Enter npm publish!"