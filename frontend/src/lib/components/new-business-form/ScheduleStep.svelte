<script lang="ts">
	import { DAYS_OF_WEEK } from '$lib/constants/DAYS_OF_WEEK';
	import { BusinessScheduleStepSchema } from '$lib/schemas/BusinessScheduleStepSchema';
	import type { BusinessForm } from '$lib/types/BusinessForm';
	import type { DayId } from '$lib/types/DayId';
	import type { NewBusinessStepProps } from '$lib/types/NewBusinessStepProps';
	import { ZodError } from 'zod';
	import Button from '../Button.svelte';
	import CheckBox from '../CheckBox.svelte';
	import Error from '../Error.svelte';
	import RightArrowIcon from '../icons/RightArrowIcon.svelte';
	import Input from '../Input.svelte';

	let { goNext, goBack, data, setData }: NewBusinessStepProps = $props();
	let error = $state<string | undefined>(undefined);

	function onNewValue(
		dayId: DayId,
		newValue: Partial<NonNullable<BusinessForm['schedule']>[DayId]>
	) {
		error = undefined;

		setData({
			schedule: {
				...data.schedule,
				[dayId]: {
					...data.schedule?.[dayId],
					...newValue
				}
			}
		});
	}

	function onContinue() {
		try {
			BusinessScheduleStepSchema.parse({ schedule: data.schedule });

			goNext();
		} catch (err) {
			console.error(err);

			if (!(err instanceof ZodError)) return;

			if (err.name === 'ZodError') {
				error = err.issues[0].message;
			} else {
				error = 'Ocurrió un error inesperado';
			}
		}
	}
</script>

<h1 class="my-7 text-center font-semibold mini:text-4xl mobile:text-5xl">Horarios</h1>

<main class="space-y-6">
	<ol class="space-y-8">
		{#each DAYS_OF_WEEK as day}
			<li class="space-y-4">
				<header class="flex items-center gap-x-10">
					<CheckBox
						checked={data.schedule?.[day.id]?.isOpen ?? true}
						onNewValue={(isOpen) => onNewValue(day.id, { isOpen })}
						id={`switch-component-${day.id}`}
					/>

					<h3 class="text-xl">{day.label}</h3>
				</header>

				<main
					class="grid grid-cols-[8fr_1fr] transition-opacity"
					class:opacity-40={(data.schedule?.[day.id]?.isOpen ?? true) === false}
				>
					<div class="flex gap-x-2">
						<Input
							onNewValue={(startTime) => onNewValue(day.id, { startTime })}
							type="time"
							value={data.schedule?.[day.id]?.startTime}
							className="w-full h-[64px]"
							disabled={data.schedule?.[day.id]?.isOpen === false}
						/>
						<RightArrowIcon />
						<Input
							onNewValue={(endTime) => onNewValue(day.id, { endTime })}
							type="time"
							value={data.schedule?.[day.id]?.endTime}
							className="w-full h-[64px]"
							disabled={data.schedule?.[day.id]?.isOpen === false}
						/>
					</div>

					<div class="grid place-items-center justify-items-end">
						<button
							disabled={data.schedule?.[day.id]?.isOpen === false}
							class:cursor-pointer={(data.schedule?.[day.id]?.isOpen ?? true) === true}
							class="flex size-[24px] items-center justify-center rounded-[4px] bg-primary text-xl leading-none font-bold text-white"
							>+</button
						>
					</div>
				</main>
			</li>
		{/each}
	</ol>

	<Error {error} />
</main>

<footer class="mt-5 grid grid-cols-2 gap-x-6">
	<Button variant="secondary" label="Volver" onclick={goBack} />
	<Button label="Continuar" onclick={onContinue} />
</footer>
