import { BusinessSchema } from './../schemas/BusinessSchema';
import type z from 'zod';

export type Business = z.infer<typeof BusinessSchema>;
