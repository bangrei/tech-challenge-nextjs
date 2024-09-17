"use client";

import React, { useEffect } from "react";
import { useMainStore } from "@/store/MainStore";
import Shortcuts from "./Shortcuts";
import Banners from "./Banners";
import Collections from './Collections';

function Board() {
  const [
    loading,
    mainCollection,
    collections,
    retrieveData,
  ] = useMainStore((state) => [
    state.loading,
    state.mainCollection,
    state.collections,
    state.retrieveData,
  ]);

  useEffect(() => {
    retrieveData();
  }, []);

  if (loading)
    return (
      <div className="w-full h-full p-4 flex flex-col items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col gap-12 bg-white">
      <Banners />
      <Shortcuts />
      <Collections collections={[mainCollection]} />
      <Collections collections={collections} />
    </div>
  );
}

export default Board;
