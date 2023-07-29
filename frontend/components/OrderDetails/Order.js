import ProductTable from "./ProductTable";
import OrderSummary from "./OrderSummary";

export default function Order({ order }) {
  return (
    <div
      key={order.id}
      className="my-10 mx-5 px-6 md:mx-14 md:px-6 pt-3 border-2 border-gray-300 bg-lime-50"
    >
      <div className="app-max-width mb-4 w-ful">
        <h2 className="text-xl animatee__animated animate__bounce">
          Order #{order.id}
        </h2>
      </div>
      <div className="app-max-width mb-14 flex flex-col lg:flex-row">
        <ProductTable products={order.attributes.products} />
        <OrderSummary total={order.attributes.total} />
      </div>
    </div>
  );
}
