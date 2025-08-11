const fs = require('fs/promises');
const path = require('path');

const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');

async function organizeFiles() {
  try {
    // Read all files in input folder
    const files = await fs.readdir(inputDir);

    for (const file of files) {
      const filePath = path.join(inputDir, file);

      // Skip directories (only handle files)
      const stats = await fs.stat(filePath);
      if (!stats.isFile()) continue;

      // Get file extension (without the dot)
      const ext = path.extname(file).toLowerCase().slice(1);

      // Decide target folder
      let folderName;
      if (['jpg', 'png', 'gif'].includes(ext)) {
        folderName = 'images';
      } else if (['txt', 'md'].includes(ext)) {
        folderName = 'texts';
      } else {
        folderName = 'others';
      }

      // Make sure target folder exists
      const targetFolder = path.join(outputDir, folderName);
      await fs.mkdir(targetFolder, { recursive: true });

      // Move file
      const targetPath = path.join(targetFolder, file);
      await fs.rename(filePath, targetPath);

      console.log(`Moved ${file} → ${folderName}/`);
    }

    console.log('Organizing complete!');
  } catch (err) {
    console.error('Error:', err);
  }
}

organizeFiles();
