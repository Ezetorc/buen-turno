<script lang="ts">
  import AppearenceStep from "$lib/components/new-business-form/AppearenceStep.svelte"
	import WelcomeStep from "$lib/components/new-business-form/WelcomeStep.svelte";
	import YourBusinessStep from "$lib/components/new-business-form/YourBusinessStep.svelte";
	import type { Business } from "$lib/schemas/Business";
	import type { BusinessStepInput } from "$lib/schemas/BusinessStep";
	import type { ZodFormattedError } from "zod/v3";

  let step = $state(0)
  let data: Partial<Business> = $state({ })
  let errors: ZodFormattedError<BusinessStepInput> | null = $state(null);

  function onDataChange(newData: BusinessStepInput) {
    data = { ...data, ...newData }
  }

  function onNext(requiredFields?: Array<keyof BusinessStepInput>) {
    if (requiredFields === undefined) {
      step += 1
      return
    }

    const missing = requiredFields.filter(
      field => !data[field]
    );

    if (missing.length > 0) {
      console.warn("Campos faltantes:", missing);
      return;
    }

    step += 1;
  }

  function onBack() {
    step -= 1
  }
</script>

<div class="grid grid-rows-[auto_1fr] min-h-screen">
  <header class="flex items-center px-6 border-b h-16">
    {#if step === 0}
      BuenTurno
    {:else}
      {step}
    {/if}
  </header>

  {#if step === 0}
    <WelcomeStep {data} {onNext} {onBack} {onDataChange} />
  {:else if step === 1}
    <YourBusinessStep {data} {onNext} {onBack} {onDataChange} />
  {:else if step === 2}
    <AppearenceStep {data} {onNext} {onBack} {onDataChange} />
  {/if}
</div>