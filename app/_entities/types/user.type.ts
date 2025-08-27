import { add_user_schema, edit_user_schema } from "@app/_schema/user.schema";
import { z } from "zod";

export type AddUserData = z.infer<typeof add_user_schema>;
export type EditUserData = z.infer<typeof edit_user_schema>;