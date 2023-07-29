import { Fragment } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "@/store/userSlice";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/" },
];

export default function MobileMenu({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  categories,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {data.map((item) => {
        return (
          <Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>

                {showCatMenu && (
                  <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                    {categories?.map(({ attributes: c, id }) => {
                      return (
                        <Link
                          key={id}
                          href={`/category/${c.slug}`}
                          onClick={() => {
                            setShowCatMenu(false);
                            setMobileMenu(false);
                          }}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {c.name}
                            <span className="opacity-50 text-sm">
                              {`(${c.products.data.length})`}
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="py-4 px-5 border-b">
                <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                  {item.name}
                </Link>
              </li>
            )}
          </Fragment>
        );
      })}
      {!user.id ? (
        <li className="py-4 px-5 border-b">
          <Link href="/login" onClick={() => setMobileMenu(false)}>
            Login
          </Link>
        </li>
      ) : (
        <>
          <li className="py-4 px-5 border-b">
            <Link href="/my-profile" onClick={() => setMobileMenu(false)}>
              My Profile
            </Link>
          </li>
          <li className="py-4 px-5 border-b">
            <Link href="/my-orders" onClick={() => setMobileMenu(false)}>
              My Orders
            </Link>
          </li>
          <li className="py-4 px-5 border-b">
            <Link
              href="/"
              onClick={() => {
                setMobileMenu(false);
                dispatch(removeUser());
              }}
            >
              Logout
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
