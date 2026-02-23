import z from 'zod';

export const DayScheduleSchema = z
	.object({
		isOpen: z.boolean().default(true),
		startTime: z.string().optional(),
		endTime: z.string().optional()
	})
	.superRefine((data, context) => {
		if (data.isOpen) {
			if (!data.startTime) {
				context.addIssue({
					path: ['startTime'],
					code: 'custom',
					message: 'El horario de inicio es obligatorio en días laborales'
				});
			}

			if (!data.endTime) {
				context.addIssue({
					path: ['endTime'],
					code: 'custom',
					message: 'El horario de fin es obligatorio en días laborales'
				});
			}

			if (data.startTime && data.endTime && data.startTime >= data.endTime) {
				context.addIssue({
					path: ['endTime'],
					code: 'custom',
					message: 'El horario de fin debe ser posterior al de inicio'
				});
			}
		}
	});
