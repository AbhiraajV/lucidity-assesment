export type Product = {
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
  isDisabled: boolean;
  isDeleted: boolean;
};
// here i am asuming name is uid for the product, as that is not editable!
export type ProductWithoutMetadata = Omit<Product, 'isDisabled' | 'isDeleted'>;

export type ProductStats = {
    totalProducts: number;
    totalStoreValue: number;
    outOfStock: number;
    totalUniqueCategories: number;
}

export type EditableProductFields = Pick<Product, 'category' | 'value' | 'quantity' | 'price'>;

export enum ProductAction {
  DISABLE = 'disable-product',
  DELETE = 'delete-product',
  VIEW = 'view-product',
  EDIT_EDITABLE_FIELDS = 'edit-product'
}