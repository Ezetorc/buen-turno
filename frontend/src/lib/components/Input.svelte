<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends HTMLInputAttributes {
    onchange?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void
    onNewValue?: (value: any) => void
  }

  let { onchange, onNewValue, ...props }: Props = $props()
</script>

<input
  onchange={(event) => onNewValue?.(event.currentTarget.value)}
  class="w-[clamp(300px,100%,600px)] p-4 bg-[#f2f2f2] rounded-[10px] placeholder:text-[#4b5563]
    text-2xl shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)] focus:outline-none focus:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)] transition-shadow"
  required
  {...props}
>