import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-16 w-full rounded-lg border border-zinc-700/70 bg-zinc-800/60 px-3 py-2 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 transition-all outline-none focus-visible:border-indigo-500/80 focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
