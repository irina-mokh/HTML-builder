const fs = require('fs');
const path = require('path');
const bundle = path.join(__dirname, './project-dist/bundle.css');

fs.access( bundle, err=>{
  if (err) {

  } else {
    fs.unlink(bundle, err=>{
      if (err) {console.error(err)}
    })
  }
  bundleCss();
})

function bundleCss(){
  const output = fs.createWriteStream(bundle,'utf-8');
  fs.readdir(path.join(__dirname, './styles'), {withFileTypes: true}, (err, files)=>{
    if (err) {console.error(err)}
    files.forEach(file=>{
      let extension = path.extname(file.name).toString().slice(1);
      fs.readFile(path.join(__dirname, './styles', file.name),'utf-8', (err, data)=>{
        if (err) {console.error(err)};
        let content = data;
        if (file.isFile() && extension === 'css') {
          fs.appendFile(bundle,`\n${content}`, (err)=>{
            if (err) {console.error(err)}
          })
        }
      });
    })
  });
}