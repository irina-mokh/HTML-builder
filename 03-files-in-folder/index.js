const fs = require('fs');
const path = require('path');
const { stdout } = process;

fs.readdir(path.join(__dirname, './secret-folder'), {withFileTypes: true}, (err, files)=>{
  if (err) {
    console.error(err);
    return;
  }
  files.forEach(file=>{
    if (file.isFile()) {
      let name = file.name.toString().slice(0, file.name.indexOf('.'));
      let ext = path.extname(file.name).toString().slice(1);
      let size = 0;

      fs.stat(path.join(__dirname, './secret-folder', file.name), getSize);

      function getSize(err, data) {
        if (err) {
          console.error(err);
          return;
        }
        size = (data.size / 1024);
        stdout.write(`${name} - ${ext} - ${size}kb \n`);
      };
    }
  });
});