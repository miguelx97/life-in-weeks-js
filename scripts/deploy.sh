#!/bin/bash

npm run build
cp ./src/index.html ./dist/index.html

# Remove the prefix of the path
file_path="./dist/index.html"
sed -i 's|./dist||g' "$file_path"

cp ./i18n ./dist/i18n -r

file_path="./dist/js/app.js"
sed -i 's|\.\./\.\./i18n/|\.\./i18n/|g' "$file_path"

# Push to the deploy branch
git subtree push --prefix dist origin deploy