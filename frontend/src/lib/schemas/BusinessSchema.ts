import { THEMES } from '$lib/constants/THEMES';
import type { ThemeId } from '$lib/types/ThemeId';
import z from 'zod';

export const BusinessSchema = z.object({
	name: z
		.string()
		.min(5, { error: 'El nombre debe tener mínimo 5 carácteres' })
		.max(40, { error: 'El nombre debe tener máximo 40 carácteres' }),
	email: z
		.email({ error: 'El email debe ser válido' })
		.min(1, { error: 'El email debe tener mínimo 1 caracter' })
		.max(100, { error: 'El email debe tener máximo 100 carácteres' }),
	phone: z
		.string()
		.min(5, { error: 'El número de teléfono debe tener mínimo 5 carácteres' })
		.max(100, { error: 'El número de teléfono debe tener máximo 100 carácteres' }),
	description: z
		.string()
		.min(10, { error: 'La descripciópnpmn debe tener mínimo 10 carácteres' })
		.max(255, { error: 'La descripción debe tener máximo 255 carácteres' }),
	country: z
		.string()
		.min(1, { error: 'El país debe tener mínimo 1 carácteres' })
		.max(40, { error: 'El país debe tener máximo 40 carácteres' }),
	address: z
		.string()
		.min(10, { error: 'La dirección debe tener mínimo 10 carácteres' })
		.max(255, { error: 'La dirección debe tener máximo 255 carácteres' }),
	theme: z
		.enum(Object.keys(THEMES) as [ThemeId, ...ThemeId[]])
		.default("barber"),
});
