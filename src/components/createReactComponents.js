const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

function createComponent({
                             componentName,
                             componentDir = "./src/components",
                             componentType = "function",
                             fileType = "jsx",
                             isReactNative = false
                         }) {
    const componentPath = path.join(componentDir, componentName);
    const componentFile = path.join(
        componentPath,
        `${componentName}.${fileType}`
    );

    if (!fs.existsSync(componentPath)) {
        fs.mkdirSync(componentPath, {recursive: true});
    }


    /*if (fileType === "tsx") {
        if (componentType === "class") {
            componentContent = ``;
        } else {
            componentContent = ``;
        }
    } else {
        if (componentType === "class") {
            componentContent = ``;
        } else {
            componentContent = ``;
        }
    }*/
    const ejsFilePath = path.join(__dirname, "templates", "component.ejs");
    ejs.renderFile(ejsFilePath, {
        componentName,
        componentType,
        isReactNative,
        fileType,
    }, (error, componentContent) => {
        if (!error) {
            fs.writeFileSync(componentFile, format(componentContent));
        } else {
            console.error(error)
        }
    })
}

function createTestFiles({
                             componentName,
                             componentType,
                             componentDir = "./src/components",
                             fileType = "jsx",
                             isReactNative = false
                         }) {
    const componentPath = path.join(componentDir, componentName);
    const testFile = path.join(
        componentPath,
        `${componentName}.test.${fileType}`
    );

    const ejsFilePath = path.join(__dirname, "templates", "test.ejs");
    ejs.renderFile(ejsFilePath, {
        componentName,
        componentType,
        isReactNative,
        fileType,
    }, (error, testContent) => {
        if (!error) {
            fs.writeFileSync(testFile, format(testContent));
        } else {
            console.error(error)
        }
    });
}

function createCSSFiles({
                            componentName,
                            componentDir = "./src/components",
                            cssType = 'module',
                            isReactNative = false
                        }) {
    const componentPath = path.join(componentDir, componentName);
    const cssFile = path.join(
        componentPath,
        `${componentName}.${cssType === 'module' ? '.module.css' : cssType}`
    );


    fs.writeFileSync(cssFile, '/*styling goes here*/');

}

async function generateComponentAndTests(options) {
    createComponent(options);
    createTestFiles(options);
    if (options.css && !options.isReactNative)
        createCSSFiles(options);
}

const format = (output) => {
    return output.split('\n').map(line => line.trim()).join('\n').trim();

}
module.exports = {
    createComponent,
    createTestFiles,
    generateComponentAndTests,
};
