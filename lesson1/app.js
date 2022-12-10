const fs = require('node:fs').promises;
const path = require('node:path');

const boys = path.join(__dirname, 'boys');
const girls = path.join(__dirname, 'girls');

async function moveByTheGender (dir) {
  try {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const user = await fs.readFile(path.join(dir, file));

      if (JSON.parse(user).gender === 'female') {
        await fs.rename(path.join(dir, file), path.join(girls, file));
      } else {
        await fs.rename(path.join(dir, file), path.join(boys, file));
      }
    }
  }catch (err) {
    return console.log(err);

  }
}

moveByTheGender(boys);
moveByTheGender(girls);
