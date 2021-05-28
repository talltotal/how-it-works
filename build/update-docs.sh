# Prepare
rm -rf .vuepress/dist

# Build
yarn && yarn build

# Publish to GitHub Pages
cd .vuepress/dist
git init

# GitHub will only show you the token once, so be sure to copy it.
token=$GITHUB_TOKEN
if [ $token ];then
    git config --global user.email "talltotal@163.com"
    git config --global user.name "talltotal"
fi
git add -A
git commit -m '[vuepress] update docs'
if [ $token ];then
    DEPLOY_REPO="https://user:${token}@github.com/${GITHUB_REPOSITORY}.git"
    git push -f $DEPLOY_REPO master:gh-pages
else
    git push -f git@github.com:talltotal/how-it-works.git master:gh-pages
fi

# Cleanup
cd ../..
rm -rf .vuepress/dist
