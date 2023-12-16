#!/bin/bash

npm run build
cp ./src/index.html ./dist/index.html

# Specify the file path
file_path="./dist/index.html"

# Use sed to replace "./dist" with an empty string
sed -i 's|./dist||g' "$file_path"