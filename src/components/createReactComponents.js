const fs = require("fs");
const path = require("path");

function createComponent({
  componentName,
  componentDir = "./src/components",
  componentType = "function",
  fileType = "jsx",
}) {
  const componentPath = path.join(componentDir, componentName);
  const componentFile = path.join(
    componentPath,
    `${componentName}.${fileType}`
  );

  if (!fs.existsSync(componentPath)) {
    fs.mkdirSync(componentPath, { recursive: true });
  }

  let componentContent = "";

  if (fileType === "tsx") {
    if (componentType === "class") {
      componentContent = `import React, { Component } from 'react';

interface ${componentName}Props {}

class ${componentName} extends Component<${componentName}Props> {
  render() {
    return (
      <div>
        <h1>${componentName}</h1>
      </div>
    );
  }
}

export default ${componentName};
`;
    } else {
      componentContent = `import React from 'react';

interface ${componentName}Props {}

const ${componentName}: React.FC<${componentName}Props> = () => {
  return (
    <div>
      <h1>${componentName}</h1>
    </div>
  );
};

export default ${componentName};
`;
    }
  } else {
    if (componentType === "class") {
      componentContent = `import React, { Component } from 'react';

class ${componentName} extends Component {
  render() {
    return (
      <div>
        <h1>${componentName}</h1>
      </div>
    );
  }
}

export default ${componentName};
`;
    } else {
      componentContent = `import React from 'react';

const ${componentName} = () => {
  return (
    <div>
      <h1>${componentName}</h1>
    </div>
  );
};

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
