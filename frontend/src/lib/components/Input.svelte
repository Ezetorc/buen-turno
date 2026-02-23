<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		onNewValue?: (value: any) => void;
		className?: string;
	}

	let { onNewValue, className, ...props }: Props = $props();
</script>

<input
	oninput={(event) => onNewValue?.(event.currentTarget.value)}
	class={`rounded-[10px] bg-[#f2f2f2] p-4
         shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)] transition-shadow placeholder:text-[#4b5563]
         focus:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)]
         focus:outline-none
         mini:text-xl
         mobile:text-2xl ${className}`}
	{...props}
/>
