const fs = require('node:fs').promises;
const path = require('node:path');

const usersPath = path.join(process.cwd(), "db", "users.json");

async function usersList () {
  const users = await fs.readFile(usersPath);

  if (!users?.length) {
    throw new Error ("Not found");
  }

  return JSON.parse(users);
}

async function findUserById(userId) {
  const users = await usersList();

  for (const user of users) {
    if (user.id === +userId) {
      return user;
    }
  }
  throw new Error ("User doesn't exists");
}

async function addUser({name, email, phone}) {
  const users  = await usersList();
  const lastUser = users[users.length - 1];

  const newUser = {
    id: (lastUser.id + 1),
    name,
    email,
    phone,
  };

  const isUserNameExists = users.find(user => user.name === name);

  if (isUserNameExists) {
    throw new Error ("User with this name already exists");
  }

  users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

  return newUser;
}

async function removeUser(userId) {
  await findUserById(+userId); // method includes check on existing user

  const users = await usersList();

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (user.id === +userId) {
      users.splice(i, 1);
      i--;
    }
  }
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
}

async function updateUser(userId, body) {
  await findUserById(+userId); // method includes check on existing user

  const users = await usersList();
  let updateUser;

  for (let i = 0; i < users.length ; i++) {
    if (users[i].id === +userId) {
      if (body.name?.length) {
        users[i].name = body.name;
      }
      if (body.email?.length) {
        users[i].email = body.email;
      }
      if (body.phone?.length) {
        users[i].phone = body.phone;
      }
      await fs.writeFile(usersPath, JSON.stringify(users, null, 2))
      updateUser = users[i];
    }
  }

  return updateUser;
}

module.exports = {
  usersList,
  findUserById,
  addUser,
  removeUser,
  updateUser,
}
