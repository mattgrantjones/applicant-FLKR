import { z } from "zod"

export const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  mobile: z
    .string()
    .min(10, "Mobile number is required")
    .regex(
      RegExp(
        /^(?:\+?61|0)4 ?(?:(?:[01] ?[0-9]|2 ?[0-9]|3 ?[0-9]|4 ?[0-9]|5 ?[018]) ?[0-9]|3 ?0 ?[0-5])(?: ?[0-9]){5}$/
      ),
      "Mobile number is invalid"
    ),
  email: z.string().email("Email address is invalid"),
})
