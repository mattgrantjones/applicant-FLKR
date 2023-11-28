import { z } from "zod"

export const applicantSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  mobile: z
    .string({ required_error: "Mobile number is required" })
    .min(10, "At least 10 digits required")
    .regex(
      RegExp(
        /^(?:\+?61|0)4 ?(?:(?:[0-9] ?[0-9]|2 ?[0-9]|3 ?[0-9]|4 ?[0-9]|5 ?[018]) ?[0-9]|3 ?0 ?[0-5])(?: ?[0-9]){5}$/
      ),
      "Mobile number is invalid"
    ),
  email: z.string().email("Email address is invalid"),
  isPrimary: z.boolean(),
})

export const formSchema = z
  .object({
    applicants: z.array(applicantSchema),
  })
  .superRefine((data, ctx) => {
    if (data.applicants.filter((applicant) => applicant.isPrimary).length > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only one primary applicant is allowed",
        path: [`applicants[${data.applicants.length - 1}].isPrimary`],
      })
    }

    if (data.applicants.filter((applicant) => applicant.isPrimary).length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select a primary applicant",
        path: ["applicants[0].isPrimary"],
      })
    }
  })

// .refine(
//   (data) =>
//     data.applicants.filter((applicant) => applicant.isPrimary).length < 2,
//   (data) => ({
//     message: "Only one primary applicant is allowed",
//     path: [`applicants[${data.applicants.length - 1}].isPrimary`],
//   })
