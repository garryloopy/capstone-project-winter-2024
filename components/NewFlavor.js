import React from 'react'
// import {
//   BsArrowLeftShort,
//   BsArrowRightShort,
// } from "react-icons/bs";
import Link from "next/link";

const images = [
  "/images/gallery01.png",
  "/images/gallery02.png",
  "/images/gallery03.png",
];

const NewFlavor = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };
  return (
    <div className="gallery flex justify-center items-center mb-[4rem] ">
      <div className="gallery-content">
        <h1 className="lnFont_2 bg-gradient-to-r from-orange-400 to-indigo-700
         bg-clip-text text-transparent">Discover Homemade Delights</h1>
        <p className="my-[2rem] leading-8 lnFont font-bold text-slate-700">
          {" "}
          Discover the homemade delights of Miggy’s Munchies, where every bite is crafted with passion and creativity. 
          From our kitchen to your table, enjoy the taste of homemade goodness.
        </p>
        <div className="my-[2rem] hidden xl:block">
          <Link className="btnStyle" href="/menu">
            Order Now
          </Link>
        </div>
      </div>
      {/* <div className="gallery-images">
        <div className="gallery-images-container" ref={scrollRef}>
          {images.map((image, index) => (
            <div
              className="gallery-images-card flex justify-center items-center"
              key={`gallery_image-${index + 1}`}
            >
              <img src={image} alt="gallery" />
              <p className="gallery-desc">
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut
              </p>
            </div>
          ))}
        </div>

        <div className="gallery-images-arrow">
          <BsArrowLeftShort
            className="gallery-arrow-icon"
            onClick={() => scroll("left")}
          />
          <BsArrowRightShort
            className="gallery-arrow-icon"
            onClick={() => scroll("right")}
          />
        </div>
      </div> */}
    </div>
  );
}


export default NewFlavor