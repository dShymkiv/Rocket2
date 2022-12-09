const fs = require('node:fs');
const path = require('node:path');

const boys = path.join(__dirname, 'boys');
const girls = path.join(__dirname, 'girls');

function moveByTheGender(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      return console.log(err);
    }

    files.forEach(file => {
      fs.readFile(path.join(dir, file), (err, data) => {
        if (err) {
          return console.log(err);
        }

        let user = JSON.parse(data.toString());
        if (user.gender === 'female') {
          fs.rename(path.join(dir, file), path.join(girls, file), err => {
            if (err) {
              return console.log(err);
            }
          });
        } else {
          fs.rename(path.join(dir, file), path.join(boys, file), err => {
            if (err) {
              return console.log(err);
            }
          });
        }
      });
    });
  });
}

moveByTheGender(boys);
moveByTheGender(girls);
