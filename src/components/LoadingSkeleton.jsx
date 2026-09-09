export function ProductSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm animate-pulse flex flex-col h-full">
      <div className="aspect-[4/5] bg-muted"></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="w-1/3 h-3 bg-muted rounded mb-2"></div>
        <div className="w-full h-4 bg-muted rounded mb-2"></div>
        <div className="w-2/3 h-4 bg-muted rounded mb-4"></div>
        <div className="w-1/4 h-3 bg-muted rounded mb-4"></div>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/50">
          <div className="w-1/3 h-6 bg-muted rounded"></div>
          <div className="w-10 h-10 bg-muted rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 animate-pulse">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-muted"></div>
      <div className="w-16 h-4 bg-muted rounded"></div>
    </div>
  );
}
