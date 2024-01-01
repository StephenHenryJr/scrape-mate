import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
// import SearchHistory from "@/components/SearchHistory";

import Product from "@/lib/models/product.models";
import { connectToDB } from "@/lib/mongoose";
import ProductCard from "@/components/ProductCard";

async function getAllProducts() {
  try {
    await connectToDB();
    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
  }
}

const Home = async () => {

  const allProducts = await getAllProducts();

  return (
    <>
      <section className="flex justify-around px-6 md:px-20 py-24">
        <div className="flex justify-center w-3/4 max-xl:flex-col gap-16">
          {/* Left Side */}
          <div className="flex flex-col justify-center">
            <p className="small-text text-primary-green">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Harness the potential of
              <span className="text-primary"> ScrapeMate</span>
            </h1>

            <p className="mt-6">
              Robust self-service tools for product and growth analytics
              designed to enhance your ability to convert, engage, and maintain
              higher levels of retention.
            </p>

            <SearchBar />
          </div>
          {/* Right Side */}
          <HeroCarousel />
        </div>
      </section>

      {/* <SearchHistory /> */}
      <section className="trending-section">
    <h2 className="section-text">Search History:</h2>
    <div className="flex flex-wrap gap-x-8 gap-y-16">
      {allProducts?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </section>

    </>
  );
};

export default Home;
