import users_data from "../data/user.data.mjs";
let current_id = users_data.length;

export const getUserById = (id) => {
  return users_data.find((user) => user.id === id);
};

export const addUser = ({ first_name, last_name, role, email }) => {
  const newUser = {
    id: (++current_id).toString(),
    first_name,
    last_name,
    role,
    email,
    added_by: "Admin Admin",
    date_added: new Date().toISOString().split("T")[0],
  };

  users_data.push(newUser);

  console.log(users_data);

  return newUser;
};

export const updateUser = ({
  id,
  data: { first_name, last_name, role, email },
}) => {
  
  const user_index = users_data.findIndex((user) => {
    console.log(user.id);
    console.log(id);
    console.log(typeof(user.id));
    console.log(typeof(id));
   console.log("debugdebug", user.id == id);

    return user.id === id} );
  if (user_index === -1) return undefined;

  users_data[user_index] = {
    ...users_data[user_index],
    first_name,
    last_name,
    role,
    email,
  };

  return users_data[user_index];
};

export const deleteUser = (id) => {
  const user_index = users_data.findIndex((user) => user.id === id);
  if (user_index === -1) return undefined;

  const deletedUser = users_data.splice(user_index, 1);
  return deletedUser[0];
};
