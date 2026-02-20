import { writable } from 'svelte/store';
import { ZodError, ZodType } from 'zod';

export function useForm<T extends object>(schema: ZodType<T>) {
	const subdata = writable<Partial<T>>({});
	const error = writable<string | undefined>(undefined);

	function setField<K extends keyof T>(field: K, value: T[K]) {
		subdata.update((d) => ({ ...d, [field]: value }));
		error.set(undefined);
	}

	function isFormValid(): boolean {
		let valid = true;
		subdata.subscribe((d) => {
			try {
				schema.parse(d);
			} catch (err) {
				console.error(err);

				if (!(err instanceof ZodError)) return;

				if (err.name === 'ZodError') {
					error.set(err.issues[0].message);
				} else {
					error.set('Ocurrió un error inesperado');
				}
				valid = false;
			}
		})();

		return valid;
	}

	return { subdata, error, setField, isFormValid };
}
