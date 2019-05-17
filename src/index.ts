import * as npm from '@samlanning/npm-registry-client';

const PACKAGES = ['npm-registry-client', '@synesthesia-project/light-desk', 'tree-sitter', 'express', 'something-non-existent'];

console.log ('hello world');

type PackageInfo =
{
  result: 'error';
  message: string;
} | {
  result: 'success';
  types: 'included' | 'definitely-typed' | 'none';
};

/**
 * Fetch the latest typescript information about a package
 *
 * @param pkg the name of the npm package
 */
async function getInfo(pkg: string): Promise<PackageInfo> {

  const data = await npm.getPackageMeta(pkg).catch(err => {
    if (err.statusCode !== 404) console.error(err);
    return null;
  });

  if (!data) return {
    result: 'error',
    message: 'Error getting package info'
  };

  const latest = data['dist-tags'].latest;
  const version = data.versions[latest];
  if (!version) return {
    result: 'error',
    message: 'Missing version'
  };
  if (!!version.types) {
    return {
      result: 'success',
      types: 'included'
    };
  } else {
    // Check definitely typed
    const dtPackage = await npm.getPackageMeta('@types/' + pkg).catch(err => {
      if (err.statusCode !== 404) console.error(err);
      return null;
    });
    if (dtPackage) {
      return {
        result: 'success',
        types: 'definitely-typed'
      };
    } else {
      return {
        result: 'success',
        types: 'none'
      };
    }
  }


}

async function printInfo(pkg: string) {
  const info = await getInfo(pkg);
  console.log(pkg, info);
}


PACKAGES.map(printInfo);
