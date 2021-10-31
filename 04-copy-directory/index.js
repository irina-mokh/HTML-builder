const fs = require('fs');
const path = require('path');
const { stdout } = process;



fs.mkdir(path.join(__dirname, 'files-copy'),{recursive: true}, (err)=>{
  if (err) {console.error(err)}
})

fs.readdir(path.join(__dirname, './files-copy'), {withFileTypes: true}, (err, files)=>{
  if (err) {
    console.error(err);
    return;
  }
  files.forEach(file=>{
    fs.unlink(path.join(__dirname, './files-copy', file.name), err=>{
      if (err) {console.error(err)}
    })
  })
  copyDir();
});

function copyDir() {
  console.log('copyDir run');
  fs.readdir(path.join(__dirname, './files'), {withFileTypes: true}, (err, files)=>{
    if (err) {console.error(err)}
    files.forEach(file=>{
      fs.copyFile(path.join(__dirname, './files', file.name), path.join(__dirname, './files-copy', file.name), (err)=>{
        if (err) {
          console.error(err);
          return;
        }
      })
    })
  })
}

