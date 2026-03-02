<script lang="ts">
	import { DAYS_OF_WEEK } from '$lib/constants/DAYS_OF_WEEK';
	import { BusinessScheduleSchema } from '$lib/schemas/BusinessScheduleSchema';
	import type { BusinessForm } from '$lib/types/BusinessForm';
	import type { DayId } from '$lib/types/DayId';
	import type { NewBusinessStepProps } from '$lib/types/NewBusinessStepProps';
	import { ZodError } from 'zod';
	import Button from '../Button.svelte';
	import Error from '../Error.svelte';
	import Schedule from './Schedule.svelte';

	let { goNext, goBack, data, setData }: NewBusinessStepProps = $props();

	let error = $state<string | undefined>();

	function onNewValue(
		dayId: DayId,
		newValue: Partial<NonNullable<BusinessForm['schedule']>[DayId]>
	) {
		error = undefined;

		const prevDay = data.schedule[dayId];

		setData({
			schedule: {
				...data.schedule,
				[dayId]: {
					...prevDay,
					...newValue
				}
			}
		});
	}

	function createSetValue(dayId: DayId) {
		return (newValue: Partial<NonNullable<BusinessForm['schedule']>[DayId]>) =>
			onNewValue(dayId, newValue);
	}

	function onContinue() {
		try {
			BusinessScheduleSchema.parse({ schedule: data.schedule });

			goNext();
		} catch (err) {
			console.error(err);

			if (err instanceof ZodError) {
				error = err.issues[0]?.message;
			} else {
				error = 'Ocurrió un error inesperado';
			}
		}
	}
</script>

<h1 class="my-7 text-center font-semibold mini:text-4xl mobile:text-5xl">Horarios</h1>

<main class="space-y-6">
	<ol class="space-y-8">
		{#each DAYS_OF_WEEK as day (day.id)}
			<Schedule {day} setValue={createSetValue(day.id)} data={data.schedule[day.id]} />
		{/each}
	</ol>

	<Error {error} />
</main>

<footer class="mt-5 grid grid-cols-2 gap-x-6">
	<Button variant="secondary" label="Volver" onclick={goBack} />
	<Button label="Continuar" onclick={onContinue} />
</footer>
