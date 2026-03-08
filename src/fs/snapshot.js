import fsPromises from 'node:fs/promises';
import path from 'node:path';

const snapshot = async () => {
  const rootPath = path.join(import.meta.dirname, '../../workspace');
  const data = {
    rootPath,
    entries: []
  };

  try {
    const res = await fsPromises.readdir(rootPath, {recursive: true});

    for (const item of res) {
      const pathToFolder = path.join(rootPath, item);
      const stat = await fsPromises.stat(pathToFolder);

      const isFile = stat.isFile();

      const entry = {
        'path': item,
        'type': isFile ? 'file' : 'directory'
      };

      if (isFile) {
        const content = await fsPromises.readFile(pathToFolder, {encoding: 'base64'});
        entry.content = content;
        entry.size = stat.size;
      }

      data.entries.push(entry);
    }

  } catch (error) {
    throw new Error("FS operation failed");
  }

  try {
    const testJson = JSON.stringify(data, null, 2);
    await fsPromises.writeFile("snapshot.json", testJson);
    console.log("Snapshot is saved successfully!");
  }
  catch (error){
    throw new Error ("FS operation failed");
  }
};

await snapshot();
