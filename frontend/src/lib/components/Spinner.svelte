<script lang="ts">
	export let size: number = 100;
	export let color: string = "border-blue-500";
	export let thickness: string = "border-10"; 
</script>

<div
  class={`animate-spin rounded-full border-gray-200 ${color} ${thickness}`}
  style={`width:${size}px; height:${size}px; border-top-color: currentColor;`}
	role="status"
	aria-label="Cargando"
></div>
