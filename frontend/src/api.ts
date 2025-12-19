import axiosInstance from "./axiosInstance";
import { Inventory, InventoryData } from "./types";

export const getInventories = async (): Promise<Inventory[]> => {
  const res = await axiosInstance.get<Inventory[]>("");
  return res.data;
};

export const getInventory = async (id: number): Promise<Inventory> => {
  const res = await axiosInstance.get<Inventory>(`/${id}`);
  return res.data;
};

export const createInventory = async (
  inventory: InventoryData
): Promise<Inventory> => {
  const res = await axiosInstance.post<Inventory>("", inventory);
  return res.data;
};

export const updateInventory = async (
  id: number,
  inventory: InventoryData
): Promise<Inventory> => {
  const res = await axiosInstance.put<Inventory>(`/${id}`, inventory);
  return res.data;
};

export const deleteInventory = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/${id}`);
};
