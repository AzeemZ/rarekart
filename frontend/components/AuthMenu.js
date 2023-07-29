import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "@/store/userSlice";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AuthMenu({ user }) {
  const dispatch = useDispatch();

  if (!user.id) {
    return (
      <div className="flex flex-1 items-center justify-end space-x-3">
        <Link
          href="/login"
          className="hidden sm:block text-md font-medium text-gray-700 hover:text-gray-800"
        >
          Login
        </Link>
        <span
          className="hidden lg:inline h-6 w-px bg-gray-200"
          aria-hidden="true"
        />
        <Link
          href="/register"
          className="hidden lg:inline text-md font-medium text-gray-700 hover:text-gray-800"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <Disclosure as="nav" className="bg-white">
      {() => (
        <>
          <div className="hidden md:block lg:px-2">
            <div className="relative flex h-auto items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto">
                {/* Profile dropdown  */}
                <Menu as="div" className="relative sm:ml-1 sm:mx-2">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm md:ring-2 md:ring-stone-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={
                          !user.avatar_url
                            ? "/avatar-placeholder.png"
                            : user.avatar_url
                        }
                        alt="Avatar"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/my-profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            My Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/my-orders"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            My Orders
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={() => dispatch(removeUser())}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
