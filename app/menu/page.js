"use client";
import ClientMenu from "@/components/ClientMenu";
import Loading from "@/components/Loading";
import SubHeader from "@/components/SubHeader";
import MenuScroll from "@/components/MenuScroll";
import React, { useEffect, useState } from "react";
import Search from "../icons/Search";
import InputAnimation from "@/components/InputAnimation";

import { IoGridOutline, IoReorderFourOutline } from "react-icons/io5";

function Menu() {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [menuListSearch, setMenuListSearch] = useState([]);

  // State for display by, "GRID" by default
  const [displayBy, setDisplayBy] = useState("GRID");

  const handleOnDisplayByButtonClick = (displayType) => {
    if (!displayType) return;

    if (!["GRID", "ROW"].includes(displayType.toUpperCase())) return;

    setDisplayBy(displayType.toUpperCase());
  };

  async function getAllMenu() {
    setLoading(true);
    try {
      const res = await fetch("/api/getMenuList", {
        cache: "no-store",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setMenuList(data);
      } else {
        console.log("Failed to fetch menu list");
      }
      setLoading(false);
    } catch (error) {
      console.error("An error occurred while fetching the menu list:", error);
      throw error;
    }
  }

  // handle change search input
  const handleSearchChange = (ev) => {
    let inputValue = ev.target.value;
    setSearch(inputValue);
    if (inputValue !== "") {
      let searchList = menuList.filter((menu) =>
        menu.title.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setMenuListSearch(searchList);
    } else {
      setMenuListSearch([]);
    }
  };

  //handle submit search input
  // const handleSearchSubmit = (ev) => {
  //   ev.preventDefault();
  //   if (search !== "") {
  //     let searchList = menuList.filter((menu) =>
  //       menu.title.toLowerCase().startsWith(search.toLowerCase())
  //     );
  //     setMenuListSearch(searchList);
  //   } else {
  //     setMenuListSearch([]);
  //   }
  // };
  useEffect(() => {
    getAllMenu();
  }, []);

  return (
    <>
      <MenuScroll />
      {loading ? (
        <Loading />
      ) : (
        <section className="md:p-[6rem] p-4 mt-32 flex flex-col justify-center items-center gap-6">
          <SubHeader header2="Menu" />

          {/* search bar */}
          <form className="lg:max-w-[50%] w-full flex my-[2rem] justify-center">
            <label className="h-10 text-md w-full flex-1 relative flex flex-col justify-end cursor-text border-2 rounded-md shadow-md focus-within:shadow-md transition-shadow duration-300 group bg-white">
              <input
                className="w-full px-4 h-10 outline-none peer bg-gray-100 p-2 text-gray-600 rounded-md text-md focus:bg-slate-50 focus:ring-2 focus:ring-lime-400"
                type="text"
                value={search}
                onChange={handleSearchChange}
              />
              <InputAnimation text="Search" stateValue={search} />

              <div className="absolute inset-0 flex items-center justify-end px-2">
                <Search className="text-gray-400 w-5 h-5" />
              </div>
            </label>
            {/* <button
              className="min-h-[50px] font-bold text-[15px] bg-orange-500 cursor-pointer px-[1rem] rounded-tr-[5px] rounded-br-[5px] text-white flex-[0.5] tracking-wider"
              type="submit"
            >
              Search
            </button> */}
          </form>

          <div className="w-full h-max p-4 flex flex-row justify-center">
            <div className="flex flex-row gap-4 items-center">
              <p className="font-semibold">Display by:</p>
              <button
                data-selected={displayBy === "GRID"}
                className="w-28 h-8 data-[selected=true]:bg-lime-500 font-semibold rounded-3xl flex flex-row items-center justify-center gap-2"
                onClick={() => handleOnDisplayByButtonClick("GRID")}
              >
                <IoGridOutline size={20} />
                Grid
              </button>
              <button
                data-selected={displayBy === "ROW"}
                className="w-28 h-8 data-[selected=true]:bg-lime-500 font-semibold rounded-3xl flex flex-row items-center justify-center gap-2"
                onClick={() => handleOnDisplayByButtonClick("ROW")}
              >
                <IoReorderFourOutline size={20} />
                Row
              </button>
            </div>
          </div>

          <div
            className={
              displayBy === "GRID"
                ? "grid xl:grid-cols-3 md:grid-cols2 grid-cols-1 lg:gap-8 md:gap-6 gap-2 mt-6 mb-8"
                : "flex flex-col gap-6"
            }
          >
            {!search && menuList.length > 0 ? (
              menuList.map((menu) => <ClientMenu key={menu._id} {...menu} />)
            ) : menuListSearch?.length > 0 ? (
              menuListSearch.map((menu) => (
                <ClientMenu key={menu._id} {...menu} />
              ))
            ) : (
              <div>
                <p className=" text-black text-lg">
                  Sorry, There is no matching menu.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Menu;
