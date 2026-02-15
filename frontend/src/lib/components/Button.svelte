<script lang="ts">
  interface Props {
    label: string
    variant?: "primary" | "secondary"
    onclick: (event: MouseEvent) => void
    className?: string
  }

  let { label, variant = "primary", onclick, className, ...props }: Props = $props()
</script>

<button
  aria-label={label}
  {onclick}
  class="
  text-2xl mt-4 px-8 py-4 rounded-lg font-normal cursor-pointer
  transition-all duration-100 active:translate-y-2 {className}
  {variant === "primary"
      ? 'bg-primary text-white shadow-[0_8px_0_#1D4ED8] active:shadow-[0_4px_0_#1D4ED8]'
      : 'bg-gray-300 text-gray-900 shadow-[0_8px_0_#9CA3AF] active:shadow-[0_4px_0_#9CA3AF]'
      }
  "
  {...props}
>
  {label}
</button>
