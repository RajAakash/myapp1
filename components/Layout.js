import { ShoppingCartIcon, XCircleIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";

export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    if (cart)
      setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart]);

  return (
    <>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between px-4 items-center shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">Ecommerce</a>
            </Link>
            <div>
              <Link href="/upload">
                <button className="bg-transparent hover:bg-blue-500 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Upload
                </button>
              </Link>
              <Link href="/cart">
                <a className="p-2">
                  <button className="bg-transparent hover:bg-blue-500 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="ml-1 rounded-full bg-indigo-600 px-2 py-1 text-xs font-bold text-white">
                        {cartItemsCount}
                      </span>
                    )}
                  </button>
                </a>
              </Link>

              <Link href="/login">
                <a className="px-2">
                  <button className="bg-transparent hover:bg-blue-500 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Login
                  </button>
                </a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          Copyright &copy; 2022 Aakash
        </footer>
      </div>
    </>
  );
}
