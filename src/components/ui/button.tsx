import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover hover:shadow-lg transform hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-lg transform hover:scale-105",
        outline:
          "border border-border bg-transparent text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg transform hover:scale-105",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-hover hover:shadow-lg transform hover:scale-105",
        accent:
          "bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:shadow-lg transform hover:scale-105",
        ghost:
          "text-foreground-muted hover:bg-surface-elevated hover:text-foreground",
        link: "text-primary hover:text-primary-hover underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-lg has-[>svg]:px-3",
        sm: "h-8 px-3 py-1 rounded-md gap-1.5 text-xs has-[>svg]:px-2.5",
        lg: "h-12 px-6 py-3 rounded-lg text-base has-[>svg]:px-4",
        icon: "size-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
