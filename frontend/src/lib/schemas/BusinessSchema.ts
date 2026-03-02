import { THEMES } from '$lib/constants/THEMES';
import type { ThemeId } from '$lib/types/ThemeId';
import z from 'zod';
import { DayScheduleSchema } from './DayScheduleSchema';
import { DAYS_OF_WEEK } from '$lib/constants/DAYS_OF_WEEK';
import { ServiceColor } from '$lib/constants/SERVICE_COLOR';

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
		.min(10, { error: 'La descripción debe tener mínimo 10 carácteres' })
		.max(255, { error: 'La descripción debe tener máximo 255 carácteres' }),
	country: z
		.string()
		.min(1, { error: 'El país debe tener mínimo 1 carácteres' })
		.max(40, { error: 'El país debe tener máximo 40 carácteres' }),
	address: z
		.string()
		.min(10, { error: 'La dirección debe tener mínimo 10 carácteres' })
		.max(255, { error: 'La dirección debe tener máximo 255 carácteres' }),
	theme: z.enum(Object.keys(THEMES) as [ThemeId, ...ThemeId[]]).default('barber'),
	schedule: z
		.object({
			MONDAY: DayScheduleSchema,
			TUESDAY: DayScheduleSchema,
			WEDNESDAY: DayScheduleSchema,
			THURSDAY: DayScheduleSchema,
			FRIDAY: DayScheduleSchema,
			SATURDAY: DayScheduleSchema,
			SUNDAY: DayScheduleSchema
		})
		.superRefine((data, context) => {
			const noWorkingDays = Object.values(data).every((day) => !day.isOpen);

			if (noWorkingDays) {
				context.addIssue({
					code: 'custom',
					message: 'Debe haber al menos un día hábil'
				});
			}

			const missingDays = DAYS_OF_WEEK.filter((day) => !data[day.id]);

			if (missingDays.length > 0) {
				context.addIssue({
					code: 'custom',
					message: 'Todos los días hábiles deben tener sus horarios'
				});
			}
		}),
	services: z.array(
		z.object({
			name: z
				.string()
				.min(3, { error: 'El nombre debe tener mínimo 3 carácteres' })
				.max(40, { error: 'El nombre debe tener máximo 40 carácteres' }),
			durationMinutes: z
				.number()
				.min(5, { error: 'La duración debe ser de al menos 5 minutos' })
				.max(180, { error: 'La duración debe ser de máximo 180 minutos' }),
			description: z
				.string()
				.min(10, { error: 'La descripción debe tener mínimo 10 carácteres' })
				.max(255, { error: 'La descripción debe tener máximo 255 carácteres' }),
			price: z
				.number()
				.min(1000, { error: 'El precio debe ser de mínimo 1000 pesos' })
				.max(200000, { error: 'El precio debe ser de máximo 200000 pesos' }),
			color: z.enum(ServiceColor).default(ServiceColor.BLUE),
		})
	)
});
