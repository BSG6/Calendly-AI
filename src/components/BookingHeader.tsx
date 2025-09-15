import { Badge } from "@/components/ui/badge"

interface BookingHeaderProps {
  title: string
  durationMins: number
  description?: string
  timezone: string
}

export function BookingHeader({ title, durationMins, description, timezone }: BookingHeaderProps) {
  return (
    <header className="space-y-3 sm:space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <h2 className="text-xl font-semibold leading-tight sm:text-2xl text-brand-primary">{title}</h2>
        <Badge variant="secondary" className="w-fit bg-brand-primary/10 text-brand-primary border-brand-primary/20">
          {durationMins} min
        </Badge>
      </div>

      {description && <p className="text-sm text-muted-foreground sm:text-base">{description}</p>}

      <p className="text-xs text-muted-foreground sm:text-sm">Times shown in {timezone}</p>
    </header>
  )
}
