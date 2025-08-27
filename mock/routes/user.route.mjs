import users_data from "../data/user.data.mjs";
import { addUser, updateUser, deleteUser } from "../models/user.model.mjs";
export default function userRoutes(app) {
  app.get("/api/users", async (req, res) => {
    let users = [...users_data];
    users.sort((a, b) => a.last_name.localeCompare(b.last_name));
    res.jsonp({ status: true, result: users, error: null });
  });

  app.post("/api/users", (req, res) => {
    const { first_name, last_name, role, email } = req.body;
    const new_user = addUser({ first_name, last_name, role, email });

    res.jsonp({
      status: true,
      result: new_user,
      error: null,
    });
  });

  app.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, role, email } = req.body;

    const updated_user = updateUser({
      id: Number(id),
      data: { first_name, last_name, role, email },
    });

    if (!updated_user) {
      return res.jsonp({
        status: false,
        result: null,
        error: "User not found",
      });
    }

    res.jsonp({
      status: true,
      result: updated_user,
      error: null,
    });
  });

  app.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const deleted_user = deleteUser(Number(id));

    if (!deleted_user) {
      return res.jsonp({
        status: false,
        result: null,
        error: "User not found",
      });
    }

    res.jsonp({
      status: true,
      result: deleted_user.id,
      error: null,
    });
  });
}
