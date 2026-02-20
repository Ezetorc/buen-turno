import type { Business } from './Business';

export type NewBusinessStepProps = {
	goNext: () => void;
	goBack: () => void;
	data: Partial<Business>;
	setData: (newData: Partial<Business>) => void;
};
