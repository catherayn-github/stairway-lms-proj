/* PLUGINS */
import { z } from "zod";

export const login_schema = z.object({
	email_address: z.string(),
	password: z.string(),
});