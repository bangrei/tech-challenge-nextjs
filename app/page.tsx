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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [sortPrice, setsortPrice] = useState("asc");
  const [allProducts, setAllProducts] = useState<Product[] | []>([]);
  const [products, setProducts] = useState<Product[] | []>([]);

  const perPage = 10;

  const _changePage = (num: any) => {
    setPageNum(num);
  };

  const fetchCategories = async () => {
    await fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  };
  const fetchData = async () => {
    const skip = perPage * pageNum;
    var url = "https://dummyjson.com/products";
    if (selectedCategory) url += `/category/${selectedCategory}`;
    if (keyword != "")
      url += `${selectedCategory ? "?" : "/"}search?q=${keyword}`;
    else {
      url += `?limit=${perPage}`;
      if (skip > 0) url += `&skip=${skip}`;
    }
    url += `&sortBy=price&order=${sortPrice}`;
    await fetch(url)
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
        setProducts(products);
        setAllProducts(products);
        setLoading(false);
      });
  };
  const _search = (val: string) => {
    if (selectedCategory) {
      const prd = allProducts.filter((p) => {
        return (
          p.title.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          p.description.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
      setProducts(prd);
      return;
    }
    setKeyword(val);
  };
  const _selectCategory = (cat: string) => {
    setSelectedCategory(cat);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [pageNum, keyword, selectedCategory, sortPrice]);
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
      <div className="w-full flex flex-col md:flex-row py-8 gap-8 md:items-center justify-between relative">
        <div className="flex items-center gap-4">
          <div className="">Category: </div>
          <div className="px-4 py-2 flex items-center justify-between gap-2 border rounded-md relative mx-auto">
            <select
              className="outline-none"
              onChange={(e) => _selectCategory(e.target.value)}
            >
              <option value={""}>-- Select category --</option>
              {categories.map((c) => {
                return <option key={c}>{c}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="">Sort by Price: </div>
          <div className="px-4 py-2 flex items-center justify-between gap-2 border rounded-md relative mx-auto">
            <select
              className="outline-none"
              onChange={(e) => setsortPrice(e.target.value)}
            >
              <option value={"asc"}>ASC</option>
              <option value={"desc"}>DESC</option>
            </select>
          </div>
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
