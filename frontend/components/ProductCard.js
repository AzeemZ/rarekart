import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ data: { attributes: p, id } }) {
  return (
    <Link
      href={`/product/${p?.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <Image
        width={500}
        height={500}
        src={p?.thumbnail?.data?.attributes?.url}
        alt={p?.name}
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{p?.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">
            Rs. {p?.price.toLocaleString()}/-
          </p>
        </div>
      </div>
    </Link>
  );
}
