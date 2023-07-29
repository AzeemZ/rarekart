import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";

import Heart from "../../public/icons/Heart";
import HeartSolid from "../../public/icons/HeartSolid";
import styles from "./Card.module.css";
import { addToWishlist, removeFromWishlist } from "@/store/wishlistSlice";
import { addToCart } from "@/store/cartSlice";

export default function Card({ item, product }) {
  const dispatch = useDispatch();
  const { products: wishlist } = useSelector((state) => state.wishlist);
  const [isHovered, setIsHovered] = useState(false);
  const [isWLHovered, setIsWLHovered] = useState(false);

  const { id, name, price, img1, img2 } = item;

  const itemLink = `/product/${encodeURIComponent(product.attributes.slug)}`;

  const alreadyWishlisted =
    wishlist?.filter((wItem) => wItem.id === id).length > 0;

  const handleWishlist = () => {
    alreadyWishlisted
      ? dispatch(removeFromWishlist(item.id))
      : dispatch(addToWishlist(product));
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Link
          href={itemLink}
          tabIndex={-1}
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isHovered && (
            <Image
              src={img1}
              alt={name}
              width={230}
              height={300}
              layout="responsive"
            />
          )}
          {isHovered && (
            <Image
              className="transition-transform transform hover:scale-110 duration-1000"
              src={img2}
              alt={name}
              width={230}
              height={300}
              layout="responsive"
            />
          )}
        </Link>
        <button
          type="button"
          className="absolute top-2 right-2 p-1 rounded-full"
          aria-label="Wishlist"
          onClick={handleWishlist}
          onMouseOver={() => setIsWLHovered(true)}
          onMouseLeave={() => setIsWLHovered(false)}
        >
          {isWLHovered || alreadyWishlisted ? <HeartSolid /> : <Heart />}
        </button>
        <button
          type="button"
          onClick={() =>
            dispatch(addToCart({ ...product, oneQuantityPrice: price }))
          }
          className={styles.addBtn}
        >
          Add to Cart
        </button>
      </div>

      <div className="content">
        <Link href={itemLink} className={styles.itemName}>
          {name}
        </Link>
        <div className="text-gray400">Rs. {price.toLocaleString()}/-</div>
        <button
          type="button"
          onClick={() =>
            dispatch(addToCart({ ...product, oneQuantityPrice: price }))
          }
          className="uppercase font-bold text-sm sm:hidden"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
