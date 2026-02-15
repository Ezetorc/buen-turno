<script lang="ts">
	import type { HTMLTextareaAttributes } from "svelte/elements";

  interface Props extends HTMLTextareaAttributes {
    onNewValue?: (value: any) => void
  }

  let { onNewValue, ...props }: Props = $props()
</script>

<textarea
onchange={(event) => onNewValue?.(event.currentTarget.value)}
class="w-[clamp(300px,100%,600px)] p-4 bg-[#f2f2f2] rounded-[10px] placeholder:text-[#4b5563] text-2xl shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)] focus:outline-none focus:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)] transition-shadow h-[150px] resize-none"
  required
  {...props}>
</textarea>