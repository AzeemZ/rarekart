export default function OrderSummary({ total }) {
  return (
    <div className="h-full w-full lg:w-4/12 mt-10 lg:mt-0">
      {/* Cart Totals */}
      <div className="border border-gray-500 divide-y-2 divide-gray-200 p-6">
        <h2 className="text-xl mb-3 font-semibold uppercase">Order Summary</h2>
        <div className="flex justify-between py-2">
          <span>Grand Total</span>
          <span>Rs. {total?.toLocaleString()}/-</span>
        </div>
        <div className="py-3">
          <span className="uppercase font-medium">Delivery Address</span>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between">
              House No. 156, Street No. 26, Block B,
            </div>
            <div className="flex justify-between">Johar Town, Lahore</div>
            <div className="flex justify-between">Pakistan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
