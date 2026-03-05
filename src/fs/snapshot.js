// import {readdir, readFile} from 'node:fs/promises';
import fsPromises from 'node:fs/promises';
import path from 'node:path';

const snapshot = async () => {
  // Write your code here
  // Recursively scan workspace directory
  // Write snapshot.json with:
  // - rootPath: absolute path to workspace
  // - entries: flat array of relative paths and metadata

  try {
    const folder = path.join(import.meta.dirname, '../../workspace');
    const res = await fsPromises.readdir(folder);
    console.log(res);
  } catch (error) {
    console.log("FS error:", error.message);
  }

  try {
    const data = {
      "rootPath": "/absolute/path/to/workspace",
      "entries": [
        { "path": "file1.txt", "type": "file", "size": 1024, "content": "base64" },
        { "path": "nested", "type": "directory" }
      ]
    };
    const testJson = JSON.stringify(data, null, 2);
    await fsPromises.writeFile("snapshot.json", testJson);
    console.log("Snapshot is saved successfully!");
  }
  catch (error){
    console.error("FS error:", error.message);
  }

};

await snapshot();
