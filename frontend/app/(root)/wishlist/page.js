"use client";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import LeftArrow from "@/public/icons/LeftArrow";
import Button from "@/components/Buttons/Button";
import GhostButton from "@/components/Buttons/GhostButton";
import Notify from "@/components/Notify";
import { removeFromWishlist, clearWishlist } from "@/store/wishlistSlice";
import { addToCart } from "@/store/cartSlice";

export default function Wishlist() {
  const dispatch = useDispatch();
  const { products: wishlist } = useSelector((state) => state.wishlist);

  return (
    <div>
      <main id="main-content">
        <ToastContainer />
        {/* ===== Heading & Continue Shopping */}
        <div className="app-max-width px-4 sm:px-8 md:px-20 w-full border-t-2 border-gray100">
          <h1 className="text-2xl sm:text-4xl text-center sm:text-left mt-6 mb-2 animatee__animated animate__bounce">
            Wishlist
          </h1>
          <div className="mt-6 mb-3">
            <Link href="/" className="inline-block">
              <LeftArrow extraClass="inline-block" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* ===== Wishlist Table Section ===== */}
        <div className="app-max-width px-4 sm:px-8 md:px-20 mb-14 flex flex-col lg:flex-row">
          <div className="h-full w-full">
            <table className="w-full mb-6">
              <thead>
                <tr className="border-t-2 border-b-2 border-gray200">
                  <th className="font-normal hidden md:table-cell text-left sm:text-center py-2 xl:w-72">
                    Product Image
                  </th>
                  <th className="font-normal hidden md:table-cell text-left sm:text-center py-2 xl:w-72">
                    Product Name
                  </th>
                  <th className="font-normal md:hidden text-left sm:text-center py-2 xl:w-72">
                    Product Details
                  </th>
                  <th
                    className={`font-normal py-2 ${
                      wishlist.length === 0 ? "text-center" : "text-right"
                    }`}
                  >
                    Unit Price
                  </th>
                  <th className="font-normal hidden sm:table-cell py-2 max-w-xs">
                    Add
                  </th>
                  <th className="font-normal hidden sm:table-cell py-2 text-right w-10 whitespace-nowrap">
                    Remove
                  </th>
                  <th className="font-normal sm:hidden py-2 text-right w-10">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishlist.length === 0 ? (
                  <tr className="w-full text-center h-60 border-b-2 border-gray200">
                    <td colSpan={5}>Wishlist is Empty</td>
                  </tr>
                ) : (
                  wishlist.map((item) => {
                    return (
                      <tr className="border-b-2 border-gray200" key={item.id}>
                        <td className="my-3 flex justify-center flex-col items-start sm:items-center">
                          <Link
                            href={`/product/${encodeURIComponent(
                              item.attributes.slug
                            )}`}
                          >
                            <Image
                              src={
                                item.attributes.thumbnail.data.attributes.url
                              }
                              alt={item.attributes.name}
                              width={125}
                              height={125}
                              className="h-32 xl:mr-4"
                            />
                          </Link>
                          <span className="text-xs md:hidden">
                            {item.attributes.name}
                          </span>
                        </td>
                        <td className="text-center hidden md:table-cell">
                          {item.attributes.name}
                        </td>
                        <td className="text-right text-gray400">
                          Rs. {item.attributes.price.toLocaleString()}/-
                        </td>
                        <td className="text-center hidden sm:table-cell max-w-xs text-gray400">
                          <Button
                            value="Add to Cart"
                            extraClass="hidden sm:block m-auto"
                            onClick={() => {
                              dispatch(
                                addToCart({
                                  ...item,
                                  oneQuantityPrice: item.attributes.price,
                                })
                              );
                              Notify("Success. Check your cart!");
                            }}
                          />
                        </td>
                        <td
                          className="pl-8 text-center"
                          style={{ minWidth: "3rem" }}
                        >
                          <Button
                            value="Add"
                            onClick={() => {
                              dispatch(
                                addToCart({
                                  ...item,
                                  oneQuantityPrice: item.attributes.price,
                                })
                              );
                              Notify("Success. Check your cart!");
                            }}
                            extraClass="sm:hidden mb-4 whitespace-nowrap"
                          />
                          <button
                            onClick={() =>
                              dispatch(removeFromWishlist(item.id))
                            }
                            type="button"
                            className="outline-none text-gray300 hover:text-gray500 focus:outline-none text-4xl sm:text-2xl"
                          >
                            &#10005;
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <div>
              <GhostButton
                onClick={() => dispatch(clearWishlist())}
                extraClass="w-full sm:w-48 whitespace-nowrap"
              >
                Clear Wishlist
              </GhostButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
