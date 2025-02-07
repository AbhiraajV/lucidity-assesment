import { ProductAction } from "../types/product";
import { Role } from "../types/user";

const permissions: Record<Role, { default: ProductAction[]; disabled: ProductAction[] }> = {
  [Role.ADMIN]: {
    default: [ProductAction.DELETE, ProductAction.DISABLE, ProductAction.EDIT_EDITABLE_FIELDS, ProductAction.VIEW],
    disabled: [ProductAction.DELETE, ProductAction.DISABLE, ProductAction.VIEW],
  },
  [Role.USER]: {
    default: [ProductAction.VIEW],
    disabled: [ProductAction.VIEW],
  },
};

export const currentUserHasPermission = (permission: ProductAction, userRole: Role, isDisabled?: boolean): boolean => {
  const state = isDisabled ? 'disabled' : 'default';
  return permissions[userRole][state].includes(permission);
};
