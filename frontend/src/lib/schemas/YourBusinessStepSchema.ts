import { BusinessSchema } from './BusinessSchema';

export const YourBusinessStepSchema = BusinessSchema.pick({
	name: true,
	email: true,
	phone: true,
	description: true,
	country: true,
	address: true
});
