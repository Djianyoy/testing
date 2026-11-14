import { z } from "zod";

export const itemSchema = z.object({
  title: z.string().min(3, "Minimal 3 karakter").max(80, "Maksimal 80 karakter"),
  description: z.string().min(10, "Minimal 10 karakter"),
  price: z.number().positive("Harga harus lebih dari 0"),
  category: z.enum(["food", "drink", "other"]),
});

export type ItemInput = z.infer<typeof itemSchema>;

export type Item = ItemInput & {
  id: string;
  favorite: boolean;
  createdAt: string;
};

// Utility types (materi TypeScript)
export type ItemPatch = Partial<Pick<Item, "title" | "description" | "price">>;
export type ItemMap = Record<string, Item>;
export type ApiList<T> = { data: T[]; message: string };
