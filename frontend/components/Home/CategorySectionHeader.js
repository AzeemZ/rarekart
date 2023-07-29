export default function CategorySectionHeader({
  categoryName,
  categoryDescription,
}) {
  return (
    <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
      <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
        {categoryName}
      </div>
      <div className="text-md md:text-xl">
        {!!categoryDescription && categoryDescription}
      </div>
    </div>
  );
}
