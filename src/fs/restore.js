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
  } catch {
    throw new Error("FS operation failed");
  }

  try {
    await fsp.mkdir(workspace_restored);
  } catch {
    throw new Error("FS operation failed");
  }

  try {
    for (const item of structure.entries) {
      const itemPath = path.join(workspace_restored, item.path);
      if (item.type === 'directory') {
        await fsp.mkdir(itemPath, {recursive: true});
      } else {
        await fsp.mkdir(path.dirname(itemPath), {recursive: true})
        const content = Buffer.from(item.content, "base64");
        await fsp.writeFile(itemPath, content);
      }
    }
    console.log("Successfully restored!")
  } catch {
    throw new Error("FS operation failed");
  }
};

await restore();
