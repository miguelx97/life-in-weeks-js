#!/bin/bash

npm run build
cp ./src/index.html ./dist/index.html

# Remove the prefix of the path
file_path="./dist/index.html"
sed -i 's|./dist||g' "$file_path"

# Copy the i18n folder from root to the dist folder
mkdir -p ./dist/i18n/ && cp -r ./i18n/* ./dist/i18n/

file_path="./dist/js/bundle/app.js"
sed -i 's|\.\./\.\./i18n/|\./i18n/|g' "$file_path"

git commit -am "Deploy"
git push origin main

# Push to the deploy branch
git subtree push --prefix dist origin deploy