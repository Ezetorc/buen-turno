<script lang="ts">
	import type { DAYS_OF_WEEK } from '$lib/constants/DAYS_OF_WEEK';
	import type { Business } from '$lib/types/Business';
	import type { BusinessForm } from '$lib/types/BusinessForm';
	import type { DayId } from '$lib/types/DayId';
	import CrossIcon from '../icons/CrossIcon.svelte';
	import RightArrowIcon from '../icons/RightArrowIcon.svelte';
	import Input from '../Input.svelte';
	import CheckBox from '../CheckBox.svelte';

	interface Props {
		day: (typeof DAYS_OF_WEEK)[number];
		setValue: (newValue: Partial<NonNullable<BusinessForm['schedule']>[DayId]>) => void;
		data: Business['schedule'][DayId];
	}

	let { day, setValue, data }: Props = $props();

	function setIsOpen(isOpen: boolean) {
		setValue({ isOpen });
	}

	function addTime() {
		if (data.times.length === 3) return;

		setValue({
			times: [...data.times, { start: '09:00', end: '18:00' }]
		});
	}

	function removeTime(index: number) {
		if (data.times.length <= 1) return;

		setValue({
			times: data.times.filter((_, i) => i !== index)
		});
	}

	function setStart(index: number, start: string) {
		setValue({
			times: data.times.map((t, i) => (i === index ? { ...t, start } : t))
		});
	}

	function setEnd(index: number, end: string) {
		setValue({
			times: data.times.map((t, i) => (i === index ? { ...t, end } : t))
		});
	}
</script>

<li class="space-y-4">
	<header class="grid grid-cols-2 gap-x-10">
		<div class="flex gap-x-10">
			<CheckBox
				checked={data.isOpen ?? true}
				onNewValue={setIsOpen}
				id={`switch-component-${day.id}`}
			/>

			<h3 class="text-xl">{day.label}</h3>
		</div>

		<div class="w-full justify-items-end">
			<button
				onclick={addTime}
				disabled={data.isOpen === false || data.times.length === 3}
				class:cursor-pointer={data.isOpen}
				class:opacity-40={data.isOpen === false || data.times.length === 3}
				class="flex size-[24px] items-center justify-center rounded-[4px] bg-primary text-xl leading-none font-bold text-white transition-transform duration-100 active:scale-90"
				>+
			</button>
		</div>
	</header>

	<main class="transition-opacity" class:opacity-40={data.isOpen === false}>
		<div class="flex flex-col gap-y-2">
			{#each data.times as time, index (index)}
				<div class="grid grid-cols-[8fr_1fr] gap-x-2">
					<div class="flex gap-x-2">
						<Input
							onNewValue={(start) => setStart(index, start)}
							type="time"
							value={time.start}
							className="w-full h-[64px]"
							disabled={data.isOpen === false}
						/>

						<RightArrowIcon />

						<Input
							onNewValue={(end) => setEnd(index, end)}
							type="time"
							value={time.end}
							className="w-full h-[64px]"
							disabled={data.isOpen === false}
						/>
					</div>

					<button
						disabled={data.isOpen === false || data.times.length <= 1}
						class:opacity-20={data.isOpen === false || data.times.length <= 1}
						class="cursor-pointer justify-self-end text-red-500 transition-transform duration-100 active:scale-90"
						onclick={() => removeTime(index)}
					>
						<CrossIcon />
					</button>
				</div>
			{/each}
		</div>
	</main>
</li>
