/* PLUGINS */
import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { useQueryStates } from "nuqs";

/* ENTITIES */
import { User, UsersPage } from "@app/_entities/interface/user.interface";
import { HookCallbacks } from "@app/_entities/interface/api.interface";
import {
    AddUserData,
    EditUserData,
    UpdateUserRoleData,
    UserFiltersType,
} from "@app/_entities/types/user.type";

/* SERVICES */
import UserService from "@app/_services/user.service";

/* CONSTANTS */
import { CACHE_KEY_USER } from "@app/_constants/cache_key";

/* UTILITIES */
import { formatErrorMessage } from "@app/_utils";
import { UserFilters } from "@app/_utils/filters/user_filters";

const userService = new UserService();

/**
 * DOCU: Hook for managing user filters using Nuqs.
 * @returns Query state for user filters
 * @author Catherine
 * Last updated date: August 27, 2025
 */

export const useUserFilters = () => {
    return useQueryStates(UserFilters);
};

/**
 * DOCU: Hook for fetching users with infinite scrolling, filters, and pagination.
 * @param {object} param0 - Hook parameters
 * @param {UserFiltersType} param0.filters - Filters for fetching users
 * @returns Infinite query object containing users data and pagination info
 * @author Catherine
 * Last updated date: August 27, 2025
 */
export const useGetUsers = ({ filters }: { filters: UserFiltersType }) => {
    return useInfiniteQuery<UsersPage, Error>({
        queryKey: [...CACHE_KEY_USER, filters],
        queryFn: ({ pageParam = 1 }) =>
            userService.getUsers({ page: pageParam, filters }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.nextPage ? allPages.length + 1 : undefined;
        },
    });
};

/**
 * DOCU: Hook for adding a new user.
 * @param {HookCallbacks<User>} param0 - Callback hooks for success or error
 * @returns Mutation object with `addUser` function
 * @author Catherine
 * Last updated date: August 27, 2025
 */
export const useAddUser = ({
    onSuccess,
    onError,
}: HookCallbacks<User> = {}) => {
    const queryClient = useQueryClient();

    const { mutate: addUser, ...rest } = useMutation({
        mutationFn: ({ data }: { data: AddUserData }) =>
            userService.addUser({ data }),
        onSuccess(data) {
            onSuccess?.(data!);
            queryClient.invalidateQueries({ queryKey: CACHE_KEY_USER });
        },
        onError(error) {
            onError?.(formatErrorMessage(error));
        },
    });

    return { addUser, ...rest };
};

/**
 * DOCU: Hook for editing an existing user.
 * @param {HookCallbacks<User>} param0 - Callback hooks for success or error
 * @returns Mutation object with `editUser` function
 * @author Catherine
 * Last updated date: August 27, 2025
 */
export const useEditUser = ({
    onSuccess,
    onError,
}: HookCallbacks<User> = {}) => {
    const queryClient = useQueryClient();

    const { mutate: editUser, ...rest } = useMutation({
        mutationFn: ({ data }: { data: EditUserData | UpdateUserRoleData }) =>
            userService.editUser({ data }),
        onSuccess(data) {
            onSuccess?.(data!);
            queryClient.invalidateQueries({ queryKey: CACHE_KEY_USER });
        },
        onError(error) {
            onError?.(formatErrorMessage(error));
        },
    });

    return { editUser, ...rest };
};

/**
 * DOCU: Hook for deleting a user.
 * @param {HookCallbacks<Pick<User, "id">>} param0 - Callback hooks for success or error
 * @returns Mutation object with `deleteUser` function
 * @author Catherine
 * Last updated date: August 27, 2025
 */
export const useDeleteUser = ({
    onSuccess,
    onError,
}: HookCallbacks<Pick<User, "id">> = {}) => {
    const queryClient = useQueryClient();

    const { mutate: deleteUser, ...rest } = useMutation({
        mutationFn: ({ id }: { id: string }) => userService.deleteUser({ id }),
        onSuccess(data) {
            onSuccess?.(data!);
            queryClient.invalidateQueries({ queryKey: CACHE_KEY_USER });
        },
        onError(error) {
            onError?.(formatErrorMessage(error));
        },
    });

    return { deleteUser, ...rest };
};
