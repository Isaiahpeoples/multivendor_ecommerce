import Header from "@/components/store/layout/header/header";
import ProductList from "@/components/store/shared/product-list";
import { FiltersQueryType } from "@/lib/types";
import { getProducts } from "@/queries/product";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: FiltersQueryType;
}) {
  const { category, offer, search, size, sort, subCategory } = searchParams;
  const products_data = await getProducts(
    {
      search,
      category,
      subCategory,
      offer,
      size: Array.isArray(size)
        ? size
        : size
        ? [size] // Convert single size string to array
        : undefined, // If no size, keep it undefined
    },
    sort
  );
  const { products } = products_data;

  return (
    <>
      <Header />
      <div className="max-w-[95%] mx-auto">
        <div className="flex mt-5 gap-x-5">
          {/* Product filters */}
          <div className="p-4 space-y-5">
            {/* Product sort */}
            {/* Product list */}
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </>
  );
}
