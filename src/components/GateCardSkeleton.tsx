const GateCardSkeleton = () => {
  return (
    <div className="bg-gray-100 w-full max-w-sm p-4 animate-pulse rounded shadow">
      <div className="flex-container gap-4">
        <div className="h-6 bg-gray-300 rounded w-2/4" />
        <div className="h-4 bg-gray-300 rounded w-1/4" />
      </div>
      <div className="mt-6 h-7 bg-gray-300 rounded w-24" />
    </div>
  )
}

export default GateCardSkeleton