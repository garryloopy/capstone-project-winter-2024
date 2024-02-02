"use client"
import ClientMenu from '@/components/ClientMenu';
import SubHeader from '@/components/SubHeader';
import React, { useEffect, useState } from 'react';


// temporary menu display
// to be deleted after the actual menu is implemented
// client wants a cutout photo to be displayed
// might have to use photoshop to produce cutout photos


function Menu() {
    const [menuList, setMenuList] = useState([]);
    const [loading, setLoading] = useState(true)

     async function getAllMenu() {
        setLoading(true)
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
         setLoading(false)
       } catch (error) {
         console.error(
           "An error occurred while fetching the menu list:",
           error
         );
         throw error;
       }
     }
     useEffect(() => {
       getAllMenu();
     }, []);

    

  return (
    <section className="p-[2rem] flex flex-col justify-center items-center gap-6">
      <SubHeader header2="Menu" />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-col-2 grid-cols-1 gap-4 mt-6 mb-8">
        {menuList?.length > 0 &&
          menuList.map((menu) => <ClientMenu {...menu} />)}
      </div>
    </section>
  );
}

export default Menu;

