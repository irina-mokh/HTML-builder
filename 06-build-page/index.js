const fs = require('fs');
const path = require('path');

// delete + create project-dist
fs.rm( path.join(__dirname,'./project-dist'),{ recursive: true }, err=>{
  if (err) {console.error(err)} 

  fs.mkdir(path.join(__dirname,'./project-dist'),{recursive: true}, (err)=>{
    if (err) {console.error(err)}

    const dist = path.join(__dirname, './project-dist');
    // copy template to dist as index.html 
    fs.copyFile(path.join(__dirname, './template.html'), path.join(dist, 'index.html'), (err)=>{
      if (err) {console.error(err);}
      buildHtml();
      copyFolder(path.join(__dirname, './assets'), path.join(dist, './assets'));
      bundleCss();
    })
  });
});

async function buildHtml(){
  fs.readFile(path.join(__dirname, './project-dist/index.html'), async (err, data)=>{
    if (err) {throw err;}

    let html = data.toString();
    const tags = html.match(/{{.+}}/gi);
    let result = await setComponents();

    async function setComponents(){
      for (let item of tags){
        let tag = item.slice(2, -2);
        let component = await fs.promises.readFile(path.join(__dirname, './components', `${tag}.html`));
        
        html = html.replace(item, component.toString());
      }
      return html;
    }
    fs.writeFile(path.join(__dirname, './project-dist/index.html'), result, err=>{
      if (err) {console.error(err);}
    });
  })
}

//bundle css
function bundleCss(){
  fs.readdir(path.join(__dirname, './styles'), {withFileTypes: true}, (err, files)=>{
    if (err) {console.error(err)}
    files.forEach(file=>{
      let extension = path.extname(file.name).toString().slice(1);
      fs.readFile(path.join(__dirname, './styles', file.name),'utf-8', (err, data)=>{
        if (err) {console.error(err)};
        let content = data;
        if (file.isFile() && extension === 'css') {
          fs.appendFile(path.join(__dirname, './project-dist/style.css'),`\n${content}`, (err)=>{
            if (err) {console.error(err)}
          });
        }
      });
    })
  });
}

//copy directory
function copyFolder (origDir, copyDir) {
  fs.mkdir(copyDir,{recursive: true}, (err)=>{
    if (err) {console.error(err)}
    fs.readdir(origDir, {withFileTypes: true}, (err, items)=>{
      if (err) {console.error(err)}
      items.forEach((item)=>{
        copyItem(item, origDir, copyDir)
      });
    })
  });
}

function copyItem(item, origDir, copyDir){
  if (item.isFile()) {
    fs.copyFile(path.join(origDir, item.name), path.join(copyDir, item.name), (err)=>{
      if (err) {console.error(err);}
    })
  } else {
    copyFolder(path.join(origDir, item.name), path.join(copyDir, item.name))
  }
}