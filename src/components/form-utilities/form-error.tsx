import { cn } from "@/lib/utils"
import { XCircle } from "lucide-react"

interface FormErrorProps {
  error?: string
  className?: string
}
const FormError = ({
  error,
  className
}: FormErrorProps) => {
  return (
    <p
      className={cn("text-xs font-medium text-destructive flex gap-1 items-center border border-rose-500 bg-rose-500/10 rounded-md p-1.5", className)}
    >
      <XCircle size={16} />
      {error}
    </p>
  )
}

export default FormError