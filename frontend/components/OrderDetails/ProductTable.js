import Link from "next/link";
import Image from "next/image";

export default function ProductTable({ products }) {
  return (
    <div className="h-full w-full lg:w-4/6 mr-4">
      <table className="w-full mb-6">
        <thead>
          <tr className="border-t-2 border-b-2 border-gray-200">
            <th className="font-normal text-left sm:text-center py-2 xl:w-72">
              Product Details
            </th>
            <th className={"font-normal py-2 hidden sm:block text-center"}>
              Unit Price
            </th>
            <th className="font-normal py-2">Quantity</th>
            <th className="font-normal py-2 text-center">Amount</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr className="w-full text-center h-60 border-b-2 border-gray-200">
              <td colSpan={5}>You have not placed any order yet!</td>
            </tr>
          ) : (
            products.map((product) => {
              return (
                <tr className="border-b-2 border-gray-200" key={product.id}>
                  <td className="my-3 flex flex-col xl:flex-row items-start sm:items-center xl:space-x-2 text-center xl:text-left">
                    <Link
                      href={`/product/${encodeURIComponent(
                        product.attributes.slug
                      )}`}
                    >
                      <Image
                        src={product.attributes.thumbnail.data.attributes.url}
                        alt={product.attributes.name}
                        width={95}
                        height={128}
                        className="h-32 xl:mr-4"
                      />
                    </Link>
                    <span>{product.attributes.name}</span>
                  </td>
                  <td className="text-center text-gray-400 hidden sm:table-cell">
                    Rs. {product.attributes.price.toLocaleString()}/-
                  </td>
                  <td className="text-center text-gray-400">
                    {product.quantity}
                    <br />
                  </td>
                  <td className="text-center text-gray-400">
                    Rs.{" "}
                    {(
                      product.attributes.price * product.quantity
                    ).toLocaleString()}
                    /-
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
