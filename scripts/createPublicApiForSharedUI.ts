import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();
const uiPath = path.resolve(__dirname, '..', 'src', 'shared', 'ui');
const sharedUIDirectory = project.getDirectory(uiPath);

const componentsDirs = sharedUIDirectory?.getDirectories();
console.log('uiPath', uiPath);
function isAbsolutePath(value: string) {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
  return layers.some((layer) => value.startsWith(layer));
}

componentsDirs?.forEach((directory) => {
  const indexFilePath = `${directory.getPath()}/index.ts`;
  const indexFile = directory.getSourceFile(indexFilePath);

  if (!indexFile) {
    const sourceCode = `export * from './${directory.getBaseName()}';\n`;
    const file = directory.createSourceFile(indexFilePath, sourceCode, {
      overwrite: true
    });

    file.save();
  }
});

files.forEach((file) => {
  const importDeclarations = file.getImportDeclarations();
  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();
    const valueWithoutAlias = value.replace('@/', '');
    const segments = valueWithoutAlias.split('/');
    const isSharedLayer = segments[0] === 'shared';
    const isUISlice = segments[1] === 'ui';

    if (isAbsolutePath(valueWithoutAlias) && isSharedLayer && isUISlice) {
      const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
      importDeclaration.setModuleSpecifier(`@/${result}`);
    }
  });
});

project.save();
