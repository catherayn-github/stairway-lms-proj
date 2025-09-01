
import {
  addUser,
  updateUser,
  deleteUser,
  getUsers,
} from "../models/user.model.mjs";
export default function userRoutes(app) {
  app.get("/api/users", async (req, res) => {

    const page = Number(req.query._page) || 1;
    const limit = Number(req.query._limit) || 50;
    const { search, role, sortName, sortDateAdded, sortAddedBy, sortAccess } = req.query;

    const users = getUsers(page, limit, search, role, sortName, sortDateAdded, sortAddedBy, sortAccess);
    const UsersPage = {
      result: users.data,
      nextPage: page * limit < users.totalCount ? page + 1 : undefined,
      total: users.totalCount,
    }
    res.json({
      status: true,
      result : UsersPage,
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
