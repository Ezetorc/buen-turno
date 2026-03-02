<script lang="ts">
	import type { NewBusinessStepProps } from '$lib/types/NewBusinessStepProps';
	import { ZodError } from 'zod';
	import Button from '../Button.svelte';
	import Error from '../Error.svelte';
	import { BusinessServicesSchema } from '$lib/schemas/BusinessServicesSchema';

	let { goNext, goBack, data, setData }: NewBusinessStepProps = $props();

	let error = $state<string | undefined>();

	function onContinue() {
		try {
			BusinessServicesSchema.parse({ services: data.services });

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

<h1 class="my-7 text-center font-semibold mini:text-4xl mobile:text-5xl">Servicios</h1>

<main class="space-y-6">
	<ol class="space-y-8">
		{#each data.services as service, index (index)}
			{service.name}
		{/each}
	</ol>

	<Error {error} />
</main>

<footer class="mt-5 grid grid-cols-2 gap-x-6">
	<Button variant="secondary" label="Volver" onclick={goBack} />
	<Button label="Continuar" onclick={onContinue} />
</footer>
