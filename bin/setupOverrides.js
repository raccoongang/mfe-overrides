#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const diff = require('diff');

// Define the file names to merge
const fileNames = [
  'webpack.dev.config.js',
  'webpack.prod.config.js',
  'webpack.dev-stage.config.js',
];

// Loop through the file names
fileNames.forEach((fileName) => {
  const overrideFilePath = path.join(__dirname, `../${fileName}`);
  const repositoryFilePath = path.join(process.cwd(), fileName);

  // Check if the repository file exists
  if (fs.existsSync(repositoryFilePath)) {
    // Repository file exists, merge with override file
    const overrideContent = fs.readFileSync(overrideFilePath, 'utf8');
    const repositoryContent = fs.readFileSync(repositoryFilePath, 'utf8');

    // Use diff.structuredPatch to create a merge
    const mergePatch = diff.structuredPatch(
      fileName,
      fileName,
      repositoryContent,
      overrideContent,
      '',
      '',
      { }
    );
    console.log(mergePatch.hunks[0].lines)

    // Run through lines in mergePatch and clean lines from diff indicators
    let result = []
    mergePatch.hunks.forEach(hunk => {
      hunk.lines.forEach(line => {
        const lineWithoutMinus = line.replace(/^-(.*)/, '$1');
        const lineWithoutPlus = lineWithoutMinus.replace(/^\+(.*)/, '$1');
        const lineWithoutSpace = lineWithoutPlus.replace(/^(\s)(?!\s)(.*)/, '$2');
        result.push(lineWithoutSpace);
      })
    })

    // Write the merged content back to the repository file
    fs.writeFileSync(repositoryFilePath, result.join('\n'), 'utf8');
  } else {
    // Repository file does not exist, copy the override file
    fs.copyFileSync(overrideFilePath, repositoryFilePath);
  }
});
