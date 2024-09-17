"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [pages, setPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);

  const perPage = 10;

  const _changePage = (num: any) => {
    setPageNum(num);
  };

  const fetchData = () => {
    const skip = perPage * pageNum;
    var url = "https://dummyjson.com/products";
    if (keyword != "") url += `/search?q=${keyword}`;
    else {
      url += `?limit=${perPage}`;
      if (skip > 0) url += `&skip=${skip}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        var products: Product[] = [];
        if (data.products.length) {
          for (const it in data.products) {
            const prd = data.products[it];
            const product = {
              id: prd.id as String,
              title: prd.title as String,
              brand: prd.brand as String,
              category: prd.category as String,
              description: prd.description as String,
              images: prd.images as String[],
              availabilityStatus: prd.availabilityStatus as String,
              price: prd.price,
            } as Product;
            products.push(product);
          }
        }
        let total = data.total;
        let pages = Math.floor(total / perPage);
        if (total % perPage != 0) pages += 1;
        setPages(pages);
        setProducts(data.products);
        setLoading(false);
      });
  };
  const _search = (val: string) => {
    setKeyword(val);
    fetchData();
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [pageNum]);
  return (
    <div className="w-full h-full flex flex-col gap-4 text-slate-600 p-8">
      <div className="w-full flex p-8">
        <div className="px-4 py-2 flex items-center gap-2 border rounded-md relative mx-auto">
          <MagnifyingGlassIcon
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <input
            onChange={(e) => _search(e.target.value)}
            type="text"
            placeholder="Search"
            className="font-light text-sm outline-none border-none min-w-[250px]"
          />
        </div>
      </div>
      {loading && <div className="flex justify-center">Loading...</div>}
      {products.map((product: Product) => {
        return (
          <div className="flex p-8 border gap-4" key={product.id}>
            <div className="max-w-[100px]">
              <Image
                className="min-w-[100px]"
                src={product.images[0]}
                alt={product.title}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-2xl">{product.title}</span>
              <span>${product.price.toString()}</span>
              <span className="text-xs">{product.description}</span>
              <Link
                className="text-blue-400 text-xs"
                href={`/product/${product.id}`}
              >
                View Details
              </Link>
            </div>
          </div>
        );
      })}
      <div className="flex gap-2 items-start">
        {!loading && <div>Page: </div>}
        <div className="flex gap-4 flex-wrap items-start">
          {Array.from({ length: pages }, (_, i) => {
            return (
              <div
                key={i}
                className={`border rounded-xl cursor-pointer px-4 py-2 ${
                  i == pageNum ? "border-red-300 text-red-500" : ""
                }`}
                onClick={() => _changePage(i)}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
