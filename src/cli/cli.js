#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const {generateComponentAndTests} = require('../index');
let defaultFileType = "jsx";
let isReactNative = false;
const isReactProject = () => {
    const packageJsonPath = path.join(process.cwd(), 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
        console.error('Error: package.json not found. Please run the script in a React project.');
        return false;
    }

    const packageJson = require(packageJsonPath);
    const {dependencies, devDependencies} = packageJson;

    if ((dependencies && dependencies['react-native'])) {
        isReactNative=true;
    }
    if (!(dependencies && dependencies.react) && !(devDependencies && devDependencies.react)) {
        console.error('Error: react not found in package.json. Please ensure this is a React project.');
        return false;
    }
    if (dependencies && dependencies.typescript || devDependencies && devDependencies.typescript) {
        defaultFileType = 'tsx';
    }
    return true;
};

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
        default: defaultFileType ?? "jsx",
    })
    .option("css", {
        alias: "c",
        type: "boolean",
        description: "Need css file or not",
        default: false,
    })
    .option("style-type", {
        alias: "s",
        type: "string",
        description: "Type of css file (module,scss,less,sass)",
        default: "module",
    })
    .demandOption(["name"], "Please provide a component name")
    .help().argv;
const sanitizeAndConvertToTitleCase = str => {
    // Step 1: Remove special characters and convert first letter after every special character to uppercase
    str = str.replace(/[^A-Za-z0-9](\S)/g, function(letter1, letter2){
        return letter2.toUpperCase()
    });

    // Step 2: Convert the first character of the overall string to uppercase
    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
};

const options = {
    componentName: sanitizeAndConvertToTitleCase(argv.name),
    componentDir: argv.dir,
    componentType: argv.type,
    fileType: argv["file-type"],
    css:argv['css'],
    cssType:argv['style-type'],
    isReactNative
};

generateComponentAndTests(options);
