<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props extends HTMLTextareaAttributes {
		onNewValue?: (value: any) => void;
	}

	let { onNewValue, ...props }: Props = $props();
</script>

<textarea
	onchange={(event) => onNewValue?.(event.currentTarget.value)}
	class="h-[150px] resize-none rounded-[10px] bg-[#f2f2f2] p-4 shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)] transition-shadow placeholder:text-[#4b5563] focus:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)] focus:outline-none mini:text-xl mobile:text-2xl"
	required
	{...props}
>
</textarea>
