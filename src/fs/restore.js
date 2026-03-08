import path from 'node:path';
import fsp from 'node:fs/promises';

const rootPath = path.join(import.meta.dirname);
const snapshotPath = path.join(rootPath, '../../snapshot.json');
const workspace_restored = path.join(rootPath, '../../workspace_restored');

const restore = async () => {
  let structure;

  try {
    const snap = await fsp.readFile(snapshotPath, {encoding: 'utf8'});
    structure = JSON.parse(snap);
    console.log(structure);
  } catch {
    throw new Error("FS operation failed");
  }

  try {
    await fsp.mkdir(workspace_restored);
  } catch {
    throw new Error("FS operation failed");
  }

  try {
    // for (item of structure) {
    //   console.log('item:', item);
    // }
  } catch {
    throw new Error("FS operation failed");
  }
};

await restore();
