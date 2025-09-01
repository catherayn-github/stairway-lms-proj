import users_data from "../data/user.data.mjs";
let current_id = users_data.length;

/**
 * DOCU: Get paginated users with optional filters and sorting
 * @param {number} page - Current page number
 * @param {number} limit - Number of users per page
 * @param {string} [search] - Optional search term for first or last name
 * @param {string} [role] - Optional role filter
 * @param {"asc"|"desc"} [sortName="asc"] - Sort by last name
 * @param {"asc"|"desc"} [sortDateAdded] - Sort by date added
 * @param {"asc"|"desc"} [sortAddedBy] - Sort by added by
 * @param {"asc"|"desc"} [sortAccess] - Sort by role/access
 * @returns {{ data: Array, totalCount: number }} - Paginated and filtered users
 * @author Catherine
 * Last updated date: August 27, 2025
 * @trigger API endpoint: GET /api/users
 */
export const getUsers = (
  page,
  limit,
  search,
  role,
  sortName = "asc",
  sortDateAdded,
  sortAddedBy,
  sortAccess
) => {
  let filtered = [...users_data];

 
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchLower) ||
        user.last_name.toLowerCase().includes(searchLower)
    );
  }

 
 if (role) {
    filtered = filtered.filter((user) => user.role === role);
  }


  if (sortName) {
    filtered.sort((a, b) =>
      sortName === "asc"
        ? a.last_name.localeCompare(b.last_name)
        : b.last_name.localeCompare(a.last_name)
    );
  }

  if (sortDateAdded) {
    filtered.sort((a, b) =>
      sortDateAdded === "asc"
        ? new Date(a.date_added) - new Date(b.date_added)
        : new Date(b.date_added) - new Date(a.date_added)
    );
  }

  if (sortAddedBy) {
    filtered.sort((a, b) =>
      sortAddedBy === "asc"
        ? a.added_by.localeCompare(b.added_by)
        : b.added_by.localeCompare(a.added_by)
    );
  }

  if (sortAccess) {
    filtered.sort((a, b) =>
      sortAccess === "asc"
        ? a.role.localeCompare(b.role)
        : b.role.localeCompare(a.role)
    );
  }

 
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: filtered.slice(start, end),
    totalCount: filtered.length,
  };
};

/**
 * DOCU: Add a new user to the system
 * @param {object} param0 - User data
 * @param {string} param0.first_name - First name
 * @param {string} param0.last_name - Last name
 * @param {string} param0.role - User role
 * @param {string} param0.email - User email
 * @returns {object} The newly created user object
 * @author Catherine
 * Last updated date: August 27, 2025
 * @trigger API endpoint: POST /api/users
 */
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

  return newUser;
};

/**
 * DOCU: Update an existing user by ID
 * @param {object} param0 - Update data
 * @param {string} param0.id - User ID
 * @param {object} param0.data - Data to update
 * @param {string} param0.data.first_name - First name
 * @param {string} param0.data.last_name - Last name
 * @param {string} param0.data.role - Role
 * @param {string} param0.data.email - Email
 * @returns {object|undefined} Updated user object or undefined if not found
 * @author Catherine
 * Last updated date: August 27, 2025
 * @trigger API endpoint: PUT /api/users/:id
 */
export const updateUser = ({
  id,
  data: { first_name, last_name, role, email },
}) => {
  
  const user_index = users_data.findIndex((user) => {;

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

/**
 * DOCU: Delete a user by ID
 * @param {string} id - User ID
 * @returns {object|undefined} Deleted user object or undefined if not found
 * @author Catherine
 * Last updated date: August 27, 2025
 * @trigger API endpoint: DELETE /api/users/:id
 */
export const deleteUser = (id) => {
  const user_index = users_data.findIndex((user) => user.id === id);
  if (user_index === -1) return undefined;

  const deletedUser = users_data.splice(user_index, 1);
  return deletedUser[0];
};
