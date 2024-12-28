import { z } from 'zod';

export const updateUserSchema = z.object({
  //good
  body: z.object({
    pseudo: z.string().min(1, 'Le pseudo ne doit pas être vide').optional(),
    bio: z.string().optional(),
    city: z.string().optional(),
    email: z
      .string()
      .email('Email invalide')
      .optional()
      .refine(val => val === undefined || val.trim() !== '', "L'email ne doit pas être vide"),
    profilePhoto: z
      .string()
      .optional()
      .refine(val => val === undefined || val.trim() !== '', 'La photo de profil ne doit pas être vide'),
    isBan: z.boolean().optional()
  })
});
