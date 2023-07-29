import useSWR from "swr";
import Card from "../Card/Card";
import { fetcher } from "@/utils/api";
import ProductGridSkeleton from "../Skeletons/ProductGridSkeleton";

export default function ProductGrid({ categoryId }) {
  const { data: products, isLoading } = useSWR(
    `/api/products?populate=*&filters[categories]=${categoryId}&pagination[page]=1&pagination[pageSize]=4`,
    fetcher
  );

  const conditionalRendering = () => {
    if (isLoading) {
      return <ProductGridSkeleton />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
        {products?.data?.slice(0, 4).map((product) => (
          <Card
            key={product?.id}
            item={{
              id: product?.id,
              name: product?.attributes?.name,
              price: product?.attributes?.price,
              img1: product?.attributes?.image?.data[0]?.attributes?.url,
              img2: product?.attributes?.image?.data[1]?.attributes?.url,
            }}
            product={product}
          />
        ))}
      </div>
    );
  };

  return <>{conditionalRendering()}</>;
}
