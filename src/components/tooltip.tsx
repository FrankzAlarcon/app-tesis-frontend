import {
  TooltipProvider,
  Tooltip as TooltipContainer,
  TooltipTrigger,
  TooltipContent
} from "./ui/tooltip"

interface TooltipProps {
  children: React.ReactNode
  tooltipContent: string
}

const Tooltip = ({
  children,
  tooltipContent
}: TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipContainer>
        <TooltipTrigger>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{tooltipContent}</p>
        </TooltipContent>
      </TooltipContainer>
    </TooltipProvider>
  )
}

export default Tooltip