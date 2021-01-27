# Prepare
rm -rf .vuepress/dist

# Build
yarn && yarn build

# Publish to GitHub Pages
cd .vuepress/dist
git init
git add -A
git commit -m '[vuepress] update docs'
if [[ -z "$ACCESS_TOKEN" ]];then
    git push -f git@github.com:talltotal/how-it-works.git master:gh-pages
else
    git push -f --force https://${ACCESS_TOKEN}@github.com/${GITHUB_REPOSITORY}.git master:gh-pages
fi

# Cleanup
cd ../..
rm -rf .vuepress/dist
