<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		label: string;
		variant?: 'primary' | 'secondary';
		onclick?: (event: MouseEvent) => void;
		className?: string;
		disabled?: boolean;
	}

	let {
		label,
		variant = 'primary',
		disabled = false,
		onclick,
		className = '',
		...props
	}: Props = $props();
</script>

<button
	aria-label={label}
	{onclick}
	{disabled}
	class="
  mt-4 rounded-lg px-8 py-4 text-2xl font-normal
  transition-all duration-100
  {disabled ? 'cursor-not-allowed opacity-50 shadow-none' : 'cursor-pointer active:translate-y-2'}
  {variant === 'primary'
		? disabled
			? 'bg-primary text-white'
			: 'bg-primary text-white shadow-[0_8px_0_#1D4ED8] active:shadow-[0_4px_0_#1D4ED8]'
		: disabled
			? 'bg-gray-300 text-gray-900'
			: 'bg-gray-300 text-gray-900 shadow-[0_8px_0_#9CA3AF] active:shadow-[0_4px_0_#9CA3AF]'}
  {className}
  "
	{...props}
>
	{label}
</button>
