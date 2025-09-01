/* PLUGINS */
import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const UserFilters = {
  search: parseAsString,
  role: parseAsString, 
  sortName: parseAsString, 
  sortDateAdded: parseAsString, 
  sortAddedBy: parseAsString, 
  sortAccess: parseAsString 
};

export const UserSearchParamsCache = createSearchParamsCache(UserFilters);
