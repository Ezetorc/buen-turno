import z from 'zod';

export const DayScheduleSchema = z
	.object({
		isOpen: z.boolean().default(true),
		times: z
			.array(
				z.object({
					start: z.string().optional(),
					end: z.string().optional()
				})
			)
			.max(3, { error: 'Solo puedes tener un máximo de 3 horarios distintos por día' })
	})
	.default({
		isOpen: true,
		times: [{ start: '00:00', end: '00:00' }]
	})
	.superRefine((data, context) => {
		if (data.isOpen) {
			if (data.times === undefined) {
				context.addIssue({
					path: ['times'],
					code: 'custom',
					message: 'El horario es obligatorio en días laborales'
				});

				return;
			}

			for (const time of data.times) {
				if (!time.start) {
					context.addIssue({
						path: ['startTime'],
						code: 'custom',
						message: 'El horario de inicio es obligatorio en días laborales'
					});
				}

				if (!time.end) {
					context.addIssue({
						path: ['endTime'],
						code: 'custom',
						message: 'El horario de fin es obligatorio en días laborales'
					});
				}

				if (time.start && time.end && time.start >= time.end) {
					context.addIssue({
						path: ['endTime'],
						code: 'custom',
						message: 'El horario de fin debe ser posterior al de inicio'
					});
				}
			}
		}
	});
