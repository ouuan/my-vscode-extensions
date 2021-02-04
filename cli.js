#!/usr/bin/env node

/**
* @license
* Copyright 2021 Yufan You
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

const neodoc = require('neodoc');
const fs = require('fs');

const { genMyVSCodeExtensions } = require('./lib');

const { version } = require('./package.json');

const args = neodoc.run(`List your installed VS Code extensions in a Markdown file.

Usage:
  my-vscode-extensions [options]

Options:
  -c, --code=<code> The command of VS Code. [default: code] [env: CODE]
  -o, --output=<output> Output to the given file, instead of stdout.`, { version });

const {
  '--code': code,
  '--output': outputFile,
} = args;

genMyVSCodeExtensions(code).then((output) => {
  if (outputFile) {
    fs.writeFile(outputFile, output, () => {});
  } else {
    process.stdout.write(output);
  }
});
