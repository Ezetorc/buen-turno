import type { Business } from './Business';

export type BusinessForm = Partial<Omit<Business, 'schedule'>> & {
	schedule?: Partial<Business['schedule']>;
};
