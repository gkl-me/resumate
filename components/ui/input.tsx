import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-9 sm:h-10 w-full min-w-0 rounded-lg border border-zinc-700/70 bg-zinc-800/60 px-3 py-1.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 transition-all outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:border-indigo-500/80 focus-visible:ring-2 focus-visible:ring-indigo-500/25 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
