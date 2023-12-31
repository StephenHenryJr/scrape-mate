import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
import SearchHistory from "@/components/SearchHistory";

export const dynamic = 'force-dynamic'

const Home = async () => {

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

            <h1 className="head-text">s
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
      <SearchHistory />
    </>
  );
};


export default Home;
