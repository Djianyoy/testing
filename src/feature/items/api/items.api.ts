import { api } from "@/lib/axios";
import type { ApiList, Item, ItemInput } from "../schemas/item.schema";

export async function getItems(q?: string, signal?: AbortSignal): Promise<Item[]> {
  const res = await api.get<ApiList<Item>>("/items", { params: { q }, signal });
  return res.data.data;
}

export async function getItem(id: string, signal?: AbortSignal): Promise<Item> {
  const res = await api.get<{ data: Item }>(`/items/${id}`, { signal });
  return res.data.data;
}

export async function createItem(body: ItemInput): Promise<Item> {
  const res = await api.post<{ data: Item }>("/items", body);
  return res.data.data;
}

export async function toggleFavorite(id: string): Promise<Item> {
  const res = await api.post<{ data: Item }>(`/items/${id}/favorite`);
  return res.data.data;
}
