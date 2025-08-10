import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';

let baseDir = process.cwd(); // start in current folder

const [,, command, ...args] = process.argv;

async function listFiles() {
  const files = await fs.readdir(baseDir);
  console.log(`Contents of ${baseDir}:`);
  files.forEach(f => console.log(' -', f));
}

async function changeDir(folderName) {
  const targetPath = path.resolve(baseDir, folderName);
  try {
    const stats = await fs.stat(targetPath);
    if (stats.isDirectory()) {
      baseDir = targetPath;
      console.log(`Changed directory to: ${baseDir}`);
    } else {
      console.error(`${folderName} is not a directory.`);
    }
  } catch (err) {
    console.error(`Error changing directory: ${err.message}`);
  }
}

async function makeDir(folderName) {
  try {
    const folderPath = path.join(baseDir, folderName);
    await fs.mkdir(folderPath, { recursive: true });
    console.log(`Folder '${folderName}' created.`);
  } catch (err) {
    console.error(`Error creating folder: ${err.message}`);
  }
}

async function removeDir(folderName) {
  try {
    const folderPath = path.join(baseDir, folderName);
    await fs.rmdir(folderPath, { recursive: true });
    console.log(`Folder '${folderName}' removed.`);
  } catch (err) {
    console.error(`Error removing folder: ${err.message}`);
  }
}

async function readFile(fileName) {
  try {
    const filePath = path.join(baseDir, fileName);
    const data = await fs.readFile(filePath, 'utf8');
    console.log(`\n--- ${fileName} ---\n${data}`);
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
  }
}

async function writeFile(fileName, content) {
  try {
    const filePath = path.join(baseDir, fileName);
    await fs.writeFile(filePath, content);
    console.log(`File '${fileName}' written.`);
  } catch (err) {
    console.error(`Error writing file: ${err.message}`);
  }
}

async function appendFile(fileName, content) {
  try {
    const filePath = path.join(baseDir, fileName);
    await fs.appendFile(filePath, content);
    console.log(`Appended to '${fileName}'.`);
  } catch (err) {
    console.error(`Error appending file: ${err.message}`);
  }
}

async function deleteFile(fileName) {
  try {
    const filePath = path.join(baseDir, fileName);
    await fs.unlink(filePath);
    console.log(`File '${fileName}' deleted.`);
  } catch (err) {
    console.error(`Error deleting file: ${err.message}`);
  }
}

async function copyFile(src, dest) {
  try {
    const srcPath = path.join(baseDir, src);
    const destPath = path.join(baseDir, dest);
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath);
    readStream.pipe(writeStream).on('finish', () => {
      console.log(`File '${src}' copied to '${dest}'.`);
    });
  } catch (err) {
    console.error(`Error copying file: ${err.message}`);
  }
}

async function moveFile(src, dest) {
  try {
    const srcPath = path.join(baseDir, src);
    const destPath = path.join(baseDir, dest);
    await fs.rename(srcPath, destPath);
    console.log(`File '${src}' moved/renamed to '${dest}'.`);
  } catch (err) {
    console.error(`Error moving file: ${err.message}`);
  }
}

// Router
(async () => {
  switch (command) {
    case 'list': await listFiles(); break;
    case 'cd': await changeDir(args[0]); break;
    case 'mkdir': await makeDir(args[0]); break;
    case 'rmdir': await removeDir(args[0]); break;
    case 'read': await readFile(args[0]); break;
    case 'write': await writeFile(args[0], args.slice(1).join(' ')); break;
    case 'append': await appendFile(args[0], args.slice(1).join(' ')); break;
    case 'delete': await deleteFile(args[0]); break;
    case 'copy': await copyFile(args[0], args[1]); break;
    case 'move': await moveFile(args[0], args[1]); break;
    default:
      console.log(`Unknown command: ${command}`);
      console.log(`Commands:
        list
        cd <folder>
        mkdir <folder>
        rmdir <folder>
        read <file>
        write <file> <text>
        append <file> <text>
        delete <file>
        copy <src> <dest>
        move <src> <dest>
      `);
  }
})();
