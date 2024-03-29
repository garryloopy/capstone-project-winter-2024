"use client";
import ClientMenu from "@/components/ClientMenu";
import Loading from "@/components/Loading";
import SubHeader from "@/components/SubHeader";
import MenuScroll from "@/components/MenuScroll";
import React, { useEffect, useState } from "react";
import Search from "../icons/Search";

function Menu() {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [menuListSearch, setMenuListSearch] = useState([]);

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
        <section className="md:p-[6rem] p-4 flex flex-col justify-center items-center gap-6">
          <SubHeader header2="Menu" />

          {/* search bar */}
          <form className="md:max-w-[50%] w-full flex my-[2rem] justify-center">
            <label className="relative w-full flex">
              <input
                className=" w-full min-h-[50px] text-[20px] bg-white border-2 border-orange-500 px-[1rem] rounded-md tracking-wider"
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
              />
              <div className="absolute right-[3%] top-[20%]">
                <Search className="text-gray-400 w-6 h-6" />
              </div>
            </label>
            {/* <button
              className="min-h-[50px] font-bold text-[15px] bg-orange-500 cursor-pointer px-[1rem] rounded-tr-[5px] rounded-br-[5px] text-white flex-[0.5] tracking-wider"
              type="submit"
            >
              Search
            </button> */}
          </form>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-2 grid-cols-1 gap-4 mt-6 mb-8">
            {!search && menuList.length > 0 ? (
              menuList.map((menu) => <ClientMenu key={menu._id} {...menu} />)
            ) : menuListSearch?.length > 0 ? (
              menuListSearch.map((menu) => (
                <ClientMenu key={menu._id} {...menu} />
              ))
            ) : (
              <div>
                <p className=" text-white text-lg">
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
