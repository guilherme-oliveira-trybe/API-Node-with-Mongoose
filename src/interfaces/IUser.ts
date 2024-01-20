import { z } from 'zod';

const UserZodSchema = z.object({
  displayName: z.string().min(3, 'DisplayName deve conter ao menos 3 caracteres'),
  email: z.string().email('Digite um e-mail válido'),
  password: z.string().min(6, 'Digite ao menos 6 caracteres'),
});

export type IUser = z.infer<typeof UserZodSchema>;

export default UserZodSchema;
