import { create } from 'zustand';
import { EditableProductFields, Product, ProductAction, ProductStats, ProductWithoutMetadata } from '../types/product';
import { ProductRepository } from '../repository/product';
import { calculateProductStats } from '../functions/products.functions';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { Role } from '../types/user';
import { currentUserHasPermission } from '../consts/check-permissions';

const PRODUCT_STORAGE_LOCAL_KEY = 'products_store';
const DATA_RELEVANCE_TIME_IN_MS = 180000

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  isProductSessionReady: boolean;
  setupProductSession: () => Promise<void>;
  productStats: ProductStats | null;
  setProductStats: () => void;
  lastUpdated: number | null;
  revalidate: () => Promise<void>;
  invalidate: () => void;
  updateProductState: (name: string, action: ProductAction.DELETE | ProductAction.DISABLE, currentUserRole: Role) => void;
  editProduct: (name: string, updates: EditableProductFields, currentUserRole: Role) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product:Product) => void;
  recalculateValue: () => void;
}
export const useProductStore = create<ProductStore>()(
  persist(
    subscribeWithSelector((set, get) => ({
      products: [],
      productStats: null,
      isProductSessionReady: false,
      lastUpdated: null,

      setProducts: (products) => {
        set({ products, lastUpdated: Date.now() });
        get().recalculateValue();
     },

      setupProductSession: async () => {
        const lastUpdated = get().lastUpdated;
        if (!lastUpdated || Date.now() - lastUpdated > DATA_RELEVANCE_TIME_IN_MS) {
          await get().revalidate();
          return;
        }
        set({ isProductSessionReady: true });
      },

      revalidate: async () => {

        const productsFromBackend: ProductWithoutMetadata[] = await ProductRepository.getAllProducts();
        const fullProducts = productsFromBackend.map((product) => {
          return { ...product, isDisabled: false, isDeleted: false };
        });

        set({
          products: fullProducts,
          isProductSessionReady: true,
          lastUpdated: Date.now(),
        });
      },

      invalidate: () => {
        set({
          products: [],
          productStats: null,
          isProductSessionReady: false,
          lastUpdated: null,
        });
      },
      selectedProduct:null,
      setSelectedProduct: (product)  =>{
          set(()=>({
            selectedProduct:product
          }))
      },
      setProductStats: () => {
        set({ productStats: calculateProductStats(get().products) });
      },
      updateProductState: (name, action, currentUserRole) => {
        if (!currentUserHasPermission(action, currentUserRole)) return;

        set((state) => ({
          products: state.products.map((product) =>
            product.name === name
              ? {
                    ...product,
                    isDisabled: action === ProductAction.DISABLE ? !product.isDisabled : product.isDisabled,
                    isDeleted: action === ProductAction.DELETE ? !product.isDeleted : product.isDeleted,
                  }
                : product
            ),
          }));
        },
         editProduct: (name, updates, currentUserRole) => {
            if (!currentUserHasPermission(ProductAction.EDIT_EDITABLE_FIELDS, currentUserRole)) return;

          set((state) => ({
              products: state.products.map((product) =>
                product.name === name ? { ...product, ...updates } : product
              ),
            }));
          },
          
          recalculateValue: () => {
            set((state) => ({
              products: state.products.map((prod) => {
                const priceString = prod.price;
                const quantity = prod.quantity;
                if (typeof priceString !== 'string' || typeof quantity !== 'number') {
                  console.warn(`Invalid data types for product: ${prod.name}`);
                  return prod;
                }
                const parsedPrice = parseFloat(priceString.slice(1));
                if (isNaN(parsedPrice)) {
                  console.warn(`Invalid price format for product: ${prod.name}`);
                  return prod;
                }

                return {
                  ...prod,
                  value: `$${quantity * parsedPrice}`,
                };
              }),
            }));
          }
,
        })),
    {
      name: PRODUCT_STORAGE_LOCAL_KEY,
      partialize: (state) => ({
        products: state.products,
        productStats: state.productStats,
        lastUpdated: state.lastUpdated, 
    }),
    }
  )
);
useProductStore.subscribe(
  (state) => state.products,
  () => {
    useProductStore.getState().setProductStats();
  }
);

useProductStore.getState().setupProductSession();
useProductStore.getState().setProductStats();

