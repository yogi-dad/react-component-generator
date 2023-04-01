# React Component Generator
The react-component-generator is a command-line tool that streamlines the process of creating React components and their associated Jest and Enzyme-based unit test case files. The tool accepts various named arguments such as the component path, test case file path, component type (functional or class-based, defaulting to functional), and file type (jsx or tsx, defaulting to jsx). The package is designed to enhance productivity, enforce best practices, and maintain a consistent project structure.
## Features:
* Generates both functional and class-based React components.
* Creates Jest and Enzyme-based unit test case files for each generated component.
* Supports both JavaScript (JSX) and TypeScript (TSX) file formats.
* Customizable component and test case file paths.
* CLI-based tool for easy integration into your development workflow.

The package can be easily installed and utilized in any React or React Native-based project, ensuring that developers can quickly and efficiently generate components and test case files without the need for manual boilerplate code creation.
## Prerequisites
Before using this package, ensure that you have the following dependencies installed in your React or React Native project:

* React
* Jest
* Enzyme
* Babel (for React projects)
* TypeScript (if using TSX file format)

## Installation

Install the package globally using either of the following commands:


```
npm i react-component-generator-with-jest
```
or
```
yarn global add react-component-generator-with-jest
```
## Setup Jest for React and React Native
1. Install Jest and the necessary dependencies:
```
npm install --save-dev jest babel-jest @babel/core @babel/preset-env @babel/preset-react enzyme enzyme-adapter-react-16 enzyme-to-json react-test-renderer
```
or

```
yarn add -D jest babel-jest @babel/core @babel/preset-env @babel/preset-react enzyme enzyme-adapter-react-16 enzyme-to-json react-test-renderer
```
2. Create a .babelrc file in your project root with the following content:
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
3. Create a jest.config.js file in your project root with the following content:
```
module.exports = {
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['./setupTests.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
```
4. Create a setupTests.js file in your project root with the following content:
```
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
```
## React Native
1. Install Jest and the necessary dependencies:

```
npm install --save-dev jest jest-expo react-native react-test-renderer @babel/core @babel/plugin-transform-runtime babel-jest
```
or
```
yarn add -D jest jest-expo react-native react-test-renderer @babel/core @babel/plugin-transform-runtime babel-jest
```
2. In package.json and add the following:
```
"json":{
    "preset": "jest-expo",
        "transform": {
          "^.+\\.[t|j]sx?$": "babel-jest"
        },
        "transformIgnorePatterns": [
          "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|native-notify)"
        ]
}
```
3. and in package.json in scripts object add:
```
"test":"jest"
```
## Usage
After installation, you can use the react-component-generator command in your terminal to create React components and test files. Pass the various options as arguments:

```
react-component-generator -n MyComponent -t function -f jsx
```
This command will create a functional React component named "MyComponent" with a .jsx file type.

## Options
- -n, --name <name>: The component name (required)
- -d, --dir <path>: The path for the component (default: "./src/components")
- -t, --type <type>: The component type, either "class" or "function" (default: "function")
- -f, --file-type <fileType>: The file type, either "jsx" or "tsx" (default: "jsx")
## Example
To create a class-based React component named "MyComponent" with a .tsx file type in the ./src/customComponents directory, run:
```
react-component-generator -n MyComponent -d ./src/customComponents -t class -f tsx
```
## Report Issues
if you encounter any issues or have suggestions for improvements, please report them using the GitHub Issues page for the react-component-generator-with-jest repository. This will help us address any problems and continue to enhance the package.

To report an issue or make a suggestion, follow these steps:
* Visit the GitHub Issues page for the react-component-generator-with-jest repository: https://github.com/your-username/react-component-generator-with-jest/issues
* Click the "New Issue" button.
* Choose the appropriate issue template, such as "Bug Report" or "Feature Request."
* Fill out the required information in the template, providing as much detail as possible to help us understand and resolve the issue.
* Click "Submit New Issue" to create the issue.

We appreciate your feedback and will do our best to address any issues or implement suggested improvements in a timely manner.

Thank you for using the React Component Generator with Jest and contributing to its ongoing development!
## License
ISC
