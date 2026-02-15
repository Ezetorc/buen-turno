<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import type { BusinessStepProps } from "$lib/types/BusinessStepProps";

  let { onNext }: BusinessStepProps = $props()
</script>

<main class="flex flex-col items-center justify-center text-center gap-4 px-6">
  <h1 class="text-5xl font-semibold mt-7 mb-4">
    ¡Bienvenido!
  </h1>

  <p class="max-w-md text-2xl text-gray-600">
    En cinco pasos vamos a configurar tu negocio para mostrar a los clientes lo que ofreces.
  </p>

  <Button onclick={() => onNext(undefined)} label="Empezar" />
</main>
