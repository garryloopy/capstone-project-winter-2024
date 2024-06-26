"use client";
import AdminModal from "./(admin)/components/AdminModal";
import NewFlavor from "@/components/NewFlavor";
import About from "@/components/About";
import { useSession } from "next-auth/react";
import Slideshow from "@/components/Slider";
import Link from "next/link";
import "./slides.css";


export default function HomePage() {
  const session = useSession();
  const { status } = session;
  return (
    <>
      <section className="md:px-[4rem] px-[2rem] py-[2rem] mt-32 text-slate-800 flex flex-col items-center justify-center my-[6rem]">
        <div className="flex flex-wrap items-start justify-center">
          <div className="flex flex-col xl:flex-row">
            <div className="w-full md:w-1/2">
              <NewFlavor />
            </div>
            <div className="w-full xl:w-1/2 md:mt-0">
              {/* we can adjust the margin top here, this is to accommodate different resolution */}
              <Slideshow />
            </div>
          </div>
          <div className="my-[2rem] xl:hidden flex items-center justify-center mb-[3rem]">
            <Link className="btnStyle" href="/menu">
              Order Now
            </Link>
          </div>
        </div>
        <About />
        {status === "unauthenticated" ? <AdminModal /> : null}
      </section>
    </>
  );
}
