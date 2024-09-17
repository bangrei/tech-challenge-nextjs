"use client"

import {
    HomeIcon,
    MagnifyingGlassIcon,
    Bars3Icon,
    HeartIcon,
    UserIcon,
} from "@heroicons/react/24/outline"

import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  Bars3Icon as Bars3IconSolid,
  HeartIcon as HeartIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";
import React from "react";
import { useMainStore } from "@/store/MainStore";

function Footer() {
    const [activeFooterId, setFooterId] = useMainStore((state) => [
      state.activeFooterId,
      state.setFooterId,
    ]);
    return (
      <div
        className="shadow-lg border-t flex md:hidden fixed bottom-0 z-20 bg-white
            gap-4
            w-full
            md:gap-0
            items-center
            justify-between p-4
            text-slate-700
            md:px-20 
            md:space-x-8
            overflow-hidden
            rounded-xl"
      >
        <div className="flex items-center justify-between gap-4 w-full px-4">
          <div
            className="flex flex-col gap-2 items-center cursor-pointer hover:opacity-60"
            onClick={() => setFooterId(0)}
          >
            {activeFooterId == 0 && (
              <HomeIconSolid width={32} height={32} className="text-primary" />
            )}
            {activeFooterId !== 0 && <HomeIcon width={32} height={32} />}
            <span className="text-xs font-thin">홈</span>
          </div>
          <div
            className="flex flex-col gap-2 items-center cursor-pointer hover:opacity-60"
            onClick={() => setFooterId(1)}
          >
            {activeFooterId == 1 && (
              <MagnifyingGlassIconSolid
                width={32}
                height={32}
                className="text-primary"
              />
            )}
            {activeFooterId !== 1 && (
              <MagnifyingGlassIcon width={32} height={32} />
            )}
            <span className="text-xs font-thin">검색</span>
          </div>
          <div
            className="flex flex-col gap-2 items-center cursor-pointer hover:opacity-60"
            onClick={() => setFooterId(2)}
          >
            {activeFooterId == 2 && (
              <Bars3IconSolid width={32} height={32} className="text-primary" />
            )}
            {activeFooterId !== 2 && <Bars3Icon width={32} height={32} />}
            <span className="text-xs font-thin">카테고리</span>
          </div>
          <div
            className="flex flex-col gap-2 items-center cursor-pointer hover:opacity-60"
            onClick={() => setFooterId(3)}
          >
            {activeFooterId == 3 && (
              <HeartIconSolid width={32} height={32} className="text-primary" />
            )}
            {activeFooterId !== 3 && <HeartIcon width={32} height={32} />}
            <span className="text-xs font-thin">좋아요</span>
          </div>
          <div
            className="flex flex-col gap-2 items-center cursor-pointer hover:opacity-60"
            onClick={() => setFooterId(4)}
          >
            {activeFooterId == 4 && (
              <UserIconSolid width={32} height={32} className="text-primary" />
            )}
            {activeFooterId !== 4 && <UserIcon width={32} height={32} />}
            <span className="text-xs font-thin">마이페이지</span>
          </div>
        </div>
      </div>
    );
}

export default Footer;
