const fs = require("fs");
const path = require("path");

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
    let viewTag = "div";
    let textTag = "h1";
    let additional = "";
    let reactNativeStyling = "";
if(isReactNative){

    viewTag = "View";
    textTag = "Text";
    additional = `import {View,Text,StyleSheet} from 'react-native';`;
    reactNativeStyling=`const styles=StyleSheet.create({
    })`;
}
    if (!fs.existsSync(componentPath)) {
        fs.mkdirSync(componentPath, {recursive: true});
    }

    let componentContent = "";

    if (fileType === "tsx") {
        if (componentType === "class") {
            componentContent = `import React, { Component } from 'react';
${additional}
interface ${componentName}Props {}

class ${componentName} extends Component<${componentName}Props> {
  render() {
    return (
      <${viewTag}>
        <${textTag}>${componentName}</${textTag}>
      </${viewTag}>
    );
  }
}
${reactNativeStyling}
export default ${componentName};
`;
        } else {
            componentContent = `import React from 'react';
${additional}
interface ${componentName}Props {}

const ${componentName}: React.FC<${componentName}Props> = () => {
  return (
      <${viewTag}>
        <${textTag}>${componentName}</${textTag}>
      </${viewTag}>
  );
};
${reactNativeStyling}

export default ${componentName};
`;
        }
    } else {
        if (componentType === "class") {
            componentContent = `import React, { Component } from 'react';
${additional}
class ${componentName} extends Component {
  render() {
    return (
      <${viewTag}>
        <${textTag}>${componentName}</${textTag}>
      </${viewTag}>
    );
  }
}
${reactNativeStyling}

export default ${componentName};
`;
        } else {
            componentContent = `import React from 'react';
${additional}
const ${componentName} = () => {
  return (
      <${viewTag}>
        <${textTag}>${componentName}</${textTag}>
      </${viewTag}>
  );
};
${reactNativeStyling}

export default ${componentName};
`;
        }
    }

    fs.writeFileSync(componentFile, componentContent);
}

function createTestFiles({
                             componentName,
                             componentDir = "./src/components",
                             fileType = "jsx",
                         }) {
    const componentPath = path.join(componentDir, componentName);
    const testFile = path.join(
        componentPath,
        `${componentName}.test.${fileType}`
    );

    const testContent = `import React from 'react';
import { shallow } from 'enzyme';
import ${componentName} from './${componentName}';

describe('<${componentName} />', () => {
  it('renders without crashing', () => {
    shallow(<${componentName} />);
  });
});
`;

    fs.writeFileSync(testFile, testContent);
}

function generateComponentAndTests(options) {
    createComponent(options);
    createTestFiles(options);
}

module.exports = {
    createComponent,
    createTestFiles,
    generateComponentAndTests,
};
