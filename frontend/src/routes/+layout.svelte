<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>BuenTurno | Gestioná turnos de una manera eficiente</title>
</svelte:head>

{@render children()}
