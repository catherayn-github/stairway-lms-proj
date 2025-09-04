/* PLUGINS */
import { dehydrate } from "@tanstack/react-query";

/*UTILITIES */
import getQueryClient from "@app/_utils/getQueryClient";

/* SERVICES */
import UserService from "@app/_services/user.service";

/* CONSTANTS */
import { CACHE_KEY_USER } from "@app/_constants/cache_key";

/* ENTITIES */
import { UserFiltersType } from "@app/_entities/types/user.type";
import { UsersPage } from "@app/_entities/interface/user.interface";
import { signOutUnauthenticatedUser } from "@app/_utils";

const userService = new UserService();

export const prefetchGetUsers = async (filters: UserFiltersType) => {
    try {
        const queryClient = getQueryClient();

        await queryClient.prefetchInfiniteQuery<UsersPage, Error>({
            queryKey: [...CACHE_KEY_USER, filters],
            queryFn: ({ pageParam = 1 }) =>
                userService.getUsers({ page: pageParam, filters }),
            getNextPageParam: (lastPage, allPages) =>
                lastPage.nextPage ? allPages.length + 1 : undefined,
        });

        return {
            dehydrated_state: dehydrate(queryClient),
        };
    } catch (error) {
        signOutUnauthenticatedUser(error);
    }
};
