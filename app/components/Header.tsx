"use client";

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import logo from "../images/logo-new.svg";
import topIcon from "../images/home-event.svg";
import Image from "next/image";

function Header() {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="border-b
      flex 
      flex-col
      gap-4
      w-full
      md:flex-row
      md:gap-0
      items-center
      justify-between p-4
      text-slate-700
      "
    >
      <div className="flex items-center flex-col gap-2 w-full max-w-[960px] mx-auto">
        <div className="text-sm font-light flex items-center gap-3 justify-between w-full">
          <div className="text-sm font-light flex items-center gap-3 pl-4 md:pl-0">
            <Image src={logo} alt={"logo"} />
            <Bars3Icon
              width={20}
              height={20}
              color="rgb(0, 208, 148)"
              className="hidden md:flex cursor-pointer min-w-[20px]"
            />
            <span className="text-sm font-light text-primary hidden md:flex whitespace-nowrap">
              카테고리
            </span>
          </div>

          <div className="group hidden md:flex">
            <div
              className={`px-4 py-2 flex items-center gap-2 border rounded-md ml-6 relative ${
                focused ? "border-primary" : ""
              }`}
            >
              <MagnifyingGlassIcon
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <input
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                type="search"
                placeholder="살까말까 고민된다면 검색해보세요!"
                className="font-light text-sm outline-none border-none min-w-[250px]"
              />

              <div
                className={`absolute left-0 right-0 z-10 mt-[8.5rem] rounded-md bg-white shadow-lg ${
                  focused ? "" : "hidden"
                }`}
              >
                <div className="py-1">
                  <div className="text-gray-700 block px-4 py-2 text-sm cursor-pointer bg-white hover:opacity-80">
                    최근 검색어
                  </div>
                  <div className="text-gray-700 block px-4 py-2 text-sm cursor-pointer bg-white hover:opacity-80">
                    최근 검색 내용이 없어요
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm font-light hidden md:flex items-center gap-2">
            <Image src={topIcon} alt={"event"} className="cursor-pointer" />
            <div className="w-2 flex justify-center text-slate-300">|</div>
            <div className="font-semibold cursor-pointer whitespace-nowrap">
              로그인 / 회원가입
            </div>
          </div>
          <div className="text-sm font-light flex md:hidden items-center gap-4">
            <BellIcon width={24} height={24} className="cursor-pointer" />
            <MagnifyingGlassIcon
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
