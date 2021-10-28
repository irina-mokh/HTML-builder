const fs = require('fs');
const path = require('path');
const { stdout } = process;

stdout.write('Hello! Enter you text to save in text.txt\n');

const output = fs.createWriteStream(path.join(__dirname, './text.txt'),'utf-8');

process.stdin.on('data', data=> {
  (data.toString().trim() ==='exit') ? process.emit('SIGINT') : output.write(data);
});

output.on('error', error => console.log('Error', error.message));
process.on('SIGINT', ()=>{
  stdout.write('See you!\n'); 
  process.exit();
});