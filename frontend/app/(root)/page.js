"use client";
import { Fragment } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

import HeroBanner from "@/components/HeroBanner";
import Wrapper from "@/components/Wrapper";
import ProductGrid from "@/components/Home/ProductGrid";
import CategorySectionHeader from "@/components/Home/CategorySectionHeader";
import ProductGridSkeleton from "@/components/Skeletons/ProductGridSkeleton";
import Button from "@/components/Buttons/Button";
import HomeCategoryHeaderSkeleton from "@/components/Skeletons/HomeCategoryHeaderSkeletion";
import { fetcher } from "@/utils/api";

export default function Home() {
  const router = useRouter();
  const { data } = useSWR("/api/categories", fetcher);
  const categories = data?.data;

  const UndefinedSkeletonPlaceholder = (
    <Fragment>
      <HomeCategoryHeaderSkeleton />

      <ProductGridSkeleton />

      <div className="flex justify-center">
        <Button value="Loading..." />
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    </Fragment>
  );

  return (
    <main>
      <HeroBanner />

      <Wrapper>
        {!categories ? (
          <>
            {UndefinedSkeletonPlaceholder}
            {UndefinedSkeletonPlaceholder}
          </>
        ) : (
          categories?.map((category) => {
            return (
              <Fragment key={category.id}>
                <CategorySectionHeader
                  categoryName={category.attributes.name}
                  categoryDescription={category.attributes.description}
                />

                <ProductGrid categoryId={category.id} />

                <div className="flex justify-center">
                  <Button
                    value={"See More"}
                    onClick={() =>
                      router.push(`/category/${category.attributes.slug}`)
                    }
                  />
                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              </Fragment>
            );
          })
        )}

        {/* ===== Our Shop Section */}
        <section className="app-max-width mt-16 mb-20 flex flex-col justify-center items-center text-center">
          <div className="textBox w-3/4 md:w-2/4 lg:w-2/5 mb-6">
            <h2 className="text-3xl mb-6">Our Shop</h2>
            <span className="w-full">
              Stop by our stores to learn the stories behind our products, get a
              personal styling session, or shop the latest in person. See our
              store locations.
            </span>
          </div>
          <div className="w-full app-x-padding flex justify-center">
            <img src="/ourshop.png" alt="Our Shop" />
          </div>
        </section>
      </Wrapper>
    </main>
  );
}
