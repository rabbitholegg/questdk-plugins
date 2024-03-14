const fs = require('fs');
const path = require('path');

// Process command line arguments
const fileToCopy = process.argv[2];
if (!fileToCopy) {
  console.log('Usage: node copyFileToDirs.js <path-to-file>');
  process.exit(1);
}

const directoriesToCheck = ['packages', 'apps']; // Directories to copy the file into

directoriesToCheck.forEach((dir) => {
  const baseDir = path.join(__dirname, '..', '..', '..', '..', dir);
  fs.readdir(baseDir, { withFileTypes: true }, (err, entries) => {
    if (err) {
      console.error(`Failed to read ${dir} directory:`, err);
      return;
    }

    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        const destPath = path.join(baseDir, entry.name, path.basename(fileToCopy));
        if (fs.existsSync(destPath)) {
          console.log(`File already exists in ${entry.name}, skipping...`);
          return;
        }
        fs.copyFile(fileToCopy, destPath, (copyErr) => {
          if (copyErr) {
            console.error(`Failed to copy file to ${entry.name}:`, copyErr);
          } else {
            console.log(`Copied ${fileToCopy} to ${entry.name}`);
          }
        });
      }
    });
  });
});
