import { cn } from "../../lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// Skeleton específico para seções
function SectionSkeleton({ 
  className,
  showHeader = true,
  headerHeight = "h-8",
  contentRows = 3,
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & {
  showHeader?: boolean;
  headerHeight?: string;
  contentRows?: number;
}) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {showHeader && (
        <Skeleton className={cn("w-3/4 mx-auto", headerHeight)} />
      )}
      <div className="space-y-2">
        {Array.from({ length: contentRows }).map((_, i) => (
          <Skeleton 
            key={i} 
            className={cn(
              "h-4",
              i === contentRows - 1 ? "w-2/3" : "w-full"
            )} 
          />
        ))}
      </div>
    </div>
  )
}

// Skeleton para cards
function CardSkeleton({ 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-lg border bg-card p-6 space-y-4", className)} {...props}>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

// Skeleton para Hero section
function HeroSkeleton({ 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("min-h-screen bg-primary flex", className)} {...props}>
      {/* Left side - Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Skeleton className="h-32 w-52 bg-white/20" />
          </div>
          
          {/* Title */}
          <div className="space-y-4">
            <Skeleton className="h-12 w-full bg-white/20" />
            <Skeleton className="h-12 w-3/4 bg-white/20" />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-white/20" />
            <Skeleton className="h-4 w-full bg-white/20" />
            <Skeleton className="h-4 w-2/3 bg-white/20" />
          </div>
          
          {/* Buttons */}
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32 bg-white/20" />
            <Skeleton className="h-12 w-32 bg-white/20" />
          </div>
        </div>
      </div>
      
      {/* Right side - 3D */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center">
          <div className="text-white/60">Carregando visualização 3D...</div>
        </div>
      </div>
    </div>
  )
}

// Skeleton para Services grid
function ServicesGridSkeleton({ 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("py-20 bg-white", className)} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Skeleton className="h-12 w-64 mx-auto" />
          <div className="space-y-2 max-w-3xl mx-auto">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
        </div>
        
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export { 
  Skeleton, 
  SectionSkeleton, 
  CardSkeleton, 
  HeroSkeleton, 
  ServicesGridSkeleton 
}
