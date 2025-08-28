import { User } from "@app/_entities/interface/user.interface";
import { AddUserData, EditUserData } from "@app/_entities/types/user.type";
import APIClient from "@app/_utils/apiClient";

class UserService extends APIClient {
  constructor() {
    super("/users");
  }

  /**
   * DOCU: Get the list of inventory records.
   * @returns {Promise<User[]>} A promise with the list of inventories.
   * @author Catherine
   * Last updated date: August 19, 2025
   */
 
 getUsers = async ({ page = 1, limit = 50 }) => {
  try {
    const res = await this.get<User[]>(`/`, {
      // if using axios, params go here
      params: { page, limit },
    });

    if (res.error) throw res.error;

    // expect backend to return { result: User[], nextPage }
    return res.result;
  } catch (error) {
    throw error;
  }
};


  getUser = async ({ id }: Pick<User, "id">) => {
    try {
      const res = await this.get<User>(`/${id}`);
      if (res.error) {
        throw res.error;
      }
      return res?.result;
    } catch (error) {
      throw error;
    }
  };

  addUser = async ({ data }: { data: AddUserData }) => {
    try {
      const res = await this.post<User>(`/`, data);
      if (res.error) throw res.error;
      return res.result;
    } catch (error) {
      throw error;
    }
  };

  editUser = async ({ data }: { data: EditUserData }) => {
    try {
      const { id, ...rest } = data;
      const res = await this.put<User>(`/${id}`, rest);
      if (res.error) throw res.error;
      return res.result;
    } catch (error) {
      throw error;
    }
  };

  deleteUser = async ({ id }: Pick<User, "id">) => {
    try {
      const res = await this.delete<Pick<User, "id">>(`/${id}`);
      if (res.error) throw res.error;
      return res.result;
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;
