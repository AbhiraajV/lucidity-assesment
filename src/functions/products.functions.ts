import type { Product, ProductStats } from "../types/product";

export const calculateProductStats = (products: Product[]): ProductStats => {
  const validProducts = products.filter(
    (product) => !product.isDisabled && !product.isDeleted
  );

  const totalProducts = validProducts.length;
  const totalStoreValue = validProducts.reduce((sum, product) => {
    let productValue = product.value;
    if (productValue.startsWith("$")) {
      productValue = productValue.slice(1);
    }
    const numericValue = parseFloat(productValue);
    return sum + (isNaN(numericValue) ? 0 : numericValue);
  }, 0);
  const outOfStock = validProducts.filter((product) => product.quantity === 0).length;
  const totalUniqueCategories = new Set(validProducts.map((product) => product.category)).size;
  return {
    totalProducts,
    totalStoreValue,
    outOfStock,
    totalUniqueCategories,
  };
};
