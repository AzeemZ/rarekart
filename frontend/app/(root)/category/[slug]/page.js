"use client";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
import { fetcher } from "@/utils/api";
import CategorySkeleton from "@/components/Skeletons/CategorySkeleton";
import CategoryLineSkeleton from "@/components/Skeletons/CategoryLineSkeleton";

export async function generateStaticParams() {
  const category = await fetcher("/api/categories?populate=*");

  return category?.data?.map((c) => ({
    slug: c.attributes.slug,
  }));
}

export default function Category({ params: { slug } }) {
  const maxResult = 3;
  const searchParams = useSearchParams();
  const [pageIndex, setPageIndex] = useState(1);
  const { data: category, isLoading: isCategoryLoading } = useSWR(
    `/api/categories?filters[slug][$eq]=${slug}`,
    fetcher
  );
  const { data, isLoading } = useSWR(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetcher
  );

  useEffect(() => {
    setPageIndex(1);
  }, [searchParams]);

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {isCategoryLoading ? (
              <CategoryLineSkeleton />
            ) : (
              category?.data?.[0]?.attributes?.name
            )}
          </div>
        </div>

        {/* products grid start */}
        {isLoading ? (
          <CategorySkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {data?.data?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
          </div>
        )}
        {/* products grid end */}

        {/* PAGINATION BUTTONS START */}
        {isLoading ? (
          <div className="mt-16">
            <CategoryLineSkeleton />
          </div>
        ) : (
          data?.meta?.pagination?.total > maxResult && (
            <div className="flex gap-3 items-center justify-center my-16 md:my-0">
              <button
                className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                disabled={pageIndex === 1}
                onClick={() => setPageIndex(pageIndex - 1)}
              >
                Previous
              </button>

              <span className="font-bold">{`${pageIndex} of ${
                data && data.meta.pagination.pageCount
              }`}</span>

              <button
                className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                disabled={
                  pageIndex === (data && data.meta.pagination.pageCount)
                }
                onClick={() => setPageIndex(pageIndex + 1)}
              >
                Next
              </button>
            </div>
          )
        )}
        {/* PAGINATION BUTTONS END */}
      </Wrapper>
    </div>
  );
}
