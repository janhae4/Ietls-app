import { cn } from "@/lib/utils"

function Divider({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 w-full h-0.5 my-5 mb-10 rounded-lg bg-gray-100", className)}
      {...props}
    />
  )
}

export { Divider }