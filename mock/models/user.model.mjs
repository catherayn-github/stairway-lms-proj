let current_id = 1000;
import users_data from "../data/user.data.mjs";

export const addUser = ({ first_name, last_name, role, email }) => {
  const newUser = {
    id: current_id++,
    first_name,
    last_name,
    role,
    email,
    added_by: "Admin Admin",
    date_added: new Date().toISOString().split("T")[0],
  };

  users_data.push(newUser);

  return newUser;
};


export const updateUser = ({ id, data: { first_name, last_name, role, email } }) => {
  const user_index = users.findIndex((user) => user.id === id);
  if (user_index === -1) return undefined;

  users[user_index] = {
    ...users[user_index], 
    first_name,
    last_name,
    role,
    email,
  };

  return users[user_index];
};


export const deleteUser = (id) => {
  const user_index = users.findIndex((user) => user.id === id);
  if (user_index === -1) return undefined;

  const deletedUser = users.splice(user_index, 1);
  return deletedUser[0];
};
