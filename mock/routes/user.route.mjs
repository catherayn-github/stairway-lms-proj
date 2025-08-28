import users_data from "../data/user.data.mjs";
import {
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "../models/user.model.mjs";
export default function userRoutes(app) {
  app.get("/api/users", async (req, res) => {
    let users = [...users_data];
    users.sort((a, b) => a.last_name.localeCompare(b.last_name));
    const page = Number(req.query._page) || 1;
    const limit = Number(req.query._limit) || 10;

    const start = (page - 1) * limit;
    const end = start + limit;

    const users_page = users.slice(start, end);

    res.json({
      data: users_page,
      nextPage: end < users_data.length ? page + 1 : undefined,
      total: users_data.length,
    });
    // res.jsonp({ status: true, result: users, error: null });
  });
  app.get("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = getUserById(id);

    if (!user) {
      return res.jsonp({
        status: false,
        result: null,
        error: "User not found",
      });
    }

    res.jsonp({
      status: true,
      result: user,
      error: null,
    });
  });

  app.post("/api/users", async (req, res) => {
    const { first_name, last_name, role, email } = req.body;
    const new_user = addUser({ first_name, last_name, role, email });

    res.jsonp({
      status: true,
      result: new_user,
      error: null,
    });
  });

  app.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, role, email } = req.body;

    const updated_user = updateUser({
      id,
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
    const deleted_user = deleteUser(id);

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
