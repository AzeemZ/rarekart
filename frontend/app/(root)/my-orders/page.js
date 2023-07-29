"use client";
import Order from "@/components/OrderDetails/Order";
import { fetchUserOrders } from "@/utils/api";
import useSWR from "swr";
import { useSelector } from "react-redux";
import OrderDetailsSkeleton from "@/components/Skeletons/OrderDetailsSkeleton";

export default function MyOrders() {
  const { user } = useSelector((state) => state.user);
  const { data, isLoading } = useSWR(
    `/api/orders?filters[user]=${user?.id}`,
    fetchUserOrders
  );

  return (
    <main id="main-content">
      {/* ===== Heading ===== */}
      <div className="app-max-width px-4 sm:px-8 md:px-20 w-full border-t-2 border-gray-100">
        <h1 className="text-2xl sm:text-4xl text-center sm:text-left mt-6 mb-2 animatee__animated animate__bounce">
          My Orders
        </h1>
      </div>

      {/* ===== Order Details Section ===== */}
      {isLoading === undefined || isLoading ? (
        <>
          <OrderDetailsSkeleton />
          <OrderDetailsSkeleton />
        </>
      ) : data?.length === 0 ? (
        <div className="app-max-width px-4 sm:px-8 md:px-20 w-full my-20 font-light">
          <h1 className="text-2xl sm:text-4xl text-center sm:text-left mt-6 mb-2 animatee__animated animate__bounce">
            You have not placed any order yet!
          </h1>
        </div>
      ) : (
        data?.map((order) => <Order key={order.id} order={order} />)
      )}
    </main>
  );
}
