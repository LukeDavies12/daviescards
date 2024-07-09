import { z } from "zod";

const lettersOnlyRegex = /^[A-Za-z]+$/;

export const GameSchema = z.object({
  date: z.date(),
  participants: z.string().refine(value => value.split(',').every(participant => lettersOnlyRegex.test(participant.trim())), {
    message: "Participants must be a comma-separated list of names containing only letters"
  }),
  second: z.string().regex(lettersOnlyRegex, {
    message: "Second place name must contain only letters (no numbers or special characters)"
  }),
  second_score: z.number().min(10, {
    message: "Second place score must be a number with at least 2 digits"
  }),
  third: z.string().regex(lettersOnlyRegex, {
    message: "Third place name must contain only letters (no numbers or special characters)"
  }),
  third_score: z.number().min(10, {
    message: "Third place score must be a number with at least 2 digits"
  }),
  winner: z.string().regex(lettersOnlyRegex, {
    message: "Winner name must contain only letters (no numbers or special characters)"
  }),
  winner_score: z.number().min(10, {
    message: "Winner score must be a number with at least 2 digits"
  })
});

