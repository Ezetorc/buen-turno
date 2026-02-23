<script lang="ts">
	import AppareanceStep from '$lib/components/new-business-form/AppareanceStep.svelte';
	import ScheduleStep from '$lib/components/new-business-form/ScheduleStep.svelte';
	import WelcomeStep from '$lib/components/new-business-form/WelcomeStep.svelte';
	import YourBusinessStep from '$lib/components/new-business-form/YourBusinessStep.svelte';
	import type { BusinessForm } from '$lib/types/BusinessForm';

	let step: number = $state(3);
	let data: BusinessForm = $state({
		theme: 'barber',
		schedule: {
			SATURDAY: { isOpen: false },
			SUNDAY: { isOpen: false }
		}
	});

	function setData(newData: Partial<BusinessForm>) {
		data = {
			...data,
			...newData,
			schedule: newData.schedule
				? {
						...data.schedule,
						...newData.schedule
					}
				: data.schedule
		};
	}

	function goNext() {
		step += 1;
	}

	function goBack() {
		step -= 1;
	}
</script>

<header class="sticky top-0 z-40 flex h-16 items-center border-b bg-white px-6">BuenTurno</header>

<main class="grid w-full grid-rows-[auto_1fr] gap-y-4">
	<div class="mx-auto w-full max-w-[600px] min-w-[300px] px-5">
		{#if step === 0}
			<WelcomeStep {goNext} />
		{:else if step === 1}
			<YourBusinessStep {goNext} {data} {setData} />
		{:else if step === 2}
			<AppareanceStep {goNext} {goBack} {data} {setData} />
		{:else if step === 3}
			<ScheduleStep {goNext} {goBack} {data} {setData} />
		{/if}
	</div>
</main>
