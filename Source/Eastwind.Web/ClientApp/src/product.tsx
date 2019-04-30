export interface product {
  productId: number;
  productName: string;
  supplierId?: number;
  categoryId?: number;
  quantityPerUnit: string;
  unitPrice?: number;
  unitsInStock?: number;
  unitsOnOrder?: number;
  reorderLevel?: number;
  discontinued?: boolean;
  category: {
    categoryId: number;
    categoryName: string;
    description: string;
    picture: any[];
    products: any[];
  };
}
