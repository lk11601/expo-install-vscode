const vscode = require("vscode");
const cp = require("child_process");

function installExpoPackage(packageName) {
  return new Promise((resolve, reject) => {
    const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;

    cp.exec(
      `npx expo install ${packageName}`,
      { cwd: workspaceFolder },
      (error, stdout, stderr) => {
        if (error) {
          vscode.window.showErrorMessage(`Got the error: ${stderr}`);
          reject(error);
        } else {
          resolve(stdout);
        }
      }
    );
  });
}

// function activate(context) {
//   let disposable = vscode.commands.registerCommand(
//     "extension.installExpoPackage",
//     async () => {
//       const editor = vscode.window.activeTextEditor;
//       if (!editor) {
//         vscode.window.showErrorMessage("No active text editor found.");
//         return;
//       }

//       const lineText = editor.document.lineAt(
//         editor.selection.active.line
//       ).text;
//       // const packageName = lineText.match(/("|')([^"']+)("|')/)?.[2];
//       const packageName = lineText.match(/("|')([^"']+)("|')/)[2];

//       if (!packageName) {
//         vscode.window.showErrorMessage(
//           "Could not find package name in the selected line."
//         );
//         return;
//       }

//       try {
//         await installExpoPackage(packageName);
//         vscode.window.showInformationMessage(
//           `Package ${packageName} has been installed.`
//         );
//       } catch (error) {
//         vscode.window.showErrorMessage(
//           `Failed to install package ${packageName}: ${error.message}`
//         );
//       }
//     }
//   );

//   context.subscriptions.push(disposable);
// }

const fs = require("fs");
const path = require("path");

class ExpoPackageCodeLensProvider {
  provideCodeLenses(document) {
    const codeLenses = [];

    // Read package.json dependencies
    const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const packageJsonPath = path.join(workspaceFolder, "package.json");
    let dependencies = [];
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      dependencies = Object.keys(packageJson.dependencies || {}).concat(
        Object.keys(packageJson.devDependencies || {})
      );
    }

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);

      if (line.text.includes("import")) {
        const match = line.text.match(/from\s+("|')(?!\.?\/|\/)([^"']+)("|')/);
        const packageName = match ? match[2] : null;
        if (packageName && !dependencies.includes(packageName)) {
          const range = new vscode.Range(i, 0, i, line.text.length);
          const command = {
            title: "Install Expo Package",
            command: "extension.installExpoPackage",
            arguments: [line.text],
          };
          codeLenses.push(new vscode.CodeLens(range, command));
        }
      }
    }
    return codeLenses;
  }
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "extension.installExpoPackage",
      async (lineText) => {
        const match = lineText.match(/from\s+("|')([^"']+)("|')/);
        const packageName = match && match[2];

        if (!packageName) {
          vscode.window.showErrorMessage(
            "Could not find package name in the selected line."
          );
          return;
        }

        try {
          vscode.window.showInformationMessage(
            `Attempting to install ${packageName}.`
          );
          await installExpoPackage(packageName);
          vscode.window.showInformationMessage(
            `Package ${packageName} has been installed.`
          );
        } catch (error) {
          vscode.window.showErrorMessage(
            `Failed to install package ${packageName}: ${error.message}`
          );
        }
      }
    )
  );

  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider(
      { language: "javascript" },
      new ExpoPackageCodeLensProvider()
    )
  );
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
