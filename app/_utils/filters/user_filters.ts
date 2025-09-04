/* PLUGINS */
import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const UserFilters = {
    search: parseAsString,
    role: parseAsString,
    sort_name: parseAsString,
    sort_date_added: parseAsString,
    sort_added_by: parseAsString,
    sort_access: parseAsString,
};

export const UserSearchParamsCache = createSearchParamsCache(UserFilters);
