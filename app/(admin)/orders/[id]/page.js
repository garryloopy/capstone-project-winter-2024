"use client";

import Link from "next/link";

import SubHeader from "@/components/SubHeader";
import { useEffect, useState } from "react";
import AdminNavbar from "@/app/(admin)/components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useParams } from "next/navigation";

import { FaAngleLeft, FaAngleDown, FaAngleUp } from "react-icons/fa6";

import OrderStatus from "../../components/OrderStatus";

import Image from "next/image";

export default function OrderDetailsPage({ params }) {
  const [clientInfo, setClientInfo] = useState();
  const [cartProducts, setCartProducts] = useState([]);
  const [formattedDate, setFormattedDate] = useState();
  const [cardBrand, setCardBrand] = useState();
  const [lastDigits, setLastDigits] = useState();
  const [orderId, setOrderId] = useState();

  const [isMoreOptionsOpened, setIsMoreOptionsOpened] = useState(false);

  const { id } = useParams();

  const session = useSession();
  const { status } = session;
  const path = usePathname();

  if (status === "unauthenticated") {
    return redirect("/sign-in");
  }

  const getOrderInfo = async () => {
    if (id) {
      const res = await fetch(`/api/getOrder?id=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const result = await res.json();
        console.log(result);

        //format the date of order
        const createdAtDate = new Date(result[0]?.createdAt);

        const options = {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        };

        const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
        const formattedDate = dateTimeFormat.format(createdAtDate);
        setFormattedDate(formattedDate);

        setClientInfo(result[0]?.clientInfo);
        setCartProducts(result[0]?.cartProducts);
        setOrderId(result[0]?.orderId);
        setCardBrand(result[0]?.cardBrand);
        setLastDigits(result[0]?.lastFourDigits);
      } else {
        console.log("Error to fetch order info");
      }
    }
  };

  useEffect(() => {
    if (params && params.id && id) {
      getOrderInfo();
    }
  }, []);

  const handleOnMoreOptionsButtonClick = () => {
    setIsMoreOptionsOpened(!isMoreOptionsOpened);
  };

  const debug = () => {
    console.log("Formatted Date: ", formattedDate);
    console.log("Client info: ", clientInfo);
    console.log("Cart products: ", cartProducts);
    console.log("Order ID: ", orderId);
    console.log("Card brand: ", cardBrand);
    console.log("Last digits: ", lastDigits);
  };

  return (
    <section className="flex flex-col items-center w-full min-h-screen h-screen px-12 py-8 overflow-auto">
      <button className="px-4 py-2 border bg-gray-50" onClick={debug}>
        Debug
      </button>
      <AdminNavbar path={path} />
      <SubHeader header2="Order Details" />

      <div className="bg-gray-100 w-full h-full rounded-md flex flex-col">
        {/* Top section  */}
        <div className="relative flex-none h-16 w-full px-6">
          <Link
            href="/orders"
            className="flex flex-row items-center gap-1 w-max h-full text-xl font-medium text-gray-600 hover:text-gray-950 transition-colors duration-200"
          >
            <FaAngleLeft size={28} className="text-orange-600" />
            Back to orders
          </Link>
        </div>

        {/* Main section  */}
        <div className="flex-1 h-full bg-gray-50 flex flex-col">
          {/* Main section header  */}
          <div className="flex flex-row justify-between h-24 items-center px-8 border-b divide-x">
            {orderId && (
              <p className="text-center w-full">Order ID: {orderId}</p>
            )}
            {formattedDate && (
              <p className="text-center  w-full">Date: {formattedDate}</p>
            )}
            {cardBrand && lastDigits && (
              <p className="text-center  w-full">
                Payment: {cardBrand} xxxxxxxxxxxx{lastDigits}
              </p>
            )}
            {id && <p className="text-center  w-full">Payment ID: {id}</p>}
          </div>

          {/* Container  */}
          <div className="flex-1 flex flex-row">
            {/* Left side  */}
            <div className="flex-1 p-8 flex flex-col">
              {/* Top section of left side  */}
              <div className="flex h-16 flex-row justify-between">
                <p>Order Summary:</p>
                {cartProducts && (
                  <p>
                    {cartProducts.length} item
                    {cartProducts.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>
              {/* Orders section  */}
              <div className="flex-1 overflow-y-auto">
                {cartProducts?.length > 0 &&
                  cartProducts.map((product) => {
                    console.log(product);
                    console.log(product.specialRequest);

                    return (
                      <div className="flex flex-row border py-3 px-4 bg-gray-100 rounded-md">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={200}
                          height={200}
                          className="circular-image"
                        />
                        <div>
                          <h3 className="text-orange-500 font-semibold">
                            {product.title}
                          </h3>
                          {product.sizes && (
                            <div className="text-sm ">
                              <span>{product.sizes.name}</span>
                            </div>
                          )}
                          {product.extra?.length > 0 && (
                            <div className="text-sm text-gray-950">
                              {product.extra.map((extra, index) => (
                                <div key={index}>
                                  {extra.name} ${extra.price}
                                </div>
                              ))}
                            </div>
                          )}
                          <p className="text-sm text-gray-950">
                            {product.specialRequest}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Right side  */}
            <div className="flex-1 border-l">
              {/* Order Status  */}
              <div className="w-full h-24 flex flex-row justify-between items-center px-8">
                <p className="text-xl font-semibold text-gray-800">
                  Order Status:
                </p>

                <div className="relative">
                  <OrderStatus orderStatus="PENDING" />
                  <div
                    className="absolute inset-0 flex items-center justify-end p-2 cursor-pointer"
                    onClick={handleOnMoreOptionsButtonClick}
                  >
                    {isMoreOptionsOpened ? (
                      <FaAngleDown size={16} />
                    ) : (
                      <FaAngleUp size={16} />
                    )}

                    {isMoreOptionsOpened && (
                      <div className="min-w-56 min-h-12 h-max bg-gray-100 absolute inset-y-11 right-0 divide-y rounded-md overflow-hidden">
                        <button className="px-6 py-4 w-full hover:bg-gray-100 ">
                          Mark as completed
                        </button>
                        <button className="px-6 py-4 w-full hover:bg-gray-100 ">
                          Mark as pending
                        </button>
                        <button className="px-6 py-4 w-full hover:bg-gray-100 ">
                          Mark as cancelled
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact info section  */}
              <div className="w-full flex flex-col justify-center items-start gap-4 p-8">
                <p className="text-2xl font-medium text-gray-700">
                  Contact Information
                </p>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-row gap-4 text-xl items-center">
                    <p className="min-w-28">Email:</p>
                    <div>
                      <p className="text-gray-600">{clientInfo?.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 text-xl items-center">
                    <p className="min-w-28">Address:</p>
                    <div>
                      <p className="text-gray-600">{clientInfo?.address}</p>
                      <p className="text-gray-600">Canada, Alberta, Calgary</p>
                      <p className="text-gray-600">{clientInfo?.zip}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}