import {
    add_user_schema,
    edit_user_schema,
    update_user_role_schema,
} from "@app/_schema/user.schema";
import { UserFilters } from "@app/_utils/filters/user_filters";
import { inferParserType } from "nuqs";
import { z } from "zod";

export type UserFiltersType = inferParserType<typeof UserFilters>;
export type AddUserData = z.infer<typeof add_user_schema>;
export type EditUserData = z.infer<typeof edit_user_schema>;
export type UpdateUserRoleData = z.infer<typeof update_user_role_schema>;
