import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 cursor-pointer  whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white/10 disabled:pointer-events-none disabled:opacity-50 backdrop-blur-md bg-white/10 shadow-lg border border-white/20 hover:bg-white/20 hover:shadow-xl",
  {
    variants: {
      variant: {
        default:
          "text-white",
        destructive:
          "bg-red-500/20 text-red-200 border-red-500/30 hover:bg-red-500/30",
        outline:
          "bg-transparent border border-white/30 text-white hover:bg-white/10",
        secondary:
          "bg-sky-500/20 text-sky-100 border-sky-500/30 hover:bg-sky-500/30",
        ghost:
          "bg-transparent text-white hover:bg-white/10",
        link:
          "text-sky-300 underline-offset-4 hover:underline hover:text-sky-200",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }

