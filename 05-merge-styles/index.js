const fs = require('fs');
const path = require('path');
const { stdout } = process;
fs.unlink(path.join(__dirname, './project-dist/bundle.css'), err=>{
  if (err) {console.error(err)}
  bundleCss();
})

function bundleCss(){
  fs.readdir(path.join(__dirname, './styles'), {withFileTypes: true}, (err, files)=>{
    if (err) {console.error(err)}
    files.forEach(file=>{
      let extension = path.extname(file.name).toString().slice(1);
      let content = '';
      fs.readFile(path.join(__dirname, './styles', file.name),'utf-8', (err, data)=>{
        if (err) {console.error(err)};
        let content = data;
        if (file.isFile() && extension === 'css') {
          fs.appendFile(path.join(__dirname, './project-dist/bundle.css'),`\n${content}`, (err)=>{
            if (err) {console.error(err)}
          });
        }
      });
    })
  });
}




