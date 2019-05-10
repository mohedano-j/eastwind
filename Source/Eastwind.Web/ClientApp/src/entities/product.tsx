import { Category } from "./category";

export interface Product {
  productId: number;
  productName: string;
  categoryId?: number;
  unitPrice?: number;
  unitsInStock?: number;
  categoryName?: string;
  category?: Category;
}
