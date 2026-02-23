import type { BusinessForm } from './BusinessForm';

export type NewBusinessStepProps = {
	goNext: () => void;
	goBack: () => void;
	data: BusinessForm;
	setData: (newData: BusinessForm) => void;
};
