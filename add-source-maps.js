const fs = require('fs');
const path = require('path');

const distFolder = path.join(__dirname, 'dist'); // Update 'your-angular-project-name'

// Function to append sourceMappingURL
function appendSourceMappingURL(filePath, mapFilePath) {
  const sourceMappingURL = `//# sourceMappingURL=${path.basename(mapFilePath)}`;
  fs.appendFileSync(filePath, `\n${sourceMappingURL}`);
}

// Loop through each file in the dist directory
fs.readdirSync(distFolder).forEach(file => {
  const fullPath = path.join(distFolder, file);

  // If the file is a JavaScript file
  if (path.extname(file) === '.js') {
    const mapFilePath = `${fullPath}.map`;

    // Check if the corresponding source map exists
    if (fs.existsSync(mapFilePath)) {
      appendSourceMappingURL(fullPath, mapFilePath);
    }
  }
});
