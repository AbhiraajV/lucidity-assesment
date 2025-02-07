import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useProductStore } from "../../store/product.slice";
import { useModalStore } from "../../store/modal.slice";
import { CategoryField } from "./category-select";
import { LabeledInput } from "./labeled-input";



export function EditProductForm() {
  const { closeModal } = useModalStore();
  const { products, selectedProduct, setProducts, setSelectedProduct } = useProductStore();
  
  if (!selectedProduct){
     closeModal();
     return null;
  }
  const isFormValid = () =>
    Boolean(selectedProduct.category) &&
    Boolean(selectedProduct.price) &&
    selectedProduct.quantity > 0;

  const handleSave = () => {
    if (!isFormValid()) return;
    setProducts(
      products.map((p) =>
        p.name === selectedProduct.name ? selectedProduct : p
      )
    );
    closeModal();
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setSelectedProduct({ ...selectedProduct, price: `$${num.toFixed(2)}` });
    } else {
      setSelectedProduct({ ...selectedProduct, price: "" });
    }
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = parseInt(e.target.value, 10);
    setSelectedProduct({
      ...selectedProduct,
      quantity: isNaN(qty) ? 0 : qty,
    });
  };
  const numericPrice = (() => {
    const num = parseFloat(selectedProduct.price.slice(1));
    return isNaN(num) ? "" : num;
  })();

  return (
    <Card className="md:w-[600px] w-[320px]">
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
        <CardDescription>{selectedProduct.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <CategoryField
            value={selectedProduct.category}
            options={Array.from(new Set(products.map((p) => p.category)))}
            onChange={(val) =>{
              console.log({val})
              setSelectedProduct({ ...selectedProduct, category: val })
            }
            }
          />
          <LabeledInput
            label="Price ($)"
            id="price"
            type="number"
            min="0"
            placeholder="0.00"
            value={numericPrice}
            onChange={handlePriceChange}
          />
          <LabeledInput
            label="Quantity"
            id="quantity"
            type="number"
            min="0"
            value={selectedProduct.quantity}
            onChange={handleQuantityChange}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={closeModal} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!isFormValid()}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
