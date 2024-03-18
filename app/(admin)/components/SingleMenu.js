"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const SingleMenu = (menu) => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center">
        <Image
          className="circular-image-menu border-2 border-orange-400"
          src={menu.image}
          alt={menu.image}
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col gap-3 justify-center items-center mt-4">
        <h4 className="text-primary font-bold lg:text-xl text-md">
          {menu.title}
        </h4>
      </div>
    </div>
  );
};
export default SingleMenu;
