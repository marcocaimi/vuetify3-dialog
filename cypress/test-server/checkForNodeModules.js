//check if node_modules folder exists, and if not run npm install
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nodeModulesExists = fs.existsSync(path.join(__dirname, '/node_modules'));

if (!nodeModulesExists) {
  console.log('node_modules folder does not exist for cypress/server-test, npm install in progress...');
  exec('npm install', {}, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
}
