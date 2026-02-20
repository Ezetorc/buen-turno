<script lang="ts">
	import type { NewBusinessStepProps } from '$lib/types/NewBusinessStepProps';
	import Button from '../Button.svelte';

	let { goNext }: Pick<NewBusinessStepProps, 'goNext'> = $props();
</script>

<main class="flex flex-col items-center justify-center gap-4 px-6 text-center">
	<h1 class="mt-7 mb-4 text-5xl font-semibold">¡Bienvenido!</h1>

	<p class="max-w-md text-2xl text-gray-600">
		En cinco pasos vamos a configurar tu negocio para mostrar a los clientes lo que ofreces.
	</p>

	<Button onclick={goNext} label="Empezar" />
</main>
