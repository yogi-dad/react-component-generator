#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { generateComponentAndTests } = require('../index');
let defaultFileType = "jsx";
function isReactProject() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.error('Error: package.json not found. Please run the script in a React project.');
    return false;
  }

  const packageJson = require(packageJsonPath);
  const { dependencies, devDependencies } = packageJson;

  if (!(dependencies && dependencies.react) && !(devDependencies && devDependencies.react)) {
    console.error('Error: react not found in package.json. Please ensure this is a React project.');
    return false;
  }
if(dependencies && dependencies.typescript || devDependencies && devDependencies.typescript){
  defaultFileType='tsx';
}
  return true;
}

if (!isReactProject()) {
  process.exit(1);
}


const argv = yargs(hideBin(process.argv))
  .option("name", {
    alias: "n",
    type: "string",
    description: "Component name",
  })
  .option("dir", {
    alias: "d",
    type: "string",
    description: "Component path",
    default: "./src/components",
  })
  .option("type", {
    alias: "t",
    type: "string",
    description: "Component type (class or function)",
    default: "function",
  })
  .option("file-type", {
    alias: "f",
    type: "string",
    description: "File type (jsx or tsx)",
    default: defaultFileType??"jsx",
  })
  .demandOption(["name"], "Please provide a component name")
  .help().argv;

const options = {
  componentName: argv.name,
  componentDir: argv.dir,
  componentType: argv.type,
  fileType: argv["file-type"],
};

generateComponentAndTests(options);
