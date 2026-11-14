import type { NextRequest } from "next/server";
import { itemSchema } from "@/feature/items/schemas/item.schema";
import type { Item } from "@/feature/items/schemas/item.schema";

// MOCK: ganti isi file ini dengan proxy ke BE saat API sudah siap.
const db: Item[] = [
  {
    id: "1",
    title: "Contoh Item",
    description: "Ini data mock, belum tersambung ke backend.",
    price: 25000,
    category: "food",
    favorite: false,
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return Response.json({ data: db, message: "ok" });
}

export async function POST(req: NextRequest) {
  const body: unknown = await req.json();
  const parsed = itemSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { message: "Validasi gagal", details: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const item: Item = {
    ...parsed.data,
    id: crypto.randomUUID(),
    favorite: false,
    createdAt: new Date().toISOString(),
  };
  db.unshift(item);
  return Response.json({ data: item, message: "created" }, { status: 201 });
}
