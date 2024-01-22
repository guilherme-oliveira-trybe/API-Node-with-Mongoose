import { z } from 'zod';

const PostZodSchema = z.object({
  title: z.string().min(3, 'Title deve conter ao menos 3 caracteres'),
  content: z.string().min(3, 'Content deve conter ao menos 3 caracteres'),
  userId: z.string(),
});

export type IPost = z.infer<typeof PostZodSchema>;

export default PostZodSchema;
