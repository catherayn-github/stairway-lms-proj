import { login_schema } from "@app/_schema/auth.schema";
import { z } from "zod";

export type LoginFormData = z.infer<typeof login_schema>;