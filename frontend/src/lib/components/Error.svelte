<script lang="ts">
	interface Props {
		className?: string
		error: string
	}

	let { error, className }: Props = $props();
</script>

{#if error}
	<p class={`text-2xl text-red-500 ${className}`}>{error}</p>
{/if}
