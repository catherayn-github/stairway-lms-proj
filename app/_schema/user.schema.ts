/* PLUGINS */
import { z } from "zod";
/* CONSTANTS */
import { ONE } from "@app/_constants";
import { RoleType } from "@app/_entities/enum/role.enum";


export const add_user_schema = z.object({
  first_name: z.string().min(ONE, "First name is required"),
  last_name: z.string().min(ONE, "Last name is required"),
  role: z.enum([RoleType.Admin, RoleType.Instructor, RoleType.Student, RoleType.ContactPerson], {
    required_error: "Role is required",
  }),
  email: z.string().min(ONE, "Email is required").email("Email is invalid"),
});

export const edit_user_schema = add_user_schema
  .pick({
    first_name: true,
    last_name: true,
    role: true,
    email: true,
  })
  .extend({
    id: z.string(),
  });
