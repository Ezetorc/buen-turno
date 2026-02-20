<script lang="ts">
	import { useForm } from '$lib/hooks/useForm';
	import { YourBusinessStepSchema } from '$lib/schemas/YourBusinessStepSchema';
	import type { NewBusinessStepProps } from '$lib/types/NewBusinessStepProps';
	import Button from '../Button.svelte';
	import Error from '../Error.svelte';
	import Input from '../Input.svelte';
	import Textarea from '../Textarea.svelte';

	let { goNext, data, setData }: Omit<NewBusinessStepProps, "goBack"> = $props();
	let { subdata, error, setField, isFormValid } = useForm(YourBusinessStepSchema);

	function onContinue() {
		if (isFormValid()) {
			subdata.subscribe((newData) => {
				setData(newData);
				goNext();
			})();
		}
	}
</script>

<h1 class="my-7 text-center font-semibold mini:text-4xl mobile:text-5xl">Tu Negocio</h1>

<form id="business-form" class="flex flex-col gap-y-4" onsubmit={onContinue}>
	<Input
		id="business-name"
		name="organization"
		placeholder="Nombre de tu negocio"
		value={data.name}
		maxlength={40}
		required
		autocomplete="organization"
		autocapitalize="words"
		spellcheck={false}
		aria-label="Nombre de tu negocio"
		onNewValue={(name) => setField('name', name)}
	/>

	<Input
		id="email"
		name="email"
		placeholder="Correo electrónico"
		value={data.email}
		maxlength={100}
		required
		type="email"
		autocomplete="email"
		inputmode="email"
		autocorrect="off"
		autocapitalize="none"
		spellcheck={false}
		aria-label="Correo electrónico"
		onNewValue={(email) => setField('email', email)}
	/>

	<Textarea
		id="description"
		name="description"
		placeholder="Descripción"
		required
		minlength={10}
		maxlength={255}
		rows={4}
		spellcheck="true"
		aria-required="true"
		onNewValue={(description) => setField('description', description)}
	/>

	<Input
		id="phone"
		name="tel"
		placeholder="Número de teléfono"
		value={data.phone}
		maxlength={20}
		required
		type="tel"
		autocomplete="tel"
		inputmode="tel"
		aria-label="Número de teléfono"
		onNewValue={(phone) => setField('phone', phone)}
	/>

	<Input
		id="country"
		name="country"
		placeholder="País"
		value={data.country}
		maxlength={40}
		required
		type="text"
		autocomplete="country-name"
		aria-label="País"
		onNewValue={(country) => setField('country', country)}
	/>

	<Input
		id="address"
		name="street-address"
		placeholder="Dirección"
		value={data.address}
		maxlength={255}
		required
		type="text"
		autocomplete="street-address"
		aria-label="Dirección"
		onNewValue={(address) => setField('address', address)}
	/>
</form>

<Error {error} />
<Button className="w-full" form="business-form" type="submit" label="Continuar" />
