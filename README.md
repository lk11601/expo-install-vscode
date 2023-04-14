# Expo Package Installer

A Visual Studio Code extension that installs Expo packages when clicking on a yellow globe above import statements in JavaScript and React Native JavaScript files.

## Features

- Automatically detects import statements for external packages in `.js` and `.jsx` files.
- Provides a yellow globe (CodeLens action) above each import statement for external packages not already included in your project's `package.json`.
- Installs the corresponding Expo package when clicking on the yellow globe using the `npx expo install [package]` command.
- Displays a notification when the package installation is complete.

## Usage

1. Open a JavaScript or React Native JavaScript file (`.js` or `.jsx`).
2. Look for a yellow globe above import statements for external packages that are not already included in your project's `package.json`.
3. Click on the yellow globe to install the corresponding Expo package using the `npx expo install [package]` command.
4. A notification will appear when the package installation is complete.

## Requirements

- Visual Studio Code 1.75 or newer
- Node.js and npm installed
- An Expo project

## Installation

To install the extension, follow the steps below:

1. Download the `.vsix` file for the Expo Package Installer extension.
2. Open Visual Studio Code and navigate to the Extensions view (`Ctrl+Shift+X`).
3. Click on the ellipsis (three dots) in the top right corner and choose "Install from VSIX..." from the context menu.
4. Locate the `.vsix` file you downloaded and click "Install." The extension will now be installed and available for use in your VSCode instance.

## Known Issues

- The extension does not currently support TypeScript files (`.ts` and `.tsx`). Support for these file types can be added by modifying the extension's language configuration in `package.json`.

## Contributing

If you encounter any issues or have feature suggestions, please write your own extension! I wrote this extension to learn how to write VSCode extensions and I'm not planning on maintaining it. I'm happy to answer questions about how the extension works, but I won't be accepting pull requests because I don't know Git.

## License

MIT? I don't know. Do whatever you want with it.
