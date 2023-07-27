"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { IoMdHeartEmpty } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import Wrapper from "@/components/Wrapper";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import { fetcher } from "@/utils/api";
import { addToCart } from "@/store/cartSlice";
import { addToWishlist } from "@/store/wishlistSlice";
import Notify from "@/components/Notify";

export async function generateStaticParams() {
  const products = await fetcher("/api/products?populate=*");

  return products?.data?.map((p) => ({
    slug: p.attributes.slug,
  }));
}

export default function Product({ params: { slug } }) {
  const dispatch = useDispatch();
  const { data: product } = useSWR(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`,
    fetcher
  );
  const { data: products } = useSWR(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`,
    fetcher
  );
  const p = product?.data?.[0]?.attributes;

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel images={p?.image?.data} />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {p?.name}
            </div>

            {/* PRODUCT PRICE */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP : Rs. {p?.price?.toLocaleString()}/-
              </p>
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            {/* ADD TO CART BUTTON START */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                dispatch(
                  addToCart({
                    ...product?.data?.[0],
                    oneQuantityPrice: p?.price,
                  })
                );
                Notify("Success. Check your cart!");
              }}
            >
              Add to Cart
            </button>
            {/* ADD TO CART BUTTON END */}

            {/* WISHLIST BUTTON START */}
            <button
              className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10"
              onClick={() => {
                dispatch(addToWishlist(product?.data?.[0]));
                Notify("Added to your wishlist!");
              }}
            >
              Wishlist
              <IoMdHeartEmpty size={20} />
            </button>
            {/* WISHLIST BUTTON END */}

            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                <ReactMarkdown>{p?.description}</ReactMarkdown>
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>

        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
}
