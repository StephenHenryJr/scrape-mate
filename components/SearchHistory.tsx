'use server'

import { getAllProducts } from "@/lib/actions";
import ProductCard from "./ProductCard";

const SearchHistory = async () => {

  const allProducts = await getAllProducts();
  return (
    <section className="trending-section">
    <h2 className="section-text">Search History:</h2>
    <div className="flex flex-wrap gap-x-8 gap-y-16">
      {allProducts?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </section>
  )
}

export default SearchHistory