export default function CategoryLineSkeleton() {
  return (
    <div role="status" className="animate-pulse space-y-3">
      <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
