# React Component Generator
A command-line tool to generate React components and their respective Jest and Enzyme-based unit test cases files. It allows users to pass various named arguments like the path of the component, the path of the test case file, the component type (either functional or class-based, defaults to functional), and the file type (jsx or tsx, defaults to jsx).

## Installation

Install the package globally using either of the following commands:


```
npm install -g react-component-generator
```
or
```
yarn global add react-component-generator
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
## License
ISC
