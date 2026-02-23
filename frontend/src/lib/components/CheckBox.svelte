<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		onNewValue?: (value: any) => void;
		className?: string;
		id: string;
	}

	let { onNewValue, className, id, ...props }: Props = $props();
</script>

<div class="relative inline-block h-8 w-11">
	<input
		oninput={(event) => onNewValue?.(event.currentTarget.checked)}
		{id}
		type="checkbox"
		class="peer h-8 w-15 cursor-pointer appearance-none rounded-[4px] bg-text-muted transition-colors duration-300 checked:bg-accent"
		{...props}
	/>

	<label
		for={id}
		class="absolute top-1/2 left-1 size-5 translate-x-1 -translate-y-1/2 cursor-pointer rounded-[4px] bg-white transition-transform duration-300 peer-checked:translate-x-7"
	>
	</label>
</div>
