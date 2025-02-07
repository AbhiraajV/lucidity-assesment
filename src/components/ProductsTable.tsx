import { Trash2, Edit, Eye, EyeOff } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useProductStore } from "../store/product.slice";
import { useUserStore } from "../store/user.slice";
import { ProductAction } from "../types/product";
import { currentUserHasPermission } from "../consts/check-permissions";
import { useModalStore } from "../store/modal.slice";

export type Product = {
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
  isDisabled: boolean;
  isDeleted: boolean;
};

const TABLE_HEADERS = ["Name", "Category", "Value", "Quantity", "Price", "Actions"];
const ICONS = {
  edit: { component: Edit, action: ProductAction.EDIT_EDITABLE_FIELDS, color: "green" },
  disable: { component: EyeOff, action: ProductAction.DISABLE, color: "purple" },
  enable: { component: Eye, action: ProductAction.DISABLE, color: "purple" },
  delete: { component: Trash2, action: ProductAction.DELETE, color: "red" },
};

export function ProductTable() {
  const { updateProductState, products,setSelectedProduct } = useProductStore();
  const {
    user: { role },
  } = useUserStore();
  const {openModal} = useModalStore(state=>state);

  const handleAction = (productName: string, action: ProductAction) => {
    if(action === ProductAction.DELETE || action === ProductAction.DISABLE) updateProductState(productName, action, role);
    if(action === ProductAction.EDIT_EDITABLE_FIELDS){
      setSelectedProduct(products.find(p => p.name === productName)!);
      openModal("edit-product")
    }

  };

  const renderActionIcon = ({ hide, component: IconComponent, action, color, productName,disabled }: {
    hide: boolean;
    component: React.ElementType;
    action: ProductAction;
    color: string;
    productName: string;
    disabled: boolean;
  }) =>{
    if(hide) return <></>;
    const hasPermit = currentUserHasPermission(action, role,disabled)
    return (
      <IconComponent
        className="h-4 w-4 cursor-pointer"
        color={ hasPermit ? color : "gray"}
        onClick={() => hasPermit && handleAction(productName, action)}
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {TABLE_HEADERS.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products
          .filter(({ isDeleted }) => !isDeleted)
          .map(({ name, category, value, quantity, price, isDisabled }) => (
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell>{category}</TableCell>
              <TableCell>{value}</TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>{price}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {renderActionIcon({ ...ICONS.edit, hide: false, productName: name,disabled:isDisabled })}
                  {renderActionIcon({ ...ICONS.disable, hide: !isDisabled, productName: name,disabled:isDisabled })}
                  {renderActionIcon({ ...ICONS.enable, hide: isDisabled, productName: name,disabled:isDisabled })}
                  {renderActionIcon({ ...ICONS.delete, hide: false, productName: name,disabled:isDisabled })}
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
