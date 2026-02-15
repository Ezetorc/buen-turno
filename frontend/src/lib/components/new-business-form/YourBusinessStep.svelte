<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import Textarea from "$lib/components/Textarea.svelte";
	import type { Business } from "$lib/schemas/Business";
	import type { BusinessStepProps } from "$lib/types/BusinessStepProps";

  let { data, onBack, onNext, onDataChange }: BusinessStepProps = $props()
  const REQUIRED_FIELDS: Array<keyof Business> = ["name", "email", "phone", "description", "country", "address"]
</script>

<main class="flex flex-col items-center text-center gap-4 px-6">
  <h1 class="text-5xl font-semibold mt-7 mb-4">
    Tu negocio
  </h1>

  <form class="gap-y-6 flex flex-col w-full items-center">
    <Input value={data.name} onNewValue={(name) => onDataChange({ name })} id="business_name" name="business_name" placeholder="Nombre de tu negocio" maxlength={40} type="text" autocomplete="organization" />
    <Input value={data.email} onNewValue={(email) => onDataChange({ email })} id="email" name="email" placeholder="Correo electrónico" maxlength={100} type="email" inputmode="email" autocomplete="email" />
    <Input value={data.phone} onNewValue={(phone) => onDataChange({ phone })} id="phone" name="phone" placeholder="Número de teléfono" maxlength={40} type="tel" inputmode="tel" autocomplete="tel" />
    <Textarea value={data.description} onNewValue={(description) => onDataChange({ description })} id="description" name="description" placeholder="Descripción" maxlength={255} />
    <Input value={data.country} onNewValue={(country) => onDataChange({ country })} id="country" name="country" placeholder="País" maxlength={40} type="text" autocomplete="country-name" />
    <Input value={data.address} onNewValue={(address) => onDataChange({ address })} id="address" name="address" placeholder="Dirección" maxlength={255} type="text" autocomplete="street-address" />
  </form>
</main>
  
<footer class="flex justify-center align-items p-6 gap-x-5">
  <Button onclick={onBack} variant="secondary" label="Volver" />
  <Button onclick={() => onNext(REQUIRED_FIELDS)} label="Continuar" />
</footer>
