import { z } from 'zod';

/**
 * Schéma de validation pour la mise à jour d'un utilisateur
 * Valide les champs optionnels : pseudo, bio, ville, email, photo de profil et statut de bannissement
 */
export const updateUserSchema = z.object({
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
