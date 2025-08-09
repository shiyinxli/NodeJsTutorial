import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'test.txt');

async function main() {
  // Step 1: Create and write to a file
  await fs.writeFile(filePath, 'Hello, Node.js FS!\n');
  console.log('File created and written.');

  // Step 2: Append to the file
  await fs.appendFile(filePath, 'Appending a new line.\n');
  console.log('Appended to file.');

  // Step 3: Read the file
  const data = await fs.readFile(filePath, 'utf8');
  console.log('File content:\n', data);

  // Step 4: Rename the file
  const newFilePath = path.join(process.cwd(), 'renamed.txt');
  await fs.rename(filePath, newFilePath);
  console.log('File renamed.');

  // Step 5: Delete the file
//   await fs.unlink(newFilePath);
//   console.log('File deleted.');

// Create folder
const folderPath = path.join(process.cwd(), 'myFolder');
await fs.mkdir(folderPath, { recursive: true });
console.log('Folder created.');

// Create some files inside
await fs.writeFile(path.join(folderPath, 'a.txt'), 'File A');
await fs.writeFile(path.join(folderPath, 'b.txt'), 'File B');

// Read folder contents
const files = await fs.readdir(folderPath);
console.log('Files in folder:', files);

}

main().catch(console.error);
