"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const params = useParams();
  const id = params.id[0];
  const fetchData = () => {
    var url = "https://dummyjson.com/products/" + id;
    fetch(url)
      .then((res) => res.json())
      .then((prd) => {
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
        setProduct(product);
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  else if (!product) return <div>No Product found...</div>;
  return (
    <div className="flex flex-col p-8 border gap-4">
      <Link href={"/"}>Back</Link>
      <div className="w-full max-w-[400px] mx-auto border">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop={product.images.length > 4}
          autoplay={{ delay: 4000 }}
          className="w-full"
        >
          {product.images.map((item: any) => {
            return (
              <SwiperSlide className="w-full" key={item}>
                <Image
                  src={item}
                  alt={product.title}
                  width={500}
                  height={500}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <span className="font-bold text-2xl">{product.title}</span>
        <span>${product.price.toString()}</span>
        <span className="text-green-500">{product.availabilityStatus}</span>
        <span className="text-xs">{product.description}</span>
      </div>
    </div>
  );
}
