import { z } from "zod";

const lettersOnlyRegex = /^[A-Za-z]+$/;

export const AddPlayerSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string at least 2 characters long with no numbers or special characters",
  }).min(2).regex(lettersOnlyRegex, {
    message: "Name must contain only letters (no numbers or special characters)"
  })
});