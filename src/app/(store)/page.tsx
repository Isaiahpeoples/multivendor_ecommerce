import { useCartStore } from "@/cart-store/useCartStore";
import CategoriesHeader from "@/components/store/layout/categories-header/categories-header";
import Header from "@/components/store/layout/header/header";
import ProductList from "@/components/store/shared/product-list";
import useFromStore from "@/hooks/useFromStore";
import { getProducts } from "@/queries/product";

export default async function HomePage() {
  const productsData = await getProducts();
  const { products } = productsData;
  return (
    <div>
      <Header />
      <CategoriesHeader />
      <div className="p-14">
        <ProductList products={products} title="Products" arrow />
      </div>
    </div>
  );
}
