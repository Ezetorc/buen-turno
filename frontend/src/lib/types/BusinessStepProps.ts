import type { Business } from "$lib/schemas/Business"

export type BusinessStepProps = {
  data: Partial<Business>
  onNext: (requiredFields?: Array<keyof Business>) => void
  onBack: () => void
  onDataChange: (newData: Partial<Business>) => void
}