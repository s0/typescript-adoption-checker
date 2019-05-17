import * as npm from '@samlanning/npm-registry-client';

const PACKAGES = ['npm-registry-client', '@synesthesia-project/core', 'tree-sitter', 'express'];

console.log ('hello world');

async function getInfo(pkg: string) {
  console.log('loading package info: ', pkg);

  const data = await npm.getPackageMeta(pkg);
  console.log(data);


}


PACKAGES.map(getInfo);
