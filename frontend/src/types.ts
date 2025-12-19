export interface Inventory {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export type InventoryData = Omit<Inventory, "id" | "totalPrice">;

export interface ApiErrorResponse {
  status: number;
  message: string;
}
