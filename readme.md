# React Component Generator
The react-component-generator is a command-line tool that streamlines the process of creating React components and their associated Jest and Enzyme-based unit test case files. The tool accepts various named arguments such as the component path, test case file path, component type (functional or class-based, defaulting to functional), and file type (jsx or tsx, defaulting to jsx). The package is designed to enhance productivity, enforce best practices, and maintain a consistent project structure.

## Features:

- Generates both functional and class-based React components.
- Creates Jest and Enzyme-based unit test case files for each generated component.
- Supports both JavaScript (JSX) and TypeScript (TSX) file formats.
- Customizable component and test case file paths.
- CLI-based tool for easy integration into your development workflow.

The package can be easily installed and utilized in any React-based project, ensuring that developers can quickly and efficiently generate components and test case files without the need for manual boilerplate code creation.
## Installation

Install the package globally using either of the following commands:


```
npm i react-component-generator-with-jest
```
or
```
yarn global add react-component-generator-with-jest
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
