export default function SkeletonGrid() {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse space-y-4">
            <div className="bg-gray-300 h-[450px] w-[300px] rounded-xl" />
            <div className="bg-gray-300 h-4 w-3/4 rounded" />
          </div>
        ))}
      </div>
    );
  }
  