import { User, UsersPage } from "@app/_entities/interface/user.interface";
import {
    AddUserData,
    EditUserData,
    UpdateUserRoleData,
    UserFiltersType,
} from "@app/_entities/types/user.type";
import APIClient from "@app/_utils/apiClient";

class UserService extends APIClient {
    constructor() {
        super("/users");
    }

    /**
     * DOCU: Get a paginated list of users with optional filters and sorting.
     * @param {object} param0 - Parameters for fetching users
     * @param {number} param0.page - Current page number
     * @param {UserFiltersType} param0.filters - Filters including search, role, and sorting options
     * @returns {Promise<UsersPage>} Promise resolving to a paginated list of users
     * @author Catherine
     * Last updated date: August 27, 2025
     * @trigger API endpoint: GET /users
     */

    getUsers = async ({
        page,
        filters,
    }: {
        page: number;
        filters: UserFiltersType;
    }) => {
        try {
            const res = await this.get<UsersPage>(`/`, {
                params: {
                    _page: page,
                    search: filters.search ?? undefined,
                    role: filters.role ?? undefined,
                    sort_name: filters.sort_name ?? undefined,
                    sort_date_added: filters.sort_date_added ?? undefined,
                    sort_added_by: filters.sort_added_by ?? undefined,
                    sort_access: filters.sort_access ?? undefined,
                },
            });
            if (res.error) {
                throw res.error;
            }
            if (!res.result) {
                throw new Error("No users data received from server");
            }
            return res.result;
        } catch (error) {
            throw error;
        }
    };

    /**
     * DOCU: Add a new user
     * @param {object} param0 - Parameter object
     * @param {AddUserData} param0.data - Data of the user to add
     * @returns {Promise<User>} Promise resolving to the newly created user
     * @author Catherine
     * Last updated date: August 27, 2025
     * @trigger API endpoint: POST /users
     */
    addUser = async ({ data }: { data: AddUserData }) => {
        try {
            const res = await this.post<User>(`/`, data);
            if (res.error) throw res.error;
            return res.result;
        } catch (error) {
            throw error;
        }
    };

    /**
     * DOCU: Edit an existing user
     * @param {object} param0 - Parameter object
     * @param {EditUserData} param0.data - Data to update the user, must include `id`
     * @returns {Promise<User>} Promise resolving to the updated user
     * @author Catherine
     * Last updated date: August 27, 2025
     * @trigger API endpoint: PUT /users/:id
     */
    editUser = async ({
        data,
    }: {
        data: EditUserData | UpdateUserRoleData;
    }) => {
        try {
            const { id, ...rest } = data;
            const res = await this.put<User>(`/${id}`, rest);
            if (res.error) throw res.error;
            return res.result;
        } catch (error) {
            throw error;
        }
    };

    /**
     * DOCU: Delete a user by ID
     * @param {object} param0 - Parameter object
     * @param {string} param0.id - User ID
     * @returns {Promise<Pick<User, "id">>} Promise resolving to the deleted user ID
     * @author Catherine
     * Last updated date: August 27, 2025
     * @trigger API endpoint: DELETE /users/:id
     */
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
