<script lang="ts">
  import Button from "$lib/components/Button.svelte"
	import type { Business } from "$lib/schemas/Business";
	import { ThemesService } from "$lib/services/ThemesService";
  import type { BusinessStepProps } from "$lib/types/BusinessStepProps"
	import type { Theme } from "$lib/types/Theme";
	import { onMount } from "svelte";

  let { data, onNext, onBack, onDataChange }: BusinessStepProps = $props()
  let themes: Theme[] = $state([])
  const REQUIRED_FIELDS: Array<keyof Business> = ["theme"]

  onMount(async () => {
    themes = await ThemesService.getAll()
  })
</script>

<main class="flex flex-col items-center text-center gap-4 px-6">
  <h1 class="text-5xl font-semibold mt-7 mb-4">
    Apariencia
  </h1>

  <img alt="Theme preview" class="bg-gray-500 w-[clamp(300px,100%,400px)] aspect-square rounded-lg">
  
  <div class="flex flex-col w-full items-center space-y-2">
    {#each themes as theme}
      <Button
        className="w-[clamp(300px,100%,400px)]"
        variant={data.theme === theme.id ? "primary" : "secondary"}
        label={theme.label}
        onclick={() =>
          onDataChange({
            ...data,
            theme: theme.id
          })
        }
      />
    {/each}
  </div>
</main>
  
<footer class="flex justify-center align-items p-6 gap-x-5">
  <Button onclick={onBack} variant="secondary" label="Volver" />
  <Button onclick={() => onNext(REQUIRED_FIELDS)} label="Continuar" />
</footer>
