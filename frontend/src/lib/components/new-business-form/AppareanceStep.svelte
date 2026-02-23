<script lang="ts">
	import { THEMES } from '$lib/constants/THEMES';
	import { getTypedEntries } from '$lib/helpers/getTypedEntries';
	import type { NewBusinessStepProps } from '$lib/types/NewBusinessStepProps';
	import type { ThemeId } from '$lib/types/ThemeId';
	import Button from '../Button.svelte';

	let { goNext, goBack, data, setData }: NewBusinessStepProps = $props();

	function onSelectTheme(id: ThemeId) {
		setData({ theme: id });
	}
</script>

<h1 class="my-7 text-center font-semibold mini:text-4xl mobile:text-5xl">Apariencia</h1>

<main class="space-y-6">
	<img
		src={data.theme ? THEMES[data.theme]?.preview : undefined}
		alt="Previsualización de apariencia de negocio"
		class="flex aspect-video h-full w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200 object-cover"
	/>

	<ul class="flex flex-col gap-y-2">
		{#each getTypedEntries(THEMES) as [id, theme]}
			<Button
				onclick={() => onSelectTheme(id)}
				variant={data.theme === id ? 'primary' : 'secondary'}
				label={theme.label}
			/>
		{/each}
	</ul>
</main>

<footer class="mt-5 grid grid-cols-2 gap-x-6">
	<Button variant="secondary" label="Volver" onclick={goBack} />
	<Button label="Continuar" onclick={goNext} />
</footer>
